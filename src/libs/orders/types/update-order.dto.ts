import { CreateOrderItemDto } from "./create-order-item.dto";

import { OrderStatus } from "@/types/common";

export interface UpdateOrderDto {
  status?: OrderStatus;
  shippingAddress?: string;
  items?: CreateOrderItemDto[];
}
