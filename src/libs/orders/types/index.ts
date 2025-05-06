import { PaymentSummary } from '@/libs/payments/types';
import { ProductPreview } from '@/libs/products/types';
import { StorePreview } from '@/libs/stores/types';
import { UserSummary } from '@/libs/users/types';

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

export interface OrderItemPreview {
  product: ProductPreview;
  quantity: number;
  totalPrice: number;
}

export interface OrderSummary {
  id: number | string;
  status: OrderStatus;
  totalAmount: number;
  store: StorePreview;
  deliveryDate: Date;
  createdAt: Date;
}

export interface OrderDetail extends OrderSummary {
  items: OrderItemPreview[];
  shipment?: OrderShipment;
  payment?: PaymentSummary;
  buyer: UserSummary;
}

export interface OrderShipment {
  id: number;
  trackingNumber: string;
  carrierTrackingUrl?: string;
  status?: 'created' | 'in_transit' | 'delivered' | 'failed';
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

interface CreateOrderItemDto {
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
