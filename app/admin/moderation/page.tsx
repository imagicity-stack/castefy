'use client';

import { Button } from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

interface PendingUser {
  uid: string;
  name: string;
  intent: string;
}

export default function ModerationPage() {
  const [pending, setPending] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPending([
      { uid: 'u1', name: 'Ishita', intent: 'Serious' },
      { uid: 'u2', name: 'Karan', intent: 'Marriage' }
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Moderation queue</h1>
      <p className="text-sm text-slate-600">Review users flagged for verification. Approve to activate discovery.</p>
      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : (
        <div className="space-y-3">
          {pending.map((user) => (
            <div key={user.uid} className="glass card-shadow flex items-center justify-between rounded-2xl p-4">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-slate-600">Intent: {user.intent}</p>
              </div>
              <div className="flex gap-2">
                <Button>Approve</Button>
                <Button variant="outline">Reject</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
