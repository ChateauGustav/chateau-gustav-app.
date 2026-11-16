// scripts/load-restaurant.js
// Loads one restaurant's menu, wines, dishes, and pairings from a JSON file
// into Firestore. Run it on your own computer, not on Vercel.
//
// Usage:
//   node scripts/load-restaurant.js path/to/restaurant.json          # dry run (checks only)
//   node scripts/load-restaurant.js path/to/restaurant.json --write  # writes to Firestore
//
// Needs the same environment variables as the API:
//   FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
// Keep the JSON file out of git. It holds a restaurant's data before it's approved.
//
// Re-running the script replaces the restaurant's menus, dishes, wines, and
// pairings with what's in the file, so the file is the single source of truth.

import { readFileSync } from "node:fs";
import { db } from "../lib/firebaseAdmin.js";

const args = process.argv.slice(2);
const filePath = args.find((a) => !a.startsWith("--"));
const write = args.includes("--write");

if (!filePath) {
  console.error("Usage: node scripts/load-restaurant.js <file.json> [--write]");
  process.exit(1);
}

const input = JSON.parse(readFileSync(filePath, "utf8"));
const { restaurant, menus = [], dishes = [], wines = [], pairings = [] } = input;

// ── Validate ──────────────────────────────────────────────────────────
const errors = [];
const warnings = [];

if (!restaurant?.id) errors.push("restaurant.id is required");
if (!restaurant?.name) errors.push("restaurant.name is required");
if (restaurant?.status && !["active", "paused"].includes(restaurant.status)) {
  errors.push(`restaurant.status must be "active" or "paused"`);
}

const menuIds = new Set(menus.map((m) => m.id));
const wineIds = new Set(wines.map((w) => w.id));
const dishIds = new Set(dishes.map((d) => d.id));

const activeMenus = menus.filter((m) => m.active);
if (activeMenus.length !== 1) {
  errors.push(`Exactly one menu must be active (found ${activeMenus.length})`);
}

for (const d of dishes) {
  if (!menuIds.has(d.menuId)) errors.push(`Dish ${d.id} points to unknown menu ${d.menuId}`);
  const menu = menus.find((m) => m.id === d.menuId);
  if (menu && !(menu.courses || []).some((c) => c.order === d.course)) {
    errors.push(`Dish ${d.id} is in course ${d.course}, which the menu doesn't define`);
  }
}

for (const w of wines) {
  if (w.inStock === false) warnings.push(`Wine ${w.id} is out of stock and won't show to subscribers`);
  if (!w.lastVerified) warnings.push(`Wine ${w.id} has no lastVerified date`);
}

for (const p of pairings) {
  if (!dishIds.has(p.dishId)) errors.push(`Pairing ${p.id} points to unknown dish ${p.dishId}`);
  if (!wineIds.has(p.wineId)) errors.push(`Pairing ${p.id} points to unknown wine ${p.wineId}`);
  if (p.matchScore != null && (p.matchScore < 0 || p.matchScore > 100)) {
    errors.push(`Pairing ${p.id} matchScore must be 0–100`);
  }
  if (p.pairingType && !["glass", "bottle"].includes(p.pairingType)) {
    errors.push(`Pairing ${p.id} pairingType must be "glass" or "bottle"`);
  }
  if (!p.explanation) warnings.push(`Pairing ${p.id} has no explanation`);
  if (p.status !== "published") warnings.push(`Pairing ${p.id} is a draft and won't show to subscribers`);
}

console.log(`Restaurant: ${restaurant?.name} (${restaurant?.id})`);
console.log(`Menus: ${menus.length}, dishes: ${dishes.length}, wines: ${wines.length}, pairings: ${pairings.length}`);
for (const w of warnings) console.log(`  warning: ${w}`);
for (const e of errors) console.log(`  ERROR: ${e}`);

if (errors.length) {
  console.log("\nFix the errors above and run again. Nothing was written.");
  process.exit(1);
}

if (!write) {
  console.log("\nDry run passed. Run again with --write to save to Firestore.");
  process.exit(0);
}

// ── Write ─────────────────────────────────────────────────────────────
const root = db().collection("restaurants").doc(restaurant.id);

// Replace each subcollection so removed items disappear
async function replaceCollection(name, docs) {
  const col = root.collection(name);
  const existing = await col.get();
  const batch = db().batch();
  existing.forEach((d) => batch.delete(d.ref));
  for (const doc of docs) {
    const { id, ...data } = doc;
    batch.set(col.doc(id), { ...data, updatedAt: new Date() });
  }
  await batch.commit();
  console.log(`  ${name}: ${docs.length} saved`);
}

await root.set(
  {
    name: restaurant.name,
    city: restaurant.city || null,
    cuisine: restaurant.cuisine || null,
    status: restaurant.status || "paused", // start paused; switch to active when ready
    contact: restaurant.contact || null,
    updatedAt: new Date(),
  },
  { merge: true }
);

await replaceCollection("menus", menus);
await replaceCollection("dishes", dishes);
await replaceCollection("wines", wines);
await replaceCollection("pairings", pairings);

console.log("\nDone. The restaurant stays paused until you set status to \"active\".");
process.exit(0);
