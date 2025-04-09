import {
  CreateOrderDto,
  CreateOrderShipmentDto,
  OrderDetail,
  OrderSummary,
  UpdateOrderDto,
} from '@/libs/orders/types';
import { useQuery } from '@tanstack/react-query';
import { generateMockOrderSummary } from '@/libs/orders/mocks';
import httpClient from '@/libs/common/http-client';

export async function getMyOrders() {
  return httpClient.get<OrderSummary[]>('orders');
}

export async function getOrderDetails(id: number) {
  return httpClient.get<OrderDetail>(`/orders/${id}`);
}

export async function createOrder(data: CreateOrderDto) {
  return httpClient.post<OrderDetail>(`/orders`, data);
}

export async function updateOrder(id: number, data: UpdateOrderDto) {
  return httpClient.patch<OrderDetail>(`/orders/${id}`, data);
}

export async function addShipment(id: number, data: CreateOrderShipmentDto) {
  return httpClient.post<OrderDetail>(`/orders/${id}/shipment`, data);
}

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
