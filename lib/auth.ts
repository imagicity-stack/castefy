import type { NextRequest } from 'next/server';

import { adminAuth } from './firebaseAdmin';

export async function verifyIdToken(token: string | null | undefined) {
  if (!token || !adminAuth) return null;
  try {
    return await adminAuth.verifyIdToken(token);
  } catch (err) {
    return null;
  }
}

export function getAuthTokenFromCookie(req: NextRequest): string | null {
  const token = req.cookies.get('castefy_token');
  return token?.value ?? null;
}
