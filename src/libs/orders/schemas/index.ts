import { z } from 'zod';

export const createOrderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export const createOrderSchema = z.object({
  buyerId: z.number().int().positive(),
  items: z.array(createOrderItemSchema).min(1, 'At least one product is required'),
  status: z.enum(['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']).optional(),
  shippingAddress: z.string().min(5, 'Shipping address is too short').optional(),
});

export const createOrderShipmentSchema = z.object({
  trackingNumber: z.string().min(3, 'Tracking number is required'),
  courierService: z.string().min(2, 'Courier service is required'),
  deliveryEstimate: z.string().optional(),
});

export const updateOrderSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']).optional(),
  shippingAddress: z.string().optional(),
  items: z.array(createOrderItemSchema).optional(),
});

export type CreateOrderFormData = z.infer<typeof createOrderSchema>;
export type UpdateOrderFormData = z.infer<typeof updateOrderSchema>;
export type CreateOrderShipmentFormData = z.infer<typeof createOrderShipmentSchema>;
