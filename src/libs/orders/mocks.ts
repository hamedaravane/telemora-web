import { faker } from '@faker-js/faker';
import { OrderDetail, OrderItemPreview, OrderStatus, OrderSummary } from './types';
import { generateMockStorePreview } from '@/libs/stores/mocks';
import { generateMockProductPreview } from '@/libs/products/mocks';
import { generateMockPaymentSummary } from '@/libs/payments/mocks';
import { generateMockUserSummary } from '@/libs/users/mocks';

export function generateMockOrderItemPreview(): OrderItemPreview {
  return {
    product: generateMockProductPreview(faker.number.int()),
    quantity: faker.number.int({ min: 1, max: 5 }),
    totalPrice: Number(faker.commerce.price({ min: 10, max: 300 })),
  };
}

export function generateMockOrderSummary(): OrderSummary {
  return {
    id: faker.number.int(),
    status: faker.helpers.enumValue(OrderStatus),
    totalAmount: Number(faker.commerce.price({ min: 50, max: 500 })),
    store: generateMockStorePreview(),
    deliveryDate: faker.date.soon(),
    createdAt: faker.date.past(),
  };
}

export function generateMockOrderDetail(): OrderDetail {
  return {
    ...generateMockOrderSummary(),
    items: Array.from({ length: 2 }, () => generateMockOrderItemPreview()),
    shipment: {
      id: faker.number.int(),
      trackingNumber: faker.string.uuid(),
      courierService: faker.company.name(),
      deliveryEstimate: faker.date.future(),
      shippedAt: faker.date.past(),
    },
    payment: generateMockPaymentSummary(),
    buyer: generateMockUserSummary(),
  };
}
