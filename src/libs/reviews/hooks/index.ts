import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReviewDetail, ReviewPreview } from '@/libs/reviews/types';
import {
  createReview,
  deleteReviews,
  getProductReviews,
  getReviewsById,
  replyToReview,
  reportReview,
} from '@/libs/reviews/api';
import {
  CreateReviewFormData,
  CreateReviewReplyFormData,
  CreateReviewReportFormData,
} from '@/libs/reviews/schemas';

export function useProductReviews(productId: number) {
  return useQuery<ReviewPreview[]>({
    queryKey: ['reviews', 'product', productId],
    queryFn: () => getProductReviews(productId),
  });
}

export function useReviewDetail(id: string | number) {
  return useQuery<ReviewDetail>({
    queryKey: ['reviews', 'detail', id],
    queryFn: () => getReviewsById(id),
  });
}

export function useCreateReviewMutation(productId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReviewFormData) => createReview(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'product', productId] });
    },
  });
}

export function useReplyToReviewMutation(reviewId: number) {
  return useMutation({
    mutationFn: (data: CreateReviewReplyFormData) => replyToReview(reviewId, data),
  });
}

export function useReportReviewMutation(reviewId: number) {
  return useMutation({
    mutationFn: (data: CreateReviewReportFormData) => reportReview(reviewId, data),
  });
}

export function useDeleteReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteReviews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}
