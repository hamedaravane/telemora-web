import { CreatePaymentDto, PaymentDetail, PaymentSummary } from '@/libs/payments/types';
import httpClient from '@/libs/common/http-client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export async function getPayments() {
  return httpClient.get<PaymentSummary[]>('/payments');
}

export async function getPaymentDetails(id: number) {
  return httpClient.get<PaymentDetail>(`/payments/${id}`);
}

export async function createPayment(data: CreatePaymentDto) {
  return httpClient.post<PaymentDetail>('/payments/create', data);
}

export function usePayments() {
  return useQuery({
    queryKey: ['payments'],
    queryFn: getPayments,
  });
}

export function usePaymentDetails(id: number) {
  return useQuery({
    queryKey: ['payment-detail', id],
    queryFn: () => getPaymentDetails(id),
    enabled: !!id,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentDto) => createPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
}
