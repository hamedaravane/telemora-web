import { UserSummary } from '@/libs/users/types';
import { Media } from '../../common/types';
import { Address } from '@/libs/location/types';
import { ProductPreview } from '@/libs/products/types';
import { z } from 'zod';

export interface StorePreview {
  id: number | string;
  name: string;
  slug?: string;
  logo?: Media;
  reputation: number;
  isActive: boolean;
  walletAddress: string;
}

export interface StoreSummary extends StorePreview {
  tags?: string[];
  address: Address;
  description?: string;
}

export interface StoreDetail extends StoreSummary {
  owner: UserSummary;
  contactNumber?: string;
  email?: string;
  socialMediaLinks?: Record<string, string>;
  workingHours?: Record<string, DailyWorkingHours>;
  products: ProductPreview[];
  createdAt: Date;
}

export const storeBasicFormSchema = z.object({
  name: z.string().min(2, 'Store name is required'),
  description: z.string().optional(),
  contactNumber: z
    .string()
    .regex(/^[0-9]{10}$/, 'Invalid contact number')
    .optional(),
  email: z.string().email('Invalid email address').optional(),
  walletAddress: z.string().min(10, 'Wallet address is required'),
});

export type CreateStoreBasicDto = z.infer<typeof storeBasicFormSchema>;

export const storeAddressFormSchema = z.object({
  countryId: z.number({ required_error: 'Country is required' }),
  stateId: z.number().optional(),
  cityId: z.number().optional(),
  streetLine1: z.string().min(1, 'Street address is required'),
  streetLine2: z.string().optional(),
  postalCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type CreateAddressDto = z.infer<typeof storeAddressFormSchema>;

export const storeTagsFormSchema = z.object({
  tags: z.array(z.string().min(2)).min(1, 'Select at least one tag'),
});

export type CreateStoreTagsDto = z.infer<typeof storeTagsFormSchema>;

export const singleDayWorkingHoursSchema = z.object({
  open: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Invalid open time'),
  close: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Invalid close time'),
});

export interface DailyWorkingHours {
  open: string;
  close: string;
}

export const weeklyWorkingHoursRecordSchema = z.object({}).catchall(singleDayWorkingHoursSchema);

export const storeWorkingHoursFormSchema = z.object({
  workingHours: weeklyWorkingHoursRecordSchema.optional(),
});

export type CreateStoreWorkingHoursDto = z.infer<typeof storeWorkingHoursFormSchema>;

export const storeLogoFormSchema = z.object({
  logoFile: z
    .custom<File>()
    .refine((file) => file instanceof File, {
      message: 'Logo must be a file',
    })
    .optional(),
});

export type CreateStoreLogoDto = z.infer<typeof storeLogoFormSchema>;

export const completeStoreFormSchema = storeAddressFormSchema
  .merge(storeTagsFormSchema)
  .merge(storeWorkingHoursFormSchema)
  .merge(storeLogoFormSchema);

export type UpdateStoreDto = z.infer<typeof completeStoreFormSchema>;
