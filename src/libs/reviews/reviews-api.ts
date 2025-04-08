import { CreateReviewDto, ReviewDetail, ReviewPreview } from '@/libs/reviews/types';
import httpClient from '@/libs/common/http-client';

export const createReviews = async (data: CreateReviewDto) => {
  return httpClient.post<ReviewDetail>(`/reviews`, data);
};

export const getAllReviews = async () => {
  return httpClient.get<ReviewPreview[]>(`/reviews`);
};

export const getReviewsById = async (id: string | number) => {
  return httpClient.get<ReviewDetail>(`/reviews/${id}`);
};

export const updateReviews = async (
  id: string | number,
  data: Omit<CreateReviewDto, 'images' | 'videos'>,
) => {
  return httpClient.patch<ReviewDetail>(`/reviews/${id}`, data);
};

export const deleteReviews = async (id: string | number) => {
  return httpClient.delete<void>(`/reviews/${id}`);
};
