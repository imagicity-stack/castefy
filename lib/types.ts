import { Timestamp, FieldValue } from 'firebase/firestore';

export type Role = 'user' | 'moderator' | 'admin';
export type Status = 'profile_incomplete' | 'pending_verification' | 'active' | 'suspended';

export interface Photo {
  url: string;
  path: string;
  isPrimary?: boolean;
}

export interface ProfilePayload {
  firstName: string;
  gender: string;
  dob: string;
  religion: string;
  casteId: string;
  subCasteId?: string;
  motherTongue: string;
  city: string;
  state: string;
  profession: string;
  education: string;
  intent: 'marriage' | 'serious' | 'open_to_marriage';
  bio?: string;
  photos: Photo[];
}

export interface PreferencesPayload {
  genderPref: string;
  ageMin: number;
  ageMax: number;
  city?: string;
  distanceKm?: number;
  sameCasteOnly: boolean;
}

export interface UserProfile {
  uid: string;
  phone: string;
  createdAt: Timestamp | FieldValue;
  lastActiveAt: Timestamp | FieldValue;
  role: Role;
  status: Status;
  profile?: ProfilePayload;
  preferences?: PreferencesPayload;
}

export interface CasteMaster {
  id: string;
  religion: string;
  casteName: string;
  sortOrder: number;
  isActive: boolean;
  createdAt?: Timestamp | FieldValue;
  updatedAt?: Timestamp | FieldValue;
}

export interface SubCasteMaster {
  id: string;
  casteId: string;
  subCasteName: string;
  sortOrder: number;
  isActive: boolean;
  createdAt?: Timestamp | FieldValue;
  updatedAt?: Timestamp | FieldValue;
}

export interface SwipeAction {
  fromUid: string;
  toUid: string;
  action: 'like' | 'skip';
}

export interface Match {
  userA: string;
  userB: string;
  matchedAt: Timestamp | FieldValue;
  chatEnabled: boolean;
  lastMessageAt: Timestamp | FieldValue;
  lastMessagePreview: string;
}

export interface Message {
  senderUid: string;
  text: string;
  createdAt: Timestamp | FieldValue;
  type: 'text';
}

export interface Report {
  reporterUid: string;
  targetUid: string;
  matchId?: string;
  reason: string;
  details?: string;
  status: 'open' | 'reviewed' | 'actioned';
  createdAt: Timestamp | FieldValue;
}

export interface Block {
  blockerUid: string;
  blockedUid: string;
  createdAt: Timestamp | FieldValue;
}
