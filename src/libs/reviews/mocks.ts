import { faker } from '@faker-js/faker';
import { ReportReason, ReviewPreview, ReviewReplyPreview, ReviewReportPreview } from './types';
import { generateMockUserPublicPreview } from '@/libs/users/mocks';

export function generateMockReviewPreview(productId: number): ReviewPreview {
  return {
    id: faker.number.int(),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.sentence(),
    productId,
    buyer: generateMockUserPublicPreview(),
    createdAt: faker.date.recent(),
  };
}

export function generateMockReviewReplyPreview(): ReviewReplyPreview {
  return {
    id: faker.number.int(),
    seller: generateMockUserPublicPreview(),
    replyText: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
  };
}

export function generateMockReviewReportPreview(): ReviewReportPreview {
  return {
    id: faker.number.int(),
    reportedBy: generateMockUserPublicPreview(),
    reason: faker.helpers.arrayElement(Object.values(ReportReason)),
    comment: faker.lorem.sentence(),
    reportedAt: faker.date.recent(),
  };
}
