'use client';

import { useDrag } from '@use-gesture/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { logSwipe, createMatchIfNeeded } from '@/lib/firestore';
import { SwipeAction } from '@/lib/types';
import { useUIStore } from '@/store/useUIStore';
import toast from 'react-hot-toast';

interface SwipeCardProps {
  currentUid: string;
  candidates: { uid: string; name: string; age: number; city: string; casteLabel?: string; photo?: string }[];
  onNext: () => void;
}

export function SwipeCard({ candidates, currentUid, onNext }: SwipeCardProps) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, 0, 200], [0.2, 1, 0.2]);
  const { setShowMatchModal } = useUIStore();

  const bind = useDrag(({ down, movement: [mx], direction: [dx], velocity }) => {
    if (animating) return;
    x.set(mx);
    if (!down && velocity > 0.2) {
      handleSwipe(dx > 0 ? 'like' : 'skip');
    }
  });

  const candidate = candidates[index];

  const handleSwipe = async (action: SwipeAction['action']) => {
    if (!candidate) return;
    setAnimating(true);
    try {
      await logSwipe({ fromUid: currentUid, toUid: candidate.uid, action });
      if (action === 'like') {
        const match = await createMatchIfNeeded(currentUid, candidate.uid);
        if (match) {
          toast.success("It's a match!");
          setShowMatchModal(true);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Swipe failed');
    }
    x.set(0);
    setIndex((prev) => prev + 1);
    onNext();
    setAnimating(false);
  };

  if (!candidate) {
    return <div className="rounded-3xl bg-white/80 p-10 text-center shadow">No more profiles today. Check back later.</div>;
  }

  return (
    <div className="space-y-4">
      <motion.div
        {...bind()}
        style={{ x, rotate, opacity }}
        className="card-shadow relative h-[420px] rounded-3xl bg-cover bg-center"
        animate={{ scale: animating ? 0.95 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <img
          src={candidate.photo ?? 'https://dummyimage.com/600x800/f97316/ffffff&text=Castefy'}
          alt={candidate.name}
          className="h-full w-full rounded-3xl object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">
                {candidate.name}, {candidate.age}
              </p>
              <p className="text-sm text-white/80">{candidate.city}</p>
              {candidate.casteLabel && <p className="text-xs text-white/70">{candidate.casteLabel}</p>}
            </div>
          </div>
        </div>
      </motion.div>
      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" onClick={() => handleSwipe('skip')}>
          Skip
        </Button>
        <Button onClick={() => handleSwipe('like')}>Like</Button>
      </div>
    </div>
  );
}
