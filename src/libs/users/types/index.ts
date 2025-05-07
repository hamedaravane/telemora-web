import { Address } from '@/libs/location/types';
import { OrderSummary } from '@/libs/orders/types';
import { StorePreview } from '@/libs/stores/types';

import { Media } from '../../common/types';

export enum UserRole {
  BUYER = 'buyer',
  SELLER = 'seller',
  BOTH = 'both',
}

export interface UserPublicPreview {
  id: number | string;
  username?: string;
  handle?: string;
  photo?: Media;
}

export interface UserSummary extends UserPublicPreview {
  firstName: string;
  lastName?: string;
  role: UserRole;
  address: Address;
}

export interface CurrencyInfo {
  tonToUsdRate: string;
  localCurrencyToUsdRate: string;
  localCurrencyCode: string;
}

export interface UserPrivateProfile extends UserSummary {
  telegramId: string;
  phoneNumber?: string;
  email?: string;
  walletAddress?: string;
  stores?: StorePreview[];
  orders?: OrderSummary[];
  currencyInfo: CurrencyInfo;
}

export interface UpdateContactLocationDto {
  phoneNumber: string;
  email: string;
  countryId: number;
  stateId: number;
  cityId: number;
}

export interface UpdateLanguageDto {
  languageCode: string;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
}

export interface UpdatePreferencesDto {
  languageCode: string;
  currencyCode: string;
}
