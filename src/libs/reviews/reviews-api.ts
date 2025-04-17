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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isDev } from '@/utils';
import {
  generateMockReviewDetail,
  generateMockReviewPreviews,
  generateMockReviewReplyPreview,
  generateMockReviewReportPreview,
} from '@/libs/reviews/mocks';

async function createReview(productId: number, data: CreateReviewDto) {
  return httpClient.post<ReviewDetail>(`/reviews/${productId}`, data);
}

async function getProductReviews(productId: number) {
  return httpClient.get<ReviewPreview[]>(`/reviews/${productId}`);
}

async function getReviewsById(id: string | number) {
  return httpClient.get<ReviewDetail>(`/reviews/${id}`);
}

async function replyToReview(reviewId: number, data: CreateReviewReplyDto) {
  return httpClient.post<ReviewReplyPreview>(`/reviews/${reviewId}/reply`, data);
}

async function reportReview(reviewId: number, data: CreateReviewReportDto) {
  return httpClient.post<ReviewReportPreview>(`/reviews/${reviewId}/report`, data);
}

async function deleteReviews(id: string | number) {
  return httpClient.delete<void>(`/reviews/${id}`);
}

export function useProductReviews(productId: number) {
  return useQuery<ReviewPreview[]>({
    queryKey: ['reviews', 'product', productId],
    queryFn: () => (isDev ? generateMockReviewPreviews() : getProductReviews(productId)),
  });
}

export function useReviewDetail(id: string | number) {
  return useQuery<ReviewDetail>({
    queryKey: ['reviews', 'detail', id],
    queryFn: () => (isDev ? generateMockReviewDetail() : getReviewsById(id)),
  });
}

export function useCreateReview(productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewDto) =>
      isDev ? generateMockReviewDetail() : createReview(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'product', productId] });
    },
  });
}

export function useReplyToReview(reviewId: number) {
  return useMutation({
    mutationFn: (data: CreateReviewReplyDto) =>
      isDev ? generateMockReviewReplyPreview() : replyToReview(reviewId, data),
  });
}

export function useReportReview(reviewId: number) {
  return useMutation({
    mutationFn: (data: CreateReviewReportDto) =>
      isDev ? generateMockReviewReportPreview() : reportReview(reviewId, data),
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteReviews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}
