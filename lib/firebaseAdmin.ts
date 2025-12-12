import type { App } from 'firebase-admin/app';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';

let app: App | undefined;

function getServiceAccount() {
  const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (!serviceAccountBase64) return null;

  try {
    const decoded = Buffer.from(serviceAccountBase64, 'base64').toString('utf-8');
    const serviceAccount = JSON.parse(decoded);

    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    return serviceAccount;
  } catch (error) {
    return null;
  }
}

function getAdminApp(): App | undefined {
  if (app) return app;

  const serviceAccount = getServiceAccount();
  if (!serviceAccount) return undefined;

  if (!getApps().length) {
    app = initializeApp({
      credential: cert(serviceAccount)
    });
  } else {
    app = getApps()[0];
  }

  return app;
}

const firebaseApp = getAdminApp();

export const adminDb = firebaseApp ? getAdminFirestore(firebaseApp) : undefined;
export const adminAuth = firebaseApp ? getAdminAuth(firebaseApp) : undefined;
