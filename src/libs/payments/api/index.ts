import httpClient from '@/libs/common/utils/http-client';
import { generateMockPaymentDetail, generateMockPaymentSummaries } from '@/libs/payments/mocks';
import { CreatePaymentDto, PaymentDetail, PaymentSummary } from '@/libs/payments/types';

import { isDev } from '../../common/utils';

export async function getPayments() {
  return isDev ? generateMockPaymentSummaries() : httpClient.get<PaymentSummary[]>('/payments');
}

export async function getPaymentDetails(id: number) {
  return isDev ? generateMockPaymentDetail() : httpClient.get<PaymentDetail>(`/payments/${id}`);
}

export async function createPayment(data: CreatePaymentDto) {
  return isDev
    ? generateMockPaymentDetail()
    : httpClient.post<PaymentDetail>('/payments/create', data);
}
