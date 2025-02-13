import { UserRole } from '@/types/common';
import { Order } from '@/libs/orders/types';
import { Payment } from '@/libs/payments/types';
import { Store } from '@/libs/stores/types';
import { Review } from '@/libs/reviews/types';

export interface User {
  telegramId: string;
  firstName: string;
  lastName?: string;
  telegramUsername?: string;
  telegramLanguageCode?: string;
  isTelegramPremium?: boolean;
  telegramPhotoUrl?: string;
  phoneNumber?: string;
  email?: string;
  role: UserRole;
  walletAddress?: string;
  orders: Order[];
  reviews: Review[];
  stores: Store[];
  payments: Payment[];
}

export interface CreateUserDto {
  telegramId: string;
  firstName: string;
  lastName?: string;
  telegramUsername?: string;
  telegramLanguageCode?: string;
  isTelegramPremium?: boolean;
  telegramPhotoUrl?: string;
  phoneNumber?: string;
  email?: string;
  role: UserRole;
  walletAddress?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  telegramUsername?: string;
  telegramLanguageCode?: string;
  isTelegramPremium?: boolean;
  telegramPhotoUrl?: string;
  phoneNumber?: string;
  email?: string;
  role?: UserRole;
  walletAddress?: string;
}
