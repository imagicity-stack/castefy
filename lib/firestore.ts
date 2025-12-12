import {
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  limit,
  orderBy
} from 'firebase/firestore';
import { db } from './firebaseClient';
import { UserProfile, CasteMaster, SubCasteMaster, SwipeAction, Match } from './types';

export async function ensureUserDocument(uid: string, phone: string) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const payload: UserProfile = {
      uid,
      phone,
      createdAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
      role: 'user',
      status: 'profile_incomplete'
    } as UserProfile;
    await setDoc(ref, payload, { merge: true });
  }
}

export async function fetchActiveCastes() {
  const q = query(collection(db, 'casteMaster'), where('isActive', '==', true), orderBy('sortOrder'), limit(200));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as CasteMaster);
}

export async function fetchActiveSubCastes(casteId?: string) {
  const constraints = [where('isActive', '==', true), orderBy('sortOrder'), limit(400)];
  const filtered = casteId ? [where('casteId', '==', casteId), ...constraints] : constraints;
  const q = query(collection(db, 'subCasteMaster'), ...filtered);
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as SubCasteMaster);
}

export async function logSwipe(data: SwipeAction) {
  const ref = doc(db, 'swipes', `${data.fromUid}_${data.toUid}`);
  await setDoc(ref, { ...data, createdAt: serverTimestamp() }, { merge: true });
}

export async function createMatchIfNeeded(userA: string, userB: string): Promise<Match | null> {
  const id = [userA, userB].sort().join('_');
  const ref = doc(db, 'matches', id);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as Match;
  const match: Match = {
    userA,
    userB,
    matchedAt: serverTimestamp(),
    chatEnabled: true,
    lastMessagePreview: '',
    lastMessageAt: serverTimestamp()
  } as Match;
  await setDoc(ref, match);
  return match;
}
