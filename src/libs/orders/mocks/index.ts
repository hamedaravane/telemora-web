import { faker } from '@faker-js/faker';
import { OrderDetail, OrderItemPreview, OrderStatus, OrderSummary } from '../types';
import { generateMockStorePreview } from '@/libs/stores/mocks';
import { generateMockProductPreview } from '@/libs/products/mocks';
import { generateMockPaymentSummary } from '@/libs/payments/mocks';
import { generateMockUserSummary } from '@/libs/users/mocks';

export async function generateMockOrderItemPreview(): Promise<OrderItemPreview> {
  return {
    product: await generateMockProductPreview(faker.number.int()),
    quantity: faker.number.int({ min: 1, max: 5 }),
    totalPrice: Number(faker.commerce.price({ min: 10, max: 300 })),
  };
}

export async function generateMockOrderSummary(): Promise<OrderSummary> {
  return {
    id: faker.number.int(),
    status: faker.helpers.enumValue(OrderStatus),
    totalAmount: Number(faker.commerce.price({ min: 50, max: 500 })),
    store: await generateMockStorePreview(),
    deliveryDate: faker.date.soon(),
    createdAt: faker.date.past(),
  };
}

export async function generateMockOrderDetail(): Promise<OrderDetail> {
  return {
    ...(await generateMockOrderSummary()),
    items: await generateMockOrderItemPreviews(),
    shipment: {
      id: faker.number.int(),
      trackingNumber: faker.string.uuid(),
      courierService: faker.company.name(),
      deliveryEstimate: faker.date.future(),
      shippedAt: faker.date.past(),
    },
    payment: await generateMockPaymentSummary(),
    buyer: await generateMockUserSummary(),
  };
}

export async function generateMockOrderSummaries(): Promise<OrderSummary[]> {
  return Promise.all(Array.from({ length: 3 }, () => generateMockOrderSummary()));
}

export async function generateMockOrderItemPreviews(): Promise<OrderItemPreview[]> {
  return Promise.all(Array.from({ length: 3 }, () => generateMockOrderItemPreview()));
}
