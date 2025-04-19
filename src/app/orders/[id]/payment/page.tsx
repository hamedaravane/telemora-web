'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Chip, Spinner } from '@heroui/react';
import { PaymentStatus } from '@/libs/payments/types';
import AppLayout from '@/components/shared/app-layout';
import { PageHeader } from '@/components/shared/page-header';
import toast from 'react-hot-toast';
import { useCreatePayment, usePaymentDetails } from '@/libs/payments/payments-api';

export default function PaymentPage() {
  const router = useRouter();
  const { id: orderId } = useParams<{ id: string }>();

  const { mutateAsync: createPayment, isPending: creating } = useCreatePayment();
  const { data: payment, isLoading, error, refetch } = usePaymentDetails(Number(orderId)); // Assumes payment ID === order ID (or replace with separate lookup logic)

  // Auto-create payment if not found
  useEffect(() => {
    if (!payment && !isLoading && orderId) {
      createPayment({ orderId, amount: '0.01' }) // default example amount
        .then(() => refetch())
        .catch(() => toast.error('Failed to create payment'));
    }
  }, [payment, isLoading, orderId, createPayment, refetch]);

  if (isLoading || creating) {
    return (
      <AppLayout>
        <div className="h-screen flex items-center justify-center">
          <Spinner label="Loading payment..." />
        </div>
      </AppLayout>
    );
  }

  if (!payment || error) {
    return (
      <AppLayout>
        <div className="p-6 text-center text-red-500">Payment not found or failed to load.</div>
      </AppLayout>
    );
  }

  const statusColor: Record<
    PaymentStatus,
    'warning' | 'primary' | 'success' | 'danger' | 'secondary' | 'default' | undefined
  > = {
    [PaymentStatus.PENDING]: 'warning',
    [PaymentStatus.PROCESSING]: 'primary',
    [PaymentStatus.COMPLETED]: 'success',
    [PaymentStatus.FAILED]: 'danger',
    [PaymentStatus.REFUNDED]: 'secondary',
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <PageHeader
          title="Payment Details"
          subtitle="Review the payment information for your order"
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Status</span>
            <Chip color={statusColor[payment.status]}>{payment.status.toUpperCase()}</Chip>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500">Amount</span>
            <span>{payment.amount} TON</span>
          </div>

          {payment.fromWalletAddress && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">From</span>
              <span className="text-xs">{payment.fromWalletAddress}</span>
            </div>
          )}

          {payment.toWalletAddress && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">To</span>
              <span className="text-xs">{payment.toWalletAddress}</span>
            </div>
          )}

          {payment.transactionHash && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Tx Hash</span>
              <span className="text-xs break-all">{payment.transactionHash}</span>
            </div>
          )}

          {payment.gasFee && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Gas Fee</span>
              <span>{payment.gasFee}</span>
            </div>
          )}

          {payment.commission && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Commission</span>
              <span>{payment.commission}</span>
            </div>
          )}
        </div>

        <div className="mt-10">
          <Button fullWidth onPress={() => router.push(`/orders/${orderId}`)}>
            Back to Order
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
