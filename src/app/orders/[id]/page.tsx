'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { Button, Chip, Spinner } from '@heroui/react';
import { useOrderDetails } from '@/libs/orders/orders-api';
import AppLayout from '@/components/shared/app-layout';
import { PageHeader } from '@/components/shared/page-header';
import ErrorPage from '@/components/shared/errorPage';
import { OrderStatus } from '@/libs/orders/types';
import { PaymentStatus } from '@/libs/payments/types';
import OrderItemPreviewCard from '@/components/orders/order-item-preview';
import { formatDate, formatRelative } from '@/utils/date';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: order, isLoading, error } = useOrderDetails(Number(id));

  if (isLoading) {
    return (
      <AppLayout>
        <div className="h-screen flex items-center justify-center">
          <Spinner label="Loading order..." />
        </div>
      </AppLayout>
    );
  }

  if (error || !order) return <ErrorPage />;

  const isPendingPayment =
    order.status === OrderStatus.PENDING && order.payment?.status !== PaymentStatus.COMPLETED;

  const handleGoToPayment = () => router.push(`/orders/${order.id}/payment`);

  return (
    <AppLayout>
      <PageHeader
        title={`Order #${order.id}`}
        subtitle={`Placed on ${formatDate(order.createdAt)}`}
      />

      {/* Order Status & Payment */}
      <div className="flex items-center justify-between mb-4">
        <Chip color="primary" variant="flat">
          Status: {order.status.toUpperCase()}
        </Chip>

        {order.payment && (
          <Chip
            color={order.payment.status === PaymentStatus.COMPLETED ? 'success' : 'warning'}
            variant="flat"
          >
            Payment: {order.payment.status.toUpperCase()}
          </Chip>
        )}
      </div>

      {/* ⚠️ CTA to Pay */}
      {isPendingPayment && (
        <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-xl mb-6 text-sm">
          <p className="mb-2">This order is pending payment. Complete it to avoid cancellation.</p>
          <Button fullWidth onPress={handleGoToPayment}>
            Complete Payment
          </Button>
        </div>
      )}

      {/* Items */}
      <div className="space-y-4 mb-6">
        <h2 className="text-lg font-semibold">Items</h2>
        {order.items.map((item) => (
          <OrderItemPreviewCard orderItem={item} key={item.product.id} />
        ))}
      </div>

      {/* Shipping Info */}
      {order.shipment && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Shipment</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Carrier: {order.shipment.courierService}</p>
            <p>Tracking #: {order.shipment.trackingNumber}</p>
            <p>Estimated Delivery: {formatDate(order.shipment.deliveryEstimate)}</p>
            {order.shipment.carrierTrackingUrl && (
              <a
                href={order.shipment.carrierTrackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                Track your shipment
              </a>
            )}
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Total Amount: {order.totalAmount} TON</p>
          <p>Delivery Date: {formatDate(order.deliveryDate)}</p>
          <p className="text-sm text-gray-500">
            Estimated Delivery {formatRelative(order.shipment?.deliveryEstimate ?? '-')}
          </p>
        </div>
      </div>

      <Button variant="bordered" fullWidth onPress={() => router.push('/orders')}>
        Back to Orders
      </Button>
    </AppLayout>
  );
}
