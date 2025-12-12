'use client';

import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ShieldIcon } from '@/app/shared/icons';
import { useEffect, useState } from 'react';

interface ProfileView {
  name: string;
  caste?: string;
  subCaste?: string;
  intent?: string;
  status: 'profile_incomplete' | 'pending_verification' | 'active';
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileView | null>(null);

  useEffect(() => {
    setProfile({ name: 'Demo User', caste: 'Brahmin', subCaste: 'Iyer', intent: 'Serious', status: 'pending_verification' });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white px-4 py-6">
      <div className="mx-auto max-w-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-sm text-slate-600">Keep your details crisp. Verification happens fast.</p>
          </div>
          <Button variant="outline">Edit</Button>
        </div>
        {!profile ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <div className="glass card-shadow space-y-3 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                <ShieldIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold">{profile.name}</p>
                <p className="text-sm text-slate-600">Status: {profile.status}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
              <div>
                <p className="font-semibold">Caste</p>
                <p>{profile.caste || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Sub caste</p>
                <p>{profile.subCaste || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Intent</p>
                <p>{profile.intent || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
