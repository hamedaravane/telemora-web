import { UserPublicPreview } from '@/libs/users/types';

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

export interface ReviewPreview {
  id: number | string;
  rating: number;
  comment?: string;
  productId: number | string;
  buyer: UserPublicPreview;
  createdAt: Date;
}

export interface ReviewDetail extends ReviewPreview {
  images?: string[];
  videos?: string[];
  replies: ReviewReplyPreview[];
  reports: ReviewReportPreview[];
  isFlagged?: boolean;
}

export interface ReviewReplyPreview {
  id: number;
  seller: UserPublicPreview;
  replyText: string;
  createdAt: Date;
}

export interface ReviewReportPreview {
  id: number;
  reportedBy: UserPublicPreview;
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
