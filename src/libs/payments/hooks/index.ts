import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreatePaymentDto } from '@/libs/payments/types';
import { createPayment, getPaymentDetails, getPayments } from '@/libs/payments/api';

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
