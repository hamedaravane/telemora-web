import { CreateOrderDto, OrderDetail, OrderSummary, UpdateOrderDto } from '@/libs/orders/types';
import { useQuery } from '@tanstack/react-query';
import { generateMockOrderSummary } from '@/libs/orders/mocks';
import httpClient from '@/libs/common/http-client';

export const createOrders = async (data: CreateOrderDto) => {
  return httpClient.post<OrderDetail>(`/orders`, data);
};

export const fetchOrders = async () => {
  return httpClient.get<OrderSummary[]>(`/api/orders`);
};

export const fetchMockOrders = async (): Promise<OrderSummary[]> => {
  return Array.from({ length: 10 }, () => generateMockOrderSummary());
};

export function useOrdersData() {
  return useQuery<OrderSummary[]>({
    queryKey: ['orders'],
    queryFn: fetchMockOrders,
    staleTime: 1000 * 60 * 5,
  });
}

export const getOrdersById = async (id: string | number) => {
  return httpClient.get<OrderDetail>(`/orders/${id}`);
};

export const updateOrders = async (id: string | number, data: UpdateOrderDto) => {
  return httpClient.patch<OrderDetail>(`/orders/${id}`, data);
};

export const deleteOrders = async (id: string | number) => {
  return httpClient.delete<void>(`/orders/${id}`);
};
