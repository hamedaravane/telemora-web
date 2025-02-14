'use client';

import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import { getOrdersById, updateOrders } from '@/libs/orders/orders-api';
import { createPayments } from '@/libs/payments/payments-api';
import { Button, Spinner } from '@heroui/react';
import { OrderStatus, PaymentStatus } from '@/types/common';
import { UserContext } from '@/context/user-context';
import { useTonConnectUI } from '@tonconnect/ui-react';
import type { CreatePaymentDto } from '@/libs/payments/types';
import type { UpdateOrderDto } from '@/libs/orders/types';

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrdersById(id as string),
    enabled: !!id,
  });

  const totalPrice = order ? order.items.reduce((sum, item) => sum + item.totalPrice, 0) : 0;

  const paymentMutation = useMutation({
    mutationFn: (paymentData: CreatePaymentDto) => createPayments(paymentData),
  });

  const orderUpdateMutation = useMutation({
    mutationFn: (data: { id: number; update: UpdateOrderDto }) =>
      updateOrders(data.id, data.update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', id] });
    },
  });

  const [tonConnectUI] = useTonConnectUI();

  const handlePayment = async () => {
    if (!user || !user.walletAddress) {
      router.push('/profile');
      return;
    }
    try {
      const validUntil = Math.floor(Date.now() / 1000) + 60;
      const recipient =
        order?.store?.owner.walletAddress || 'EQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

      const transactionRequest = {
        validUntil,
        from: user.walletAddress,
        messages: [
          {
            address: recipient,
            amount: totalPrice.toString(),
          },
        ],
      };

      const txResponse = await tonConnectUI.sendTransaction(transactionRequest);

      const paymentData: CreatePaymentDto = {
        orderId: order?.id.toString(),
        amount: totalPrice.toString(),
        fromWalletAddress: user.walletAddress,
        toWalletAddress: recipient,
        transactionHash: txResponse.boc,
        gasFee: '0',
        commission: '0',
      };

      const paymentRecord = await paymentMutation.mutateAsync(paymentData);
      if (paymentRecord.status === PaymentStatus.COMPLETED) {
        await orderUpdateMutation.mutateAsync({
          id: order!.id,
          update: { status: OrderStatus.CONFIRMED },
        });
      }
      router.push('/orders');
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-40">
          <Spinner label="Loading order details..." />
        </div>
      </AppLayout>
    );
  }

  if (error || !order) {
    return (
      <AppLayout>
        <div className="text-danger">Order not found.</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Order Payment</h2>
        <div className="mb-4">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Total Price:</strong> {totalPrice} TON
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>
        <Button onPress={handlePayment}>Pay with TON</Button>
      </main>
    </AppLayout>
  );
}
