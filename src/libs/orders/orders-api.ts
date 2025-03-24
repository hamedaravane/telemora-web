import axios from 'axios';
import { CreateOrderDto, Order, UpdateOrderDto } from '@/libs/orders/types';
import { useQuery } from '@tanstack/react-query';
import { generateMockOrders } from '@/libs/orders/mocks';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createOrders = async (data: CreateOrderDto): Promise<Order> => {
  const response = await axios.post(`${API_BASE_URL}/orders`, data);

  return response.data;
};

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`/api/orders`);
  return response.data;
};

export const fetchMockOrders = async (): Promise<Order[]> => {
  return generateMockOrders(2);
};

export function useOrdersData() {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5,
  });
}

export const getOrdersById = async (id: string | number): Promise<Order> => {
  const response = await axios.get(`${API_BASE_URL}/orders/${id}`);

  return response.data;
};

export const updateOrders = async (id: string | number, data: UpdateOrderDto): Promise<Order> => {
  const response = await axios.patch(`${API_BASE_URL}/orders/${id}`, data);

  return response.data;
};

export const deleteOrders = async (id: string | number): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/orders/${id}`);

  return response.data;
};
