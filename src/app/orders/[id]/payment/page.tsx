'use client';

import { useEffect, useState, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import { getOrdersById, updateOrders } from '@/libs/orders/orders-api';
import { createPayments } from '@/libs/payments/payments-api';
import { Order } from '@/libs/orders/types';
import { OrderStatus, PaymentStatus } from '@/types/common';
import { Spinner, Button } from '@heroui/react';
import { UserContext } from '@/context/user-context';
import TonConnect from '@tonconnect/sdk';

const tonConnect = new TonConnect({
  manifestUrl: 'https://your-app.com/manifest.json',
});

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useContext(UserContext);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paying, setPaying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getOrdersById(id)
        .then((data) => {
          setOrder(data);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load order details.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const totalPrice = order ? order.items.reduce((sum, item) => sum + item.totalPrice, 0) : 0;

  const handlePayment = async () => {
    if (!user || !user.walletAddress) {
      router.push('/profile');
      return;
    }

    setPaying(true);
    setError(null);

    try {
      if (!tonConnect.wallet) {
        tonConnect.connect({ jsBridgeKey: 'tonkeeper' });
      }

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

      const txResponse = await tonConnect.sendTransaction(transactionRequest, {
        onRequestSent: () => {
          console.log('Transaction request sent to wallet');
        },
      });
      console.log('Transaction signed, boc:', txResponse.boc);

      const paymentData = {
        orderId: order?.id.toString(),
        amount: totalPrice.toString(),
        fromWalletAddress: user.walletAddress,
        toWalletAddress: recipient,
        transactionHash: txResponse.boc,
        gasFee: '0',
        commission: '0',
      };

      const paymentRecord = await createPayments(paymentData);

      if (paymentRecord.status === PaymentStatus.COMPLETED) {
        await updateOrders(order!.id, { status: OrderStatus.CONFIRMED });
      }

      setPaymentSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Payment failed. Please try again.');
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-40">
          <Spinner label="Loading order details..." />
        </div>
      </AppLayout>
    );
  }

  if (!order) {
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
        {error && <div className="text-danger mb-4">{error}</div>}
        {paymentSuccess ? (
          <div className="text-success mb-4">Payment successful! Your order is now confirmed.</div>
        ) : (
          <Button onPress={handlePayment} disabled={paying}>
            {paying ? 'Processing Payment...' : 'Pay with TON'}
          </Button>
        )}
      </main>
    </AppLayout>
  );
}
