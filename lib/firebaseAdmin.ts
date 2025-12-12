import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

if (!serviceAccountBase64) {
  console.warn('FIREBASE_SERVICE_ACCOUNT_BASE64 not set; admin features disabled');
}

const app =
  getApps().length || !serviceAccountBase64
    ? getApps()[0]
    : initializeApp({
        credential: cert(JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf-8')))
      });

export const adminDb = app ? getAdminFirestore(app) : undefined;
export const adminAuth = app ? getAdminAuth(app) : undefined;
