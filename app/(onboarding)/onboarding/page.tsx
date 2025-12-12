'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema, OnboardingInput } from '@/lib/validators';
import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { intents, religions, genders } from '@/lib/constants';
import { fetchActiveCastes, fetchActiveSubCastes } from '@/lib/firestore';
import { CasteMaster, SubCasteMaster } from '@/lib/types';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const steps = ['Basics', 'Community', 'Location', 'Intent', 'Photos'];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [castes, setCastes] = useState<CasteMaster[]>([]);
  const [subCastes, setSubCastes] = useState<SubCasteMaster[]>([]);

  const form = useForm<OnboardingInput>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: '',
      gender: '',
      dob: '',
      religion: '',
      casteId: '',
      subCasteId: '',
      motherTongue: '',
      city: '',
      state: '',
      profession: '',
      education: '',
      intent: 'serious',
      bio: '',
      photos: [
        { url: 'https://dummyimage.com/600x800/f97316/ffffff&text=Photo+1', path: 'demo/photo1' },
        { url: 'https://dummyimage.com/600x800/f97316/ffffff&text=Photo+2', path: 'demo/photo2' }
      ]
    }
  });

  useEffect(() => {
    fetchActiveCastes().then(setCastes).catch(() => toast.error('Load castes failed'));
  }, []);

  const filteredSubCastes = useMemo(() => subCastes.filter((s) => s.casteId === form.watch('casteId')), [subCastes, form]);

  useEffect(() => {
    if (!form.watch('casteId')) return;
    fetchActiveSubCastes(form.watch('casteId'))
      .then(setSubCastes)
      .catch(() => toast.error('Load sub castes failed'));
  }, [form.watch('casteId')]);

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (values: OnboardingInput) => {
    console.log(values);
    toast.success('Profile submitted for verification');
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="First name" {...form.register('firstName')} />
            <Select
              label="Gender"
              {...form.register('gender')}
              options={genders.map((g) => ({ value: g, label: g }))}
            />
            <Input label="Date of birth" type="date" {...form.register('dob')} />
          </div>
        );
      case 1:
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Religion" {...form.register('religion')} options={religions.map((r) => ({ value: r, label: r }))} />
            <Select
              label="Caste"
              {...form.register('casteId')}
              options={castes.map((c) => ({ value: c.id, label: `${c.casteName} (${c.religion})` }))}
            />
            <Select
              label="Sub caste"
              {...form.register('subCasteId')}
              options={filteredSubCastes.map((s) => ({ value: s.id, label: s.subCasteName }))}
            />
            <Input label="Mother tongue" {...form.register('motherTongue')} />
          </div>
        );
      case 2:
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="City" {...form.register('city')} />
            <Input label="State" {...form.register('state')} />
            <Input label="Profession" {...form.register('profession')} />
            <Input label="Education" {...form.register('education')} />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Select label="Intent" {...form.register('intent')} options={intents} />
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Bio
              <textarea
                {...form.register('bio')}
                className="min-h-[120px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-base shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </label>
          </div>
        );
      default:
        return (
          <div className="space-y-3">
            <p className="text-sm text-slate-600">Upload at least two photos (demo placeholders shown).</p>
            <div className="grid grid-cols-2 gap-3">
              {form.watch('photos').map((p, idx) => (
                <motion.div
                  key={p.path}
                  className="relative overflow-hidden rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                >
                  <img src={p.url} alt={`Photo ${idx + 1}`} className="h-48 w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-xs font-semibold text-white">Primary</div>
                </motion.div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-50 to-white px-6 py-10">
      <div className="w-full max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-brand-600">Profile onboarding</p>
            <h1 className="text-2xl font-semibold">Make discovery meaningful</h1>
          </div>
          <p className="text-sm text-slate-500">
            Step {step + 1} of {steps.length}
          </p>
        </div>
        <div className="flex gap-2">
          {steps.map((_, idx) => (
            <div key={idx} className={`h-2 flex-1 rounded-full ${idx <= step ? 'bg-brand-500' : 'bg-slate-200'}`} />
          ))}
        </div>
        <OnboardingShell title={steps[step]} subtitle="Verified-first onboarding keeps intent crisp.">
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit((values) => {
              if (step < steps.length - 1) {
                nextStep();
                return;
              }
              onSubmit(values);
            })}
          >
            {renderStep()}
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep} disabled={step === 0}>
                Back
              </Button>
              <Button type="submit">{step === steps.length - 1 ? 'Submit' : 'Next'}</Button>
            </div>
          </form>
        </OnboardingShell>
      </div>
    </main>
  );
}
