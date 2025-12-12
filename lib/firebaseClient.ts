import { initializeApp, getApps, type FirebaseOptions, type FirebaseApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const missingConfig = Object.values(firebaseConfig).some((v) => !v);
let app: FirebaseApp | null = null;

export function getFirebaseApp() {
  if (app) return app;
  if (missingConfig) {
    console.warn('Firebase env vars missing; client SDK not initialized');
    return null;
  }
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return app;
}

const appInstance = getFirebaseApp();
export const auth = appInstance ? getAuth(appInstance) : null;
export const db = appInstance ? getFirestore(appInstance) : null;
export const storage = appInstance ? getStorage(appInstance) : null;

export const messagingPromise = appInstance
  ? isSupported().then((supported) => {
      if (!supported) return null;
      return getMessaging(appInstance);
    })
  : Promise.resolve(null);

export function buildRecaptcha(containerId: string) {
  if (!auth) return null;
  return new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
}
