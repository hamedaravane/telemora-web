import { OrderSummary } from '@/libs/orders/types';
import { UserSummary } from '@/libs/users/types';

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export interface PaymentSummary {
  id: number | string;
  status: PaymentStatus;
  amount: string;
  transactionHash: string;
  createdAt: Date;
}

export interface PaymentDetail extends PaymentSummary {
  gasFee?: string;
  commission?: string;
  fromWalletAddress?: string;
  toWalletAddress?: string;
  order: OrderSummary;
  user: UserSummary;
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

export class UpdatePaymentDto {
  status?: PaymentStatus;
  transactionHash?: string;
  gasFee?: string;
  commission?: string;
}
