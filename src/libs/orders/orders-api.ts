import {
  CreateOrderDto,
  CreateOrderShipmentDto,
  OrderDetail,
  OrderSummary,
  UpdateOrderDto,
} from '@/libs/orders/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpClient from '@/libs/common/http-client';

async function getMyOrders() {
  return httpClient.get<OrderSummary[]>('orders');
}

async function getOrderDetails(id: number) {
  return httpClient.get<OrderDetail>(`/orders/${id}`);
}

async function createOrder(data: CreateOrderDto) {
  return httpClient.post<OrderDetail>(`/orders`, data);
}

async function updateOrder(id: number, data: UpdateOrderDto) {
  return httpClient.patch<OrderDetail>(`/orders/${id}`, data);
}

async function addShipment(id: number, data: CreateOrderShipmentDto) {
  return httpClient.post<OrderDetail>(`/orders/${id}/shipment`, data);
}

export function useMyOrders() {
  return useQuery<OrderSummary[]>({
    queryKey: ['orders'],
    queryFn: getMyOrders,
  });
}

export function useOrderDetails(id: number) {
  return useQuery<OrderDetail>({
    queryKey: ['order-detail', id],
    queryFn: () => getOrderDetails(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderDto) => createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrder(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateOrderDto) => updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-detail', id] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useAddShipment(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderShipmentDto) => addShipment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-detail', id] });
    },
  });
}
