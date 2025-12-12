import { promises as fs } from 'fs';
import path from 'path';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const [{ getAuthTokenFromCookie, verifyIdToken }, { adminDb }] = await Promise.all([
    import('@/lib/auth'),
    import('@/lib/firebaseAdmin')
  ]);

  const token = getAuthTokenFromCookie(req);
  const decoded = await verifyIdToken(token);

  if (!decoded || decoded.role !== 'admin') {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!adminDb) return new Response('Admin not configured', { status: 500 });
  const db = adminDb;

  const base = path.join(process.cwd(), 'firebase', 'seed');
  const casteSeed = JSON.parse(await fs.readFile(path.join(base, 'casteSeed.json'), 'utf-8'));
  const subSeed = JSON.parse(await fs.readFile(path.join(base, 'subCasteSeed.json'), 'utf-8'));

  const batch = db.batch();
  casteSeed.forEach((row: any) => {
    const ref = db.collection('casteMaster').doc(row.id);
    batch.set(ref, { ...row, createdAt: new Date(), updatedAt: new Date() }, { merge: true });
  });
  subSeed.forEach((row: any) => {
    const ref = db.collection('subCasteMaster').doc(row.id);
    batch.set(ref, { ...row, createdAt: new Date(), updatedAt: new Date() }, { merge: true });
  });
  await batch.commit();

  return Response.json({ status: 'ok', casteCount: casteSeed.length, subCasteCount: subSeed.length });
}
