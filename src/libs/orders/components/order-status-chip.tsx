import { OrderStatus } from '@/libs/orders/types';
import clsx from 'clsx';

const statusStyles: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [OrderStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
  [OrderStatus.PROCESSING]: 'bg-indigo-100 text-indigo-800',
  [OrderStatus.SHIPPED]: 'bg-purple-100 text-purple-800',
  [OrderStatus.DELIVERED]: 'bg-emerald-100 text-emerald-800',
  [OrderStatus.COMPLETED]: 'bg-green-100 text-green-800',
  [OrderStatus.CANCELED]: 'bg-gray-100 text-gray-600',
  [OrderStatus.REFUNDED]: 'bg-red-100 text-red-700',
};

export function OrderStatusChip({ status }: { status: OrderStatus }) {
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
