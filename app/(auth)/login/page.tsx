'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { phoneSchema } from '@/lib/validators';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PhoneIcon } from '@/app/shared/icons';
import { buildRecaptcha, auth } from '@/lib/firebaseClient';
import { signInWithPhoneNumber } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [value, setValue] = useState('+91');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buildRecaptcha('recaptcha-container');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = phoneSchema.safeParse({ phone: value });
    if (!parsed.success) {
      toast.error('Enter a valid phone number');
      return;
    }
    setLoading(true);
    try {
      const verifier = buildRecaptcha('recaptcha-container');
      if (!auth || !verifier) {
        toast.error('Firebase not configured');
        return;
      }
      const confirmation = await signInWithPhoneNumber(auth, parsed.data.phone, verifier);
      sessionStorage.setItem('castefy_verification_id', confirmation.verificationId);
      sessionStorage.setItem('castefy_phone', parsed.data.phone);
      toast.success('OTP sent');
      router.push('/verify');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-50 to-white px-6">
      <div className="w-full max-w-md rounded-3xl bg-white/80 p-8 shadow-2xl">
        <div className="mb-6 space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
            <PhoneIcon className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold">Enter your phone</h1>
          <p className="text-sm text-slate-600">We will send an OTP to continue.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="+91 90000 00000" />
          <Button type="submit" className="w-full" loading={loading}>
            Send OTP
          </Button>
        </form>
        <div id="recaptcha-container" className="mt-4 flex justify-center" />
      </div>
    </main>
  );
}
