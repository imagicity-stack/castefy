import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { getAuthTokenFromCookie, verifyIdToken } from '@/lib/auth';
import { differenceInYears } from 'date-fns';

export async function GET(req: NextRequest) {
  const token = getAuthTokenFromCookie();
  const decoded = await verifyIdToken(token);
  if (!decoded || !adminDb) {
    return new Response(JSON.stringify({ candidates: demoCandidates() }), { status: 200 });
  }

  const userSnap = await adminDb.collection('users').doc(decoded.uid).get();
  const user = userSnap.data();
  if (!user) return new Response(JSON.stringify({ candidates: [] }), { status: 200 });

  const q = adminDb
    .collection('users')
    .where('status', '==', 'active')
    .where('profile.gender', '==', user.preferences?.genderPref ?? 'Female')
    .where('profile.casteId', '==', user.profile?.casteId)
    .orderBy('lastActiveAt', 'desc')
    .limit(15);
  const snap = await q.get();
  const candidates = snap.docs
    .filter((doc) => doc.id !== decoded.uid)
    .map((doc) => {
      const profile = doc.data().profile;
      return {
        uid: doc.id,
        name: profile?.firstName ?? 'User',
        age: profile?.dob ? differenceInYears(new Date(), new Date(profile.dob)) : 25,
        city: profile?.city ?? 'City',
        casteLabel: profile?.casteId,
        photo: profile?.photos?.[0]?.url
      };
    });

  return Response.json({ candidates });
}

function demoCandidates() {
  return [
    {
      uid: 'demo1',
      name: 'Ananya',
      age: 26,
      city: 'Bengaluru',
      casteLabel: 'Brahmin',
      photo: 'https://dummyimage.com/600x800/f97316/ffffff&text=Ananya'
    },
    {
      uid: 'demo2',
      name: 'Sameer',
      age: 29,
      city: 'Mumbai',
      casteLabel: 'Rajput',
      photo: 'https://dummyimage.com/600x800/f97316/ffffff&text=Sameer'
    }
  ];
}
