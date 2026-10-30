// api/account.js
// Deletes all server-side data for the signed-in user. Called by the app's
// "Delete account" button before the Firebase Auth account itself is removed
// (App Store Guideline 5.1.1(v)).
//
// DELETE → removes users/{uid} and everything under it (scannedWines, fcmTokens, etc.)
//
// Safe to call more than once: if the data is already gone, it still returns 200.

import { db, verifyRequestUser } from "../lib/firebaseAdmin.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "DELETE") return res.status(405).json({ error: "Method not allowed" });

  const user = await verifyRequestUser(req);
  if (!user) {
    return res.status(401).json({ error: "Sign in required." });
  }

  try {
    // recursiveDelete removes the user doc plus all subcollections under it.
    await db().recursiveDelete(db().collection("users").doc(user.uid));
    return res.status(200).json({ deleted: true });
  } catch (err) {
    console.error("account handler error:", err);
    return res.status(500).json({ error: "Something went wrong deleting your account data." });
  }
}
