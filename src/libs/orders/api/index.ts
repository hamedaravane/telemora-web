import httpClient from '@/libs/common/utils/http-client';
import {
  CreateOrderFormData,
  CreateOrderShipmentFormData,
  UpdateOrderFormData,
} from '@/libs/orders/schemas';
import { OrderDetail, OrderSummary } from '@/libs/orders/types';

export async function getMyOrders() {
  return httpClient.get<OrderSummary[]>('orders');
}

export async function getOrderDetails(id: number) {
  return httpClient.get<OrderDetail>(`/orders/${id}`);
}

export async function createOrder(data: CreateOrderFormData) {
  return httpClient.post<OrderDetail>(`/orders/create`, data);
}

export async function updateOrder(id: number, data: UpdateOrderFormData) {
  return httpClient.patch<OrderDetail>(`/orders/update/${id}`, data);
}

export async function addShipment(id: number, data: CreateOrderShipmentFormData) {
  return httpClient.post<OrderDetail>(`/orders/${id}/shipment`, data);
}
