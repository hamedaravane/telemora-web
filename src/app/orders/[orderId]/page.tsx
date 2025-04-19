'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { Button, Card, CardBody, CardFooter, Spinner } from '@heroui/react';
import { useOrderDetails } from '@/libs/orders/orders-api';
import AppLayout from '@/components/shared/app-layout';
import { PageHeader } from '@/components/shared/page-header';
import ErrorPage from '@/components/shared/errorPage';
import OrderItemPreviewCard from '@/components/orders/order-item-preview';
import { formatDate, formatRelative } from '@/utils/date';
import Price from '@/components/shared/price';
import { OrderStatusChip } from '@/components/orders/order-status-chip';
import { PaymentStatusChip } from '@/components/payments/payment-status-chip';
import { TonPaymentButton } from '@/components/payments/ton-payment-button';

export default function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();

  const { data: order, isLoading, error } = useOrderDetails(Number(orderId));

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

  /*const isPendingPayment =
    order.status === OrderStatus.PENDING && order.payment?.status !== PaymentStatus.COMPLETED;*/
  const isPendingPayment = true;

  return (
    <AppLayout>
      <PageHeader
        title={`Order #${order.id}`}
        subtitle={`Placed on ${formatDate(order.createdAt)}`}
      />

      <div className="flex items-center justify-between mb-4">
        <OrderStatusChip status={order.status} />

        {order.payment && <PaymentStatusChip status={order.payment.status} />}
      </div>

      {isPendingPayment && (
        <Card>
          <CardBody>
            <p className="text-sm">
              This order is pending payment. Complete it to avoid cancellation.
            </p>
          </CardBody>
          <CardFooter>
            <TonPaymentButton amountTon={order.totalAmount} toAddress="" />
          </CardFooter>
        </Card>
      )}

      {/* Items */}
      <div className="space-y-4 my-6">
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
          <p>Total Amount: {<Price amount={order.totalAmount} />}</p>
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
