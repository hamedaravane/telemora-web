import { UserPreview } from '@/libs/users/types';
import { StorePreview } from '@/libs/stores/types';
import { PaymentPreview } from '@/libs/payments/types';
import { ProductPreview } from '@/libs/products/types';

/**
 * Models in this file are implemented according to the backend project specifications.
 * It is strongly recommended **not** to modify them under any circumstances.
 * Any changes to these models may destabilize or even break the entire system.
 */

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  REFUNDED = 'refunded',
}

export interface Order {
  id: number;
  buyer: UserPreview;
  store: StorePreview;
  status: OrderStatus;
  items: OrderItem[];
  shipment: OrderShipment;
  payment: PaymentPreview;
  totalAmount: number;
  deliveryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  product: ProductPreview;
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

export interface CreateOrderItemDto {
  productId: number;
  quantity: number;
}

export interface CreateOrderShipmentDto {
  trackingNumber: string;
  courierService: string;
  deliveryEstimate?: string;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  shippingAddress?: string;
  items?: CreateOrderItemDto[];
}
