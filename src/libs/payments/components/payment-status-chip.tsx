import { PaymentStatus } from '@/libs/payments/types';
import clsx from 'clsx';

const statusStyles: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [PaymentStatus.PROCESSING]: 'bg-blue-100 text-blue-800',
  [PaymentStatus.COMPLETED]: 'bg-green-100 text-green-800',
  [PaymentStatus.FAILED]: 'bg-red-100 text-red-700',
  [PaymentStatus.REFUNDED]: 'bg-purple-100 text-purple-800',
};

export function PaymentStatusChip({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={clsx(
        'text-xs font-medium px-3 py-1 rounded-full capitalize',
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}
