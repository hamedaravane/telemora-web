import { faker } from '@faker-js/faker';
import { PaymentDetail, PaymentStatus, PaymentSummary } from './types';
import { generateMockOrderSummary } from '@/libs/orders/mocks';
import { generateMockUserSummary } from '@/libs/users/mocks';

export function generateMockPaymentSummary(): PaymentSummary {
  return {
    id: faker.string.uuid(),
    status: faker.helpers.arrayElement(['PENDING', 'COMPLETED', 'FAILED']) as PaymentStatus,
    amount: faker.finance.amount(),
    transactionHash: faker.string.hexadecimal({ length: 64 }),
    createdAt: faker.date.past(),
  };
}

export function generateMockPaymentDetail(): PaymentDetail {
  return {
    ...generateMockPaymentSummary(),
    gasFee: faker.finance.amount(),
    commission: faker.finance.amount(),
    fromWalletAddress: faker.finance.ethereumAddress(),
    toWalletAddress: faker.finance.ethereumAddress(),
    order: generateMockOrderSummary(),
    user: generateMockUserSummary(),
  };
}
