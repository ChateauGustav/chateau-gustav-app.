// api/check-drinking-windows.js
// Runs on a daily schedule via Vercel Cron (see vercel.json). Looks
// across every user's scanned wines for anything hitting its peak
// drinking year this year, and sends a push notification — once per
// wine, ever (tracked via notifiedForPeakYear so it doesn't repeat).
//
// This is NOT meant to be called by the app or by users directly — it's
// triggered automatically by Vercel Cron. Requests are guarded by a
// shared secret (CRON_SECRET) so nobody else can trigger it manually.

import { db } from "../lib/firebaseAdmin.js";
import { getMessaging } from "firebase-admin/messaging";

export default async function handler(req, res) {
  const authHeader = req.headers.authorization || "";
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const currentYear = new Date().getFullYear();

  try {
    const snapshot = await db()
      .collectionGroup("scannedWines")
      .where("peakYear", "==", currentYear)
      .get();

    if (snapshot.empty) {
      return res.status(200).json({ checked: 0, notified: 0 });
    }

    // Group matching wines by owning user so each user's tokens are
    // only fetched once, even if they have several wines peaking this year.
    const wineDocsByUser = {};
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.notifiedForPeakYear === currentYear) return; // already sent
      const uid = doc.ref.parent.parent.id;
      if (!wineDocsByUser[uid]) wineDocsByUser[uid] = [];
      wineDocsByUser[uid].push(doc);
    });

    let notifiedCount = 0;
    const messaging = getMessaging();

    for (const uid of Object.keys(wineDocsByUser)) {
      const userDoc = await db().collection("users").doc(uid).get();
      const tokens = (userDoc.exists && userDoc.data().fcmTokens) || [];
      if (!tokens.length) continue;

      for (const wineDoc of wineDocsByUser[uid]) {
        const wine = wineDoc.data();
        try {
          await messaging.sendEachForMulticast({
            tokens,
            notification: {
              title: "This wine is ready to drink",
              body: `Your ${wine.name || "wine"} is entering its peak drinking window this year.`,
            },
            data: {
              type: "drinking_window",
              wineId: wineDoc.id,
            },
          });
          await wineDoc.ref.update({ notifiedForPeakYear: currentYear });
          notifiedCount++;
        } catch (err) {
          console.error(`Failed to notify uid=${uid} wine=${wineDoc.id}:`, err);
        }
      }
    }

    return res.status(200).json({ checked: snapshot.size, notified: notifiedCount });
  } catch (err) {
    console.error("check-drinking-windows handler error:", err);
    return res.status(500).json({ error: "Something went wrong checking drinking windows." });
  }
}
