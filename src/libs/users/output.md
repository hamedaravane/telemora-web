# Files

- File: ./users-api.ts

```
import axios from 'axios';
import { CreateUserDto, UpdateUserDto, User } from '@/libs/users/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createUsers = async (data: CreateUserDto): Promise<User> => {
  const response = await axios.post(`${API_BASE_URL}/users`, data);

  return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_BASE_URL}/users`);

  return response.data;
};

export const getUsersById = async (id: string | number): Promise<User> => {
  const response = await axios.get(`${API_BASE_URL}/users/${id}`);

  return response.data;
};

export const updateUsers = async (id: string | number, data: UpdateUserDto): Promise<User> => {
  const response = await axios.patch(`${API_BASE_URL}/users/${id}`, data);

  return response.data;
};

export const deleteUsers = async (id: string | number): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/users/${id}`);

  return response.data;
};
```

- File: ./types/index.ts

```
import { UserRole } from '@/types/common';
import { Order } from '@/libs/orders/types';
import { Payment } from '@/libs/payments/types';
import { Store } from '@/libs/stores/types';
import { Review } from '@/libs/reviews/types';

export interface User {
  id: number;
  telegramId: string;
  name: string;
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
  name: string;
  phoneNumber?: string;
  email?: string;
  role: UserRole;
}

export interface UpdateUserDto {
  name?: string;
  phoneNumber?: string;
  email?: string;
  role?: UserRole;
}
```

