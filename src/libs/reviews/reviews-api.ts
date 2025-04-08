import {
  CreateReviewDto,
  CreateReviewReplyDto,
  CreateReviewReportDto,
  ReviewDetail,
  ReviewPreview,
  ReviewReplyPreview,
  ReviewReportPreview,
} from '@/libs/reviews/types';
import httpClient from '@/libs/common/http-client';

export async function createReview(productId: number, data: CreateReviewDto) {
  return httpClient.post<ReviewDetail>(`/reviews/${productId}`, data);
}

export async function getProductReviews(productId: number) {
  return httpClient.get<ReviewPreview[]>(`/reviews/${productId}`);
}

export async function getReviewsById(id: string | number) {
  return httpClient.get<ReviewDetail>(`/reviews/${id}`);
}

export async function replyToReview(reviewId: number, data: CreateReviewReplyDto) {
  return httpClient.post<ReviewReplyPreview>(`/reviews/${reviewId}/reply`, data);
}

export async function reportReview(reviewId: number, data: CreateReviewReportDto) {
  return httpClient.post<ReviewReportPreview>(`/reviews/${reviewId}/report`, data);
}

export async function deleteReviews(id: string | number) {
  return httpClient.delete<void>(`/reviews/${id}`);
}
