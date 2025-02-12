import { StoreCategory } from '@/types/common';
import { User } from '@/libs/users/types';
import { Order } from '@/libs/orders/types';
import { Product } from '@/libs/products/types';

export interface Store {
  id: number;
  name: string;
  logoUrl?: string;
  description?: string;
  category: StoreCategory;
  owner: User;
  admins: User[];
  products: Product[];
  orders: Order[];
  contactNumber?: string;
  email?: string;
  address?: string;
  socialMediaLinks?: { [platform: string]: string };
  reputation: number;
  workingHours?: string;
}

export interface CreateStoreDto {
  name: string;
  logoUrl?: string;
  description?: string;
  category: StoreCategory;
  contactNumber?: string;
  email?: string;
  address?: string;
  socialMediaLinks?: { [platform: string]: string };
  reputation?: number;
  workingHours?: string;
}

export interface UpdateStoreDto {
  name?: string;
  logoUrl?: string;
  description?: string;
  category?: StoreCategory;
  contactNumber?: string;
  email?: string;
  address?: string;
  socialMediaLinks?: { [platform: string]: string };
  reputation?: number;
  workingHours?: string;
}
