import { faker } from '@faker-js/faker';

import { generateMockUserPublicPreview } from '@/libs/users/mocks';

import {
  ReportReason,
  ReviewDetail,
  ReviewPreview,
  ReviewReplyPreview,
  ReviewReportPreview,
} from '../types';

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

export async function generateMockReviewDetail(): Promise<ReviewDetail> {
  return {
    ...(await generateMockReviewPreview(1)),
    images: [],
    isFlagged: false,
    replies: [await generateMockReviewReplyPreview()],
    reports: [await generateMockReviewReportPreview()],
    videos: [],
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

export async function generateMockReviewPreviews(): Promise<ReviewPreview[]> {
  return Promise.all(
    Array.from({ length: 5 }, () => generateMockReviewPreview(faker.number.int())),
  );
}
