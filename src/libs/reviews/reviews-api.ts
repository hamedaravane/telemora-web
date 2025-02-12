import axios from 'axios';
import { CreateReviewDto, Review } from '@/libs/reviews/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createReviews = async (data: CreateReviewDto): Promise<Review> => {
  const response = await axios.post(`${API_BASE_URL}/reviews`, data);

  return response.data;
};

export const getAllReviews = async (): Promise<Review[]> => {
  const response = await axios.get(`${API_BASE_URL}/reviews`);

  return response.data;
};

export const getReviewsById = async (id: string | number): Promise<Review> => {
  const response = await axios.get(`${API_BASE_URL}/reviews/${id}`);

  return response.data;
};

export const updateReviews = async (
  id: string | number,
  data: Omit<CreateReviewDto, 'images' | 'videos'>,
): Promise<Review> => {
  const response = await axios.patch(`${API_BASE_URL}/reviews/${id}`, data);

  return response.data;
};

export const deleteReviews = async (id: string | number): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/reviews/${id}`);

  return response.data;
};
