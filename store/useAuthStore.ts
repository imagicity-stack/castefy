import { create } from 'zustand';
import { User } from 'firebase/auth';
import { UserProfile } from '@/lib/types';

type AuthState = {
  firebaseUser?: User | null;
  profile?: UserProfile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  firebaseUser: null,
  profile: null,
  loading: false,
  setUser: (firebaseUser) => set({ firebaseUser }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading })
}));
