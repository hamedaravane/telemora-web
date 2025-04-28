import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateOrderFormData,
  CreateOrderShipmentFormData,
  UpdateOrderFormData,
} from '@/libs/orders/schemas';
import { OrderDetail, OrderSummary } from '@/libs/orders/types';
import { isDev } from '@/utils';
import { generateMockOrderDetail, generateMockOrderSummariesWithUser } from '@/libs/orders/mocks';
import {
  addShipment,
  createOrder,
  getMyOrders,
  getOrderDetails,
  updateOrder,
} from '@/libs/orders/api';
import { UserPrivateProfile } from '@/libs/users/types';
import { generateMockUserPrivateProfile } from '@/libs/users/mocks';

export function useMyOrders() {
  return useQuery<{
    orders: OrderSummary[];
    userProfile: UserPrivateProfile;
  }>({
    queryKey: ['orders'],
    queryFn: async () => {
      if (isDev) {
        return generateMockOrderSummariesWithUser();
      }
      const orders = await getMyOrders();
      const userProfile = await generateMockUserPrivateProfile();
      return { orders, userProfile };
    },
  });
}

export function useOrderDetails(id: number) {
  return useQuery<OrderDetail>({
    queryKey: ['order-detail', id],
    queryFn: () => (isDev ? generateMockOrderDetail() : getOrderDetails(id)),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<OrderDetail, Error, CreateOrderFormData>({
    mutationFn: (data) => (isDev ? generateMockOrderDetail() : createOrder(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrder(id: number) {
  const queryClient = useQueryClient();

  return useMutation<OrderDetail, Error, UpdateOrderFormData>({
    mutationFn: (data) => (isDev ? generateMockOrderDetail() : updateOrder(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order-detail', id] });
    },
  });
}

export function useAddShipment(id: number) {
  const queryClient = useQueryClient();

  return useMutation<OrderDetail, Error, CreateOrderShipmentFormData>({
    mutationFn: (data) => (isDev ? generateMockOrderDetail() : addShipment(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-detail', id] });
    },
  });
}
