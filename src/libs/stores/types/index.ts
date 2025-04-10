import { UserSummary } from '@/libs/users/types';
import { Media } from '../../common/types';
import { Address } from '@/libs/location/types';
import { ProductPreview } from '@/libs/products/types';

export interface StorePreview {
  id: number | string;
  name: string;
  slug?: string;
  logo?: Media;
  reputation: number;
  isActive: boolean;
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
  workingHours?: Record<string, WorkingHour>;
  products: ProductPreview[];
  createdAt: Date;
}

export interface CreateStoreBasicDto {
  name: string;
  description: string;
  contactNumber?: string;
  email?: string;
}

export interface CreateAddressDto {
  countryId: number;
  stateId?: number;
  cityId?: number;
  streetLine1: string;
  streetLine2?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface CreateStoreTagsDto {
  tags?: string[];
}

export interface WorkingHour {
  open: string;
  close: string;
}

export interface CreateStoreWorkingHoursDto {
  workingHours?: Record<string, WorkingHour>;
}

export interface CreateStoreLogoDto {
  logoFile?: File;
}
