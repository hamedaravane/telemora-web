import { faker } from '@faker-js/faker';
import { PaymentDetail, PaymentStatus, PaymentSummary } from '../types';
import { generateMockOrderSummary } from '@/libs/orders/mocks';
import { generateMockUserSummary } from '@/libs/users/mocks';

export async function generateMockPaymentSummary(): Promise<PaymentSummary> {
  return {
    id: faker.string.uuid(),
    status: faker.helpers.arrayElement(['PENDING', 'COMPLETED', 'FAILED']) as PaymentStatus,
    amount: faker.finance.amount(),
    transactionHash: faker.string.hexadecimal({ length: 64 }),
    createdAt: faker.date.past(),
  };
}

export async function generateMockPaymentSummaries(): Promise<PaymentSummary[]> {
  return Promise.all(Array.from({ length: 5 }, () => generateMockPaymentSummary()));
}

export async function generateMockPaymentDetail(): Promise<PaymentDetail> {
  return {
    ...(await generateMockPaymentSummary()),
    gasFee: faker.finance.amount(),
    commission: faker.finance.amount(),
    fromWalletAddress: faker.finance.ethereumAddress(),
    toWalletAddress: faker.finance.ethereumAddress(),
    order: await generateMockOrderSummary(),
    user: await generateMockUserSummary(),
  };
}
