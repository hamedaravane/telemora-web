import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
});

export const updateLanguageSchema = z.object({
  languageCode: z.string().min(2, 'Language code is required'),
});

export const updateContactLocationSchema = z.object({
  phoneNumber: z.string().min(5, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  countryId: z.number(),
  stateId: z.number(),
  cityId: z.number(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type UpdateLanguageFormData = z.infer<typeof updateLanguageSchema>;
export type UpdateContactLocationFormData = z.infer<typeof updateContactLocationSchema>;
