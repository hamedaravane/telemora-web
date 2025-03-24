import { faker } from '@faker-js/faker';
import { Order, OrderItem, OrderStatus } from '@/libs/orders/types';
import { Product, ProductType } from '@/libs/products/types';
import { generateMockStore } from '@/libs/stores/mocks';
import { generateMockUser } from '@/libs/users/mocks';
import { Payment } from '@/libs/payments/types';

export function generateMockOrders(count: number = faker.number.int(10)): Order[] {
  return Array.from({ length: count }, (_, index): Order => generateMockOrder(index));
}

export function generateMockOrder(id: number = 0): Order {
  return {
    id,
    totalAmount: +faker.finance.amount(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    buyer: generateMockUser(),
    store: generateMockStore(),
    status: faker.helpers.enumValue(OrderStatus),
    items: Array.from(
      { length: faker.number.int(3) },
      (_, index): OrderItem => generateMockOrderItem(index),
    ),
    deliveryDate: faker.date.future(),
    payment: {} as Payment, // TODO: generate mock payment
    shipment: {
      id: faker.number.int(100),
      trackingNumber: faker.string.alphanumeric(),
      courierService: faker.helpers.enumValue(ProductType),
      deliveryEstimate: faker.date.future(),
      shippedAt: faker.date.future(),
    },
  };
}

export function generateMockOrderItem(id: number = 0): OrderItem {
  return {
    id,
    product: {} as Product, // TODO: generate mock product
    quantity: faker.number.int(3),
    totalPrice: +faker.finance.amount(),
  };
}
