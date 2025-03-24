import { UserPreview } from '@/libs/users/types';
import { ProductPreview } from '@/libs/products/types';

/**
 * Models in this file are implemented according to the backend project specifications.
 * It is strongly recommended **not** to modify them under any circumstances.
 * Any changes to these models may destabilize or even break the entire system.
 */

export enum ReportReason {
  SPAM = 'Spam',
  INAPPROPRIATE = 'Inappropriate Content',
  FAKE_REVIEW = 'Fake Review',
  HARASSMENT = 'Harassment or Hate Speech',
  OFFENSIVE_LANGUAGE = 'Offensive or Abusive Language',
  MISLEADING_INFORMATION = 'Misleading or False Information',
  PRIVACY_VIOLATION = 'Privacy Violation (Personal Information)',
  COPYRIGHT_INFRINGEMENT = 'Copyright or Trademark Violation',
  SCAM = 'Scam or Fraudulent Activity',
  UNAUTHORIZED_ADVERTISING = 'Unauthorized Advertising or Promotion',
  IRRELEVANT_CONTENT = 'Irrelevant or Off-Topic Content',
  BULLYING = 'Bullying or Threats',
  VIOLENCE = 'Violence or Dangerous Content',
  SELF_PROMOTION = 'Excessive Self-Promotion',
  ILLEGAL_ACTIVITY = 'Illegal or Unlawful Content',
  OTHER = 'Other',
}

export interface Review {
  id: number;
  buyer: UserPreview;
  product: ProductPreview;
  rating: number;
  comment?: string;
  images?: string[];
  videos?: string[];
  replies: ReviewReply[];
  reports: ReviewReport[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewReply {
  id: number;
  seller: UserPreview;
  replyText: string;
  createdAt: Date;
}

export interface ReviewReport {
  id: number;
  reportedBy: UserPreview;
  reason: ReportReason;
  comment?: string;
  reportedAt: Date;
}

export interface CreateReviewDto {
  rating: number;
  comment?: string;
  images?: string[];
  videos?: string[];
}

export interface CreateReviewReplyDto {
  replyText: string;
}

export interface CreateReviewReportDto {
  reason: ReportReason;
  comment?: string;
}
