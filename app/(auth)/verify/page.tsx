'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { otpSchema } from '@/lib/validators';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getFirebaseAuth } from '@/lib/firebaseClient';
import { signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import toast from 'react-hot-toast';
import { ensureUserDocument } from '@/lib/firestore';

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const storedPhone = sessionStorage.getItem('castefy_phone');
    setPhone(storedPhone ?? '');
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = otpSchema.safeParse({ code });
    if (!parsed.success) {
      toast.error('Enter the 6-digit code');
      return;
    }
    const verificationId = sessionStorage.getItem('castefy_verification_id');
    if (!verificationId) {
      toast.error('Start again');
      router.push('/login');
      return;
    }
    const auth = getFirebaseAuth();
    if (!auth) {
      toast.error('Firebase not configured');
      return;
    }
    setLoading(true);
    try {
      const credential = PhoneAuthProvider.credential(verificationId, parsed.data.code);
      const { user } = await signInWithCredential(auth, credential);
      await ensureUserDocument(user.uid, phone);
      toast.success('Welcome to Castefy');
      router.push('/onboarding');
    } catch (err) {
      console.error(err);
      toast.error('Invalid code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-50 to-white px-6">
      <div className="w-full max-w-md rounded-3xl bg-white/80 p-8 shadow-2xl">
        <div className="mb-6 space-y-2 text-center">
          <p className="text-sm uppercase tracking-wide text-brand-600">Verify</p>
          <h1 className="text-2xl font-semibold">Enter the OTP</h1>
          <p className="text-sm text-slate-600">Sent to {phone || 'your number'}</p>
        </div>
        <form onSubmit={handleVerify} className="space-y-4">
          <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" maxLength={6} />
          <Button type="submit" className="w-full" loading={loading}>
            Verify & continue
          </Button>
        </form>
      </div>
    </main>
  );
}
