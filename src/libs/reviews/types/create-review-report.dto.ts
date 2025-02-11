import { ReportReason } from "@/src/types/common";

export interface CreateReviewReportDto {
  reason: ReportReason;
  comment?: string;
}
