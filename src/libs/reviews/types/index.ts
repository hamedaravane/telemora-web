import { ReportReason } from '@/types/common';
import { Product } from '@/libs/products/types';
import { User } from '@/libs/users/types';

export interface Review {
  id: number;
  buyer: User;
  product: Product;
  rating: number;
  comment?: string;
  images?: string[];
  videos?: string[];
  replies: ReviewReply[];
  reports: ReviewReport[];
}

export interface ReviewReply {
  id: number;
  seller: User;
  replyText: string;
}

export interface ReviewReport {
  id: number;
  reportedBy: User;
  reason: ReportReason;
  comment?: string;
}

export interface CreateReviewReportDto {
  reason: ReportReason;
  comment?: string;
}

export interface CreateReviewReplyDto {
  replyText: string;
}

export interface CreateReviewDto {
  rating: number;
  comment?: string;
  images?: string[];
  videos?: string[];
}
