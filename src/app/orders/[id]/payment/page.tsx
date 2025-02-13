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

// Initialize TonConnect instance with your manifest URL (update it as needed)
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

  // Fetch order details when the page loads
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

  // Calculate the total price from order items
  const totalPrice = order ? order.items.reduce((sum, item) => sum + item.totalPrice, 0) : 0;

  // Handle the payment process using TonConnect
  const handlePayment = async () => {
    // If user is not connected to a wallet, redirect to Profile for wallet connection.
    if (!user || !user.walletAddress) {
      router.push('/profile');
      return;
    }

    setPaying(true);
    setError(null);

    try {
      // Ensure wallet is connected. For an injected wallet (e.g. Tonkeeper),
      // pass the jsBridge key. (Adjust the key if needed.)
      if (!tonConnect.wallet) {
        // For injected wallet, call connect with an object containing jsBridgeKey.
        // This call returns void.
        tonConnect.connect({ jsBridgeKey: 'tonkeeper' });
      }

      // Build the transaction request.
      // Set a validUntil time (for example, current time + 60 seconds)
      const validUntil = Math.floor(Date.now() / 1000) + 60;
      // Determine the recipient wallet address.
      // We assume order.store.walletAddress exists; otherwise, use a default.
      const recipient =
        order?.store?.owner.walletAddress || 'EQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

      const transactionRequest = {
        validUntil,
        // Optionally, you can set network property here (e.g., TonConnect.CHAIN.TESTNET)
        from: user.walletAddress, // sender's address from user context
        messages: [
          {
            address: recipient, // recipient's wallet address
            amount: totalPrice.toString(), // amount as a string (in nanoTON)
          },
        ],
      };

      // Send the transaction.
      // The sendTransaction call returns a response containing the signed BOC.
      const txResponse = await tonConnect.sendTransaction(transactionRequest, {
        onRequestSent: () => {
          console.log('Transaction request sent to wallet');
        },
      });
      // txResponse contains: { boc: string }
      console.log('Transaction signed, boc:', txResponse.boc);

      // Create a Payment record in your backend.
      // We use the returned BOC as the transaction identifier.
      const paymentData = {
        orderId: order?.id.toString(),
        amount: totalPrice.toString(),
        fromWalletAddress: user.walletAddress,
        toWalletAddress: recipient,
        transactionHash: txResponse.boc, // using boc as transaction identifier
        gasFee: '0', // adjust if you can derive gas fee
        commission: '0', // adjust if you can derive commission
      };

      const paymentRecord = await createPayments(paymentData);

      // If payment status is completed, update the order status.
      if (paymentRecord.status === PaymentStatus.COMPLETED) {
        await updateOrders(order.id, { status: OrderStatus.CONFIRMED });
      }

      setPaymentSuccess(true);
      // Optionally, redirect to order details or show a success message.
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
        <div className="text-red-500">Order not found.</div>
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
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {paymentSuccess ? (
          <div className="text-green-500 mb-4">
            Payment successful! Your order is now confirmed.
          </div>
        ) : (
          <Button onPress={handlePayment} disabled={paying}>
            {paying ? 'Processing Payment...' : 'Pay with TON'}
          </Button>
        )}
      </main>
    </AppLayout>
  );
}
