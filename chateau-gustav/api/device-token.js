// api/device-token.js
// Saves (or updates) this device's FCM push token against the signed-in
// user's Firestore profile doc, so the daily drinking-window check knows
// where to send notifications. A user can have more than one device —
// tokens are stored as a set, not overwritten.

import { db, verifyRequestUser } from "../lib/firebaseAdmin.js";
import { FieldValue } from "firebase-admin/firestore";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const user = await verifyRequestUser(req);
  if (!user) {
    return res.status(401).json({ error: "Sign in required." });
  }

  const { fcmToken } = req.body || {};
  if (!fcmToken || typeof fcmToken !== "string") {
    return res.status(400).json({ error: "Missing fcmToken." });
  }

  try {
    await db()
      .collection("users")
      .doc(user.uid)
      .set(
        {
          fcmTokens: FieldValue.arrayUnion(fcmToken),
          email: user.email || null,
          updatedAt: Date.now(),
        },
        { merge: true }
      );
    return res.status(200).json({ saved: true });
  } catch (err) {
    console.error("device-token handler error:", err);
    return res.status(500).json({ error: "Something went wrong saving your device token." });
  }
}
