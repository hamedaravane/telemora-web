import { Payment } from '@/libs/payments/types';
import { Order } from '@/libs/orders/types';
import { Review } from '@/libs/reviews/types';
import { Store } from '@/libs/stores/types';
import { City, Country, State } from '@/libs/location/types';

/**
 * Models in this file are implemented according to the backend project specifications.
 * It is strongly recommended **not** to modify them under any circumstances.
 * Any changes to these models may destabilize or even break the entire system.
 */

export enum UserRole {
  BUYER = 'buyer',
  SELLER = 'seller',
  BOTH = 'both',
}

export interface User {
  id: number;
  telegramId: string;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  hasTelegramPremium?: boolean;
  photoUrl?: string;
  phoneNumber?: string;
  email?: string;
  role: UserRole;
  walletAddress?: string;
  country?: Country;
  state?: State;
  city?: City;
  orders: Order[];
  reviews: Review[];
  stores: Store[];
  payments: Payment[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
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
