// api/scanned-wines.js
// Cloud-backed storage for a signed-in user's scanned wine history, keyed
// by their Firebase uid. This is what lets scans survive a reinstall, sync
// across devices, and — the reason this exists — lets a server-side job
// (like a daily drinking-window check) see everyone's wines without
// needing any phone to be online.
//
// GET    → list the signed-in user's scanned wines, newest first
// POST   → save a newly scanned wine
// DELETE ?id=<docId> → remove a scanned wine

import { db, verifyRequestUser } from "../lib/firebaseAdmin.js";

export default async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();

  // ── Auth ──────────────────────────────────────────────────────────
  const user = await verifyRequestUser(req);
  if (!user) {
    return res.status(401).json({ error: "Sign in required." });
  }

  const collection = db().collection("users").doc(user.uid).collection("scannedWines");

  try {
    if (req.method === "GET") {
      const snapshot = await collection.orderBy("scannedAt", "desc").get();
      const wines = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json({ wines });
    }

    if (req.method === "POST") {
      const wine = req.body || {};
      if (!wine.name) {
        return res.status(400).json({ error: "Wine data must include at least a name." });
      }
      const docRef = await collection.add({
        ...wine,
        scannedAt: wine.scannedAt || Date.now(),
      });
      return res.status(200).json({ id: docRef.id });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: "Missing wine id." });
      await collection.doc(id).delete();
      return res.status(200).json({ deleted: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("scanned-wines handler error:", err);
    return res.status(500).json({ error: "Something went wrong accessing your scanned wines." });
  }
}
