import { differenceInYears } from 'date-fns';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const [{ getAuthTokenFromCookie, verifyIdToken }, { adminDb }] = await Promise.all([
      import('@/lib/auth'),
      import('@/lib/firebaseAdmin')
    ]);

    const token = getAuthTokenFromCookie(req);
    const decoded = await verifyIdToken(token);

    if (!decoded || !adminDb) {
      return Response.json({ candidates: demoCandidates() });
    }

    const userSnap = await adminDb.collection('users').doc(decoded.uid).get();
    const user = userSnap.data();

    if (!user) {
      return Response.json({ candidates: demoCandidates() });
    }

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
  } catch (error) {
    return Response.json({ candidates: demoCandidates() });
  }
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
