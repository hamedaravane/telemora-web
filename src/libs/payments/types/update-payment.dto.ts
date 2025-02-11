import { PaymentStatus } from "@/types/common";

export interface UpdatePaymentDto {
  status?: PaymentStatus;
  transactionHash?: string;
  gasFee?: string;
  commission?: string;
}
