// libs/components/schemas.ts
import { z } from 'zod';
import { ReportReason } from '@/libs/reviews/types';

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(1000).optional(),
  images: z.array(z.string().url()).optional(),
  videos: z.array(z.string().url()).optional(),
});

export const createReviewReplySchema = z.object({
  replyText: z.string().min(1, 'Reply text is required'),
});

export const createReviewReportSchema = z.object({
  reason: z.nativeEnum(ReportReason, {
    errorMap: () => ({ message: 'Select a valid reason' }),
  }),
  comment: z.string().max(1000).optional(),
});

// Inferred types
export type CreateReviewFormData = z.infer<typeof createReviewSchema>;
export type CreateReviewReplyFormData = z.infer<typeof createReviewReplySchema>;
export type CreateReviewReportFormData = z.infer<typeof createReviewReportSchema>;
