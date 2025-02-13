# Files

- File: ./payments-api.ts

```
import axios from 'axios';
import { CreatePaymentDto, Payment, UpdatePaymentDto } from '@/libs/payments/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createPayments = async (data: CreatePaymentDto): Promise<Payment> => {
  const response = await axios.post(`${API_BASE_URL}/payments`, data);

  return response.data;
};

export const getAllPayments = async (): Promise<Payment[]> => {
  const response = await axios.get(`${API_BASE_URL}/payments`);

  return response.data;
};

export const getPaymentsById = async (id: string | number): Promise<Payment> => {
  const response = await axios.get(`${API_BASE_URL}/payments/${id}`);

  return response.data;
};

export const updatePayments = async (
  id: string | number,
  data: UpdatePaymentDto,
): Promise<Payment> => {
  const response = await axios.patch(`${API_BASE_URL}/payments/${id}`, data);

  return response.data;
};

export const deletePayments = async (id: string | number): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/payments/${id}`);

  return response.data;
};
```

- File: ./types/index.ts

```
import { PaymentStatus } from '@/types/common';
import { User } from '@/libs/users/types';
import { Order } from '@/libs/orders/types';

export interface Payment {
  id: string;
  paymentId: string;
  order: Order;
  user: User;
  amount: string;
  status: PaymentStatus;
  transactionHash: string;
  fromWalletAddress: string;
  toWalletAddress: string;
  gasFee: string;
  commission: string;
}

export interface UpdatePaymentDto {
  status?: PaymentStatus;
  transactionHash?: string;
  gasFee?: string;
  commission?: string;
}

export interface CreatePaymentDto {
  orderId?: string;
  amount: string;
  fromWalletAddress?: string;
  toWalletAddress?: string;
  transactionHash?: string;
  gasFee?: string;
  commission?: string;
}
```

