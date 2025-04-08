import {
  CreatePaymentDto,
  PaymentDetail,
  PaymentSummary,
  UpdatePaymentDto,
} from '@/libs/payments/types';
import httpClient from '@/libs/common/http-client';

export const createPayments = async (data: CreatePaymentDto) => {
  return httpClient.post<PaymentDetail>(`/payments`, data);
};

export const getAllPayments = async () => {
  return httpClient.get<PaymentSummary[]>(`/payments`);
};

export const getPaymentsById = async (id: string | number) => {
  return httpClient.get<PaymentDetail>(`/payments/${id}`);
};

export const updatePayments = async (id: string | number, data: UpdatePaymentDto) => {
  return httpClient.patch<PaymentDetail>(`/payments/${id}`, data);
};

export const deletePayments = async (id: string | number): Promise<void> => {
  return httpClient.delete<void>(`/payments/${id}`);
};
