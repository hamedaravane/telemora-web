import { faker } from '@faker-js/faker';
import { ReportReason, ReviewPreview, ReviewReplyPreview, ReviewReportPreview } from './types';
import { generateMockUserPublicPreview } from '@/libs/users/mocks';

export async function generateMockReviewPreview(productId: number): Promise<ReviewPreview> {
  return {
    id: faker.number.int(),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.sentence(),
    productId,
    buyer: await generateMockUserPublicPreview(),
    createdAt: faker.date.recent(),
  };
}

export async function generateMockReviewReplyPreview(): Promise<ReviewReplyPreview> {
  return {
    id: faker.number.int(),
    seller: await generateMockUserPublicPreview(),
    replyText: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
  };
}

export async function generateMockReviewReportPreview(): Promise<ReviewReportPreview> {
  return {
    id: faker.number.int(),
    reportedBy: await generateMockUserPublicPreview(),
    reason: faker.helpers.arrayElement(Object.values(ReportReason)),
    comment: faker.lorem.sentence(),
    reportedAt: faker.date.recent(),
  };
}
