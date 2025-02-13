# Files

- File: ./orders-api.ts

```
import axios from 'axios';
import { CreateOrderDto, Order, UpdateOrderDto } from '@/libs/orders/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createOrders = async (data: CreateOrderDto): Promise<Order> => {
  const response = await axios.post(`${API_BASE_URL}/orders`, data);

  return response.data;
};

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${API_BASE_URL}/orders`);

  return response.data;
};

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
```

- File: ./types/index.ts

```
import { OrderStatus } from '@/types/common';
import { User } from '@/libs/users/types';
import { Payment } from '@/libs/payments/types';
import { Store } from '@/libs/stores/types';
import { Product } from '@/libs/products/types';

export interface Order {
  id: number;
  buyer: User;
  store: Store;
  status: OrderStatus;
  items: OrderItem[];
  shipments: OrderShipment[];
  payments: Payment[];
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface OrderShipment {
  id: number;
  trackingNumber: string;
  courierService: string;
  deliveryEstimate: Date;
  shippedAt: Date;
}

export interface CreateOrderDto {
  buyerId: number;
  items: CreateOrderItemDto[];
  status?: OrderStatus;
  shippingAddress?: string;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  shippingAddress?: string;
  items?: CreateOrderItemDto[];
}

export interface CreateOrderShipmentDto {
  trackingNumber: string;
  courierService: string;
  deliveryEstimate?: string;
}

export interface CreateOrderItemDto {
  productId: number;
  quantity: number;
}
```

