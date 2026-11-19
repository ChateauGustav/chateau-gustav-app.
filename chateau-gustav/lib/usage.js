// lib/usage.js
// Per-user usage limits for free and paid tiers.
//
// Counts live in Firestore at users/{uid}/usage/{periodKey}, with one
// `counts` map per document. Day periods reset at midnight UTC; month periods
// reset on the 1st (UTC).
//
// These features require a signed-in user. Requests without a valid sign-in
// token get a 401 from sendSignInRequired().

import { db, verifyRequestUser } from "./firebaseAdmin.js";

// Free-tier limits. Change these numbers to tune the paywall.
export const FREE_LIMITS = {
  pair: { limit: 10, period: "day" },
  chat: { limit: 10, period: "day" },
  scan: { limit: 3, period: "month" },
  restaurant: { limit: 5, period: "month" },
};

// Subscribers get effectively unlimited use. This daily ceiling stops abuse
// without getting in the way of normal use.
export const PAID_DAILY_CEILING = 200;

const PAID_PLANS = ["plus", "reserve"];

function periodKey(period, now = new Date()) {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return period === "month" ? `month-${y}-${m}` : `day-${y}-${m}-${d}`;
}

function isPaid(data) {
  if (!PAID_PLANS.includes(data.plan)) return false;
  if (data.planExpiresAt && data.planExpiresAt.toMillis() < Date.now()) return false;
  return true;
}

// Checks the user's allowance for one feature and counts this use if allowed.
// Call it after the request has been validated, so bad requests don't use up a
// free use.
export async function gateUsage(req, feature) {
  const rule = FREE_LIMITS[feature];
  if (!rule) throw new Error(`Unknown usage feature: ${feature}`);

  const user = await verifyRequestUser(req);
  if (!user) return { allowed: false, signInRequired: true };

  try {
    const userRef = db().collection("users").doc(user.uid);
    const userSnap = await userRef.get();
    const paid = isPaid(userSnap.exists ? userSnap.data() : {});

    // Subscribers are counted per day against the high ceiling
    const period = paid ? "day" : rule.period;
    const limit = paid ? PAID_DAILY_CEILING : rule.limit;
    const docRef = userRef.collection("usage").doc(periodKey(period));

    return await db().runTransaction(async (tx) => {
      const snap = await tx.get(docRef);
      const used = (snap.exists && snap.data().counts?.[feature]) || 0;
      if (used >= limit) {
        return { allowed: false, used, limit, paid, period };
      }
      tx.set(
        docRef,
        { counts: { [feature]: used + 1 }, updatedAt: new Date() },
        { merge: true }
      );
      return { allowed: true, used: used + 1, limit, paid, period };
    });
  } catch (err) {
    // Fail open so a Firestore hiccup doesn't block every user
    console.error("Usage check failed (allowing request):", err);
    return { allowed: true, error: true };
  }
}

// Standard response when a free user has used up their allowance.
// The app can use `code` to show the Gustav Plus paywall.
export function sendLimitReached(res, gate, feature) {
  const messages = {
    pair: "You've reached today's free pairings. Gustav Plus has more.",
    chat: "You've reached today's free questions. Gustav Plus has more.",
    scan: "You've used this month's free label scans. Gustav Plus has more.",
    restaurant: "You've used this month's free Restaurant Mode uses. Gustav Plus has more.",
  };
  return res.status(403).json({
    error: messages[feature] || "You've reached your free limit.",
    code: "limit_reached",
    feature,
    used: gate.used,
    limit: gate.limit,
    period: gate.period,
  });
}

// Standard response when the request has no valid sign-in.
export function sendSignInRequired(res) {
  return res.status(401).json({
    error: "Please sign in to use this feature.",
    code: "sign_in_required",
  });
}
