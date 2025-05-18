import { isDev } from '@/libs/common/utils';
import httpClient from '@/libs/common/utils/http-client';
import {
  generateMockReviewDetail,
  generateMockReviewPreviews,
  generateMockReviewReplyPreview,
  generateMockReviewReportPreview,
} from '@/libs/reviews/mocks';
import {
  CreateReviewDto,
  CreateReviewReplyDto,
  CreateReviewReportDto,
  ReviewDetail,
  ReviewPreview,
  ReviewReplyPreview,
  ReviewReportPreview,
} from '@/libs/reviews/types';

export async function createReview(productId: number, data: CreateReviewDto) {
  return isDev
    ? generateMockReviewDetail()
    : httpClient.post<ReviewDetail>(`/reviews/product/${productId}/create`, data);
}

export async function getProductReviews(productId: number) {
  return isDev
    ? generateMockReviewPreviews()
    : httpClient.get<ReviewPreview[]>(`/reviews/product/${productId}`);
}

export async function getReviewsById(id: string | number) {
  return isDev ? generateMockReviewDetail() : httpClient.get<ReviewDetail>(`/reviews/${id}`);
}

export async function replyToReview(reviewId: number, data: CreateReviewReplyDto) {
  return isDev
    ? generateMockReviewReplyPreview()
    : httpClient.post<ReviewReplyPreview>(`/reviews/${reviewId}/reply`, data);
}

export async function reportReview(reviewId: number, data: CreateReviewReportDto) {
  return isDev
    ? generateMockReviewReportPreview()
    : httpClient.post<ReviewReportPreview>(`/reviews/${reviewId}/report`, data);
}

export async function deleteReviews(id: string | number) {
  return httpClient.delete<void>(`/reviews/${id}/delete`);
}
