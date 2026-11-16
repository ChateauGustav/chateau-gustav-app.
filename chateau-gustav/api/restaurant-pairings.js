// api/restaurant-pairings.js
// Serves a restaurant's active menu with its published, pre-set pairings.
// This is a subscriber perk: the caller must be signed in and have an
// active paid plan. Only published pairings for in-stock wines are returned.
//
// GET ?restaurantId=<id>
//
// Firestore layout (see planning notes):
//   restaurants/{id}                       { name, city, cuisine, status }
//   restaurants/{id}/menus/{menuId}        { name, active, courses[] }
//   restaurants/{id}/dishes/{dishId}       { menuId, course, name, description }
//   restaurants/{id}/wines/{wineId}        { producer, name, vintage, style, inStock, ... }
//   restaurants/{id}/pairings/{pairingId}  { dishId, wineId, pairingType, matchScore,
//                                            explanation, status, lastVerified }
//
// Plan check: reads users/{uid}.plan and users/{uid}.planExpiresAt. These fields
// will be written by the subscription webhook (RevenueCat). Until that exists,
// every request gets 403, which is the intended default.

import { db, verifyRequestUser } from "../lib/firebaseAdmin.js";

const PAID_PLANS = ["plus", "reserve"];

async function hasActivePlan(uid) {
  const snap = await db().collection("users").doc(uid).get();
  if (!snap.exists) return false;
  const data = snap.data();
  if (!PAID_PLANS.includes(data.plan)) return false;
  // planExpiresAt is a Firestore Timestamp or null (null = no expiry)
  if (data.planExpiresAt && data.planExpiresAt.toMillis() < Date.now()) return false;
  return true;
}

export default async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  // ── Auth ──────────────────────────────────────────────────────────
  const user = await verifyRequestUser(req);
  if (!user) return res.status(401).json({ error: "Sign in required." });

  const restaurantId = String(req.query?.restaurantId || "").trim();
  if (!restaurantId) return res.status(400).json({ error: "restaurantId is required." });

  try {
    // ── Subscription gate ──────────────────────────────────────────
    if (!(await hasActivePlan(user.uid))) {
      return res.status(403).json({
        error: "This is a Gustav subscriber feature.",
        code: "subscription_required",
      });
    }

    const root = db().collection("restaurants").doc(restaurantId);

    const restaurantSnap = await root.get();
    if (!restaurantSnap.exists || restaurantSnap.data().status !== "active") {
      return res.status(404).json({ error: "Restaurant not found." });
    }
    const restaurant = restaurantSnap.data();

    // ── Active menu ────────────────────────────────────────────────
    const menuSnap = await root.collection("menus").where("active", "==", true).limit(1).get();
    if (menuSnap.empty) {
      return res.status(404).json({ error: "No active menu for this restaurant." });
    }
    const menuDoc = menuSnap.docs[0];
    const menu = menuDoc.data();

    // ── Dishes, wines, and pairings (small collections, so read in full) ──
    const [dishSnap, wineSnap, pairingSnap] = await Promise.all([
      root.collection("dishes").where("menuId", "==", menuDoc.id).get(),
      root.collection("wines").get(),
      root.collection("pairings").where("status", "==", "published").get(),
    ]);

    // Only in-stock wines can be recommended
    const wines = new Map();
    wineSnap.forEach((d) => {
      const w = d.data();
      if (w.inStock !== false) {
        wines.set(d.id, {
          id: d.id,
          producer: w.producer || null,
          name: w.name || null,
          vintage: w.vintage || null,
          region: w.region || null,
          style: w.style || null,
          glassPrice: w.glassPrice ?? null,
          bottlePrice: w.bottlePrice ?? null,
        });
      }
    });

    // Group published pairings by dish, dropping any that use an unavailable wine
    const pairingsByDish = new Map();
    pairingSnap.forEach((d) => {
      const p = d.data();
      const wine = wines.get(p.wineId);
      if (!wine) return;
      if (!pairingsByDish.has(p.dishId)) pairingsByDish.set(p.dishId, []);
      pairingsByDish.get(p.dishId).push({
        wine,
        pairingType: p.pairingType || "bottle",
        matchScore: p.matchScore ?? null,
        explanation: p.explanation || "",
      });
    });

    // Build courses in order, with each dish and its pairings
    const courseList = (menu.courses || []).slice().sort((a, b) => a.order - b.order);
    const dishes = dishSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const courses = courseList.map((c) => ({
      order: c.order,
      name: c.name,
      dishes: dishes
        .filter((dish) => dish.course === c.order)
        .map((dish) => ({
          id: dish.id,
          name: dish.name,
          description: dish.description || "",
          pairings: (pairingsByDish.get(dish.id) || []).sort(
            (a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0)
          ),
        })),
    }));

    res.setHeader("Cache-Control", "private, max-age=300");
    return res.status(200).json({
      restaurant: {
        id: restaurantId,
        name: restaurant.name,
        city: restaurant.city || null,
        cuisine: restaurant.cuisine || null,
      },
      menu: { id: menuDoc.id, name: menu.name, updatedAt: menu.updatedAt || null },
      courses,
    });
  } catch (err) {
    console.error("restaurant-pairings error:", err);
    return res.status(500).json({ error: "Could not load pairings. Please try again." });
  }
}
