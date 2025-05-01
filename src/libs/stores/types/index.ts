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

export interface DailyWorkingHours {
  open: string;
  close: string;
}
