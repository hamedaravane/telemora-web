import { ReportReason } from "@/types/common";

export interface CreateReviewReportDto {
  reason: ReportReason;
  comment?: string;
}
