import { cookies } from 'next/headers';
import { adminAuth } from './firebaseAdmin';

export async function verifyIdToken(token: string | undefined) {
  if (!token || !adminAuth) return null;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded;
  } catch (err) {
    console.error('verifyIdToken failed', err);
    return null;
  }
}

export function getAuthTokenFromCookie(): string | undefined {
  const store = cookies();
  const token = store.get('castefy_token');
  return token?.value;
}
