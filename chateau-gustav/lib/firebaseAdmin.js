// lib/firebaseAdmin.js
// Shared Firebase Admin setup for any backend route that needs to read or
// write Firestore, or verify who's making a request. Credentials come from
// a service account key (Firebase Console → Project settings → Service
// accounts → Generate new private key), stored as three Vercel env vars —
// never commit the key file itself.

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function getServiceAccount() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Vercel env vars can't hold real newlines, so the private key is stored
  // with literal "\n" sequences and unescaped here at runtime.
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials — set FIREBASE_PROJECT_ID, " +
        "FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in Vercel env vars."
    );
  }
  return { projectId, clientEmail, privateKey };
}

function getFirebaseApp() {
  if (getApps().length) return getApps()[0];
  return initializeApp({ credential: cert(getServiceAccount()) });
}

export function db() {
  return getFirestore(getFirebaseApp());
}

export function adminAuth() {
  return getAuth(getFirebaseApp());
}

// Verifies the Firebase ID token sent from the mobile app (as
// "Authorization: Bearer <token>") and returns the decoded token — which
// includes uid, email, etc. — or null if it's missing or invalid.
export async function verifyRequestUser(req) {
  const header = req.headers.authorization || "";
  const match = header.match(/^Bearer (.+)$/);
  if (!match) return null;
  try {
    return await adminAuth().verifyIdToken(match[1]);
  } catch (err) {
    console.error("Failed to verify Firebase ID token:", err);
    return null;
  }
}
