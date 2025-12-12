'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/Skeleton';
import { ChatIcon } from '@/app/shared/icons';

interface MatchCard {
  id: string;
  name: string;
  preview: string;
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // placeholder data
    setMatches([
      { id: 'userA_userB', name: 'Ayesha, 27', preview: 'Hey! nice to match with you' },
      { id: 'demo_two', name: 'Rohan, 30', preview: 'Coffee this weekend?' }
    ]);
    setLoading(false);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white px-4 py-6">
      <div className="mx-auto max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold">Matches</h1>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => (
              <Link
                key={match.id}
                href={`/chat/${match.id}`}
                className="glass card-shadow flex items-center justify-between rounded-2xl p-4"
              >
                <div>
                  <p className="font-semibold text-slate-900">{match.name}</p>
                  <p className="text-sm text-slate-600">{match.preview}</p>
                </div>
                <ChatIcon className="h-5 w-5 text-brand-600" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
