import { CreateOrderItemDto } from "./create-order-item.dto";

import { OrderStatus } from "@/types/common";

export interface CreateOrderDto {
  buyerId: number;
  items: CreateOrderItemDto[];
  status?: OrderStatus;
  shippingAddress?: string;
}
