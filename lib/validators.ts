import { z } from 'zod';

export const phoneSchema = z.object({
  phone: z.string().min(10).max(15)
});

export const otpSchema = z.object({
  code: z.string().length(6)
});

export const onboardingSchema = z.object({
  firstName: z.string().min(2),
  gender: z.string(),
  dob: z.string(),
  religion: z.string().min(2),
  casteId: z.string(),
  subCasteId: z.string().optional(),
  motherTongue: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  profession: z.string().min(2),
  education: z.string().min(2),
  intent: z.enum(['marriage', 'serious', 'open_to_marriage']),
  bio: z.string().max(280).optional(),
  photos: z.array(z.object({ url: z.string().url(), path: z.string(), isPrimary: z.boolean().optional() })).min(2)
});

export const preferencesSchema = z.object({
  genderPref: z.string(),
  ageMin: z.number().min(18),
  ageMax: z.number().max(70),
  city: z.string().optional(),
  distanceKm: z.number().min(1).max(500).optional(),
  sameCasteOnly: z.boolean()
});

export type PhoneInput = z.infer<typeof phoneSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;
export type PreferencesInput = z.infer<typeof preferencesSchema>;
