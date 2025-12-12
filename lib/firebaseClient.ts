import { initializeApp, getApps, type FirebaseOptions, type FirebaseApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getMessaging, isSupported, type Messaging } from 'firebase/messaging';

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

function isBrowser() {
  return typeof window !== 'undefined';
}

export function getFirebaseApp(): FirebaseApp | null {
  if (!isBrowser()) return null;
  if (app) return app;
  if (missingConfig) {
    console.warn('Firebase env vars missing; client SDK not initialized');
    return null;
  }
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return app;
}

export function getFirebaseAuth(): Auth | null {
  const appInstance = getFirebaseApp();
  return appInstance ? getAuth(appInstance) : null;
}

export function getFirestoreDb(): Firestore | null {
  const appInstance = getFirebaseApp();
  return appInstance ? getFirestore(appInstance) : null;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  const appInstance = getFirebaseApp();
  return appInstance ? getStorage(appInstance) : null;
}

export async function getMessagingInstance(): Promise<Messaging | null> {
  const appInstance = getFirebaseApp();
  if (!appInstance) return null;
  const supported = await isSupported();
  if (!supported) return null;
  return getMessaging(appInstance);
}

export function buildRecaptcha(containerId: string) {
  const auth = getFirebaseAuth();
  if (!auth || !isBrowser()) return null;
  return new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
}
