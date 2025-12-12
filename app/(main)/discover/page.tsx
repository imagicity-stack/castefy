'use client';

import { useEffect, useState } from 'react';
import { SwipeCard } from '@/components/swipe/SwipeCard';
import { RefreshIcon } from '@/app/shared/icons';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import toast from 'react-hot-toast';

interface CandidateResponse {
  uid: string;
  name: string;
  age: number;
  city: string;
  casteLabel?: string;
  photo?: string;
}

export default function DiscoverPage() {
  const [candidates, setCandidates] = useState<CandidateResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/discovery');
      const data = await res.json();
      setCandidates(data.candidates || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load stack');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white px-4 py-6">
      <div className="mx-auto flex max-w-xl flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Daily stack</h1>
            <p className="text-sm text-slate-600">Swipe with intent. Quality over quantity.</p>
          </div>
          <Button variant="ghost" onClick={load}>
            <RefreshIcon className="h-5 w-5" />
          </Button>
        </div>
        {loading ? (
          <Skeleton className="h-[420px] rounded-3xl" />
        ) : (
          <SwipeCard candidates={candidates} currentUid="demo" onNext={() => {}} />
        )}
      </div>
    </main>
  );
}
