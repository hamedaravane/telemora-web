'use client';

import { Alert, Button, Card, CardBody, CardFooter, Divider, Spinner } from '@heroui/react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import AppLayout from '@/libs/common/components/AppLayout';
import ErrorPage from '@/libs/common/components/errorPage';
import { PageHeader } from '@/libs/common/components/page-header';
import PriceComponent from '@/libs/common/components/PriceComponent';
import OrderItemPreviewCard from '@/libs/orders/components/order-item-preview';
import { OrderShipmentCard } from '@/libs/orders/components/order-shipment-card';
import { OrderStatusChip } from '@/libs/orders/components/order-status-chip';
import { useOrderDetails } from '@/libs/orders/hooks';
import { OrderStatus } from '@/libs/orders/types';
import { PaymentStatusChip } from '@/libs/payments/components/payment-status-chip';
import { TonPaymentButton } from '@/libs/payments/components/ton-payment-button';
import { PaymentStatus } from '@/libs/payments/types';
import { formatDate, formatRelative } from '@/libs/common/utils/date';

export default function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();

  const { data: order, isLoading, error } = useOrderDetails(Number(orderId));

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex h-screen items-center justify-center">
          <Spinner label="Loading order..." />
        </div>
      </AppLayout>
    );
  }

  if (error || !order) return <ErrorPage error={new Error('Invalid Order')} />;
  if (!orderId || isNaN(Number(orderId)))
    return <ErrorPage error={new Error('Invalid order ID')} />;

  const isPendingPayment =
    order.status === OrderStatus.PENDING && order.payment?.status !== PaymentStatus.COMPLETED;

  return (
    <AppLayout>
      <PageHeader
        title={`Order #${order.id}`}
        subtitle={`Placed on ${formatDate(order.createdAt)}`}
      />

      <div className="mb-4 flex items-center justify-between">
        <OrderStatusChip status={order.status} />

        {order.payment && <PaymentStatusChip status={order.payment.status} />}
      </div>

      {isPendingPayment && (
        <Card>
          <CardBody>
            <Alert
              color="warning"
              description="This order is pending payment. Complete it to avoid cancellation."
            />
          </CardBody>
          <CardFooter>
            <TonPaymentButton
              amountTon={order.totalAmount}
              sellerAddress={order.store.walletAddress}
            />
          </CardFooter>
        </Card>
      )}

      <Divider className="my-4" />

      {/* Items */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Items</h2>
        {order.items.map((item) => (
          <OrderItemPreviewCard orderItem={item} key={item.product.id} />
        ))}
      </div>

      <Divider className="my-4" />

      {/* Shipping Info */}
      {order.shipment && <OrderShipmentCard shipment={order.shipment} />}

      <Divider className="my-4" />

      {/* Order Summary */}
      <div className="mb-12">
        <h2 className="mb-2 text-lg font-semibold">Summary</h2>
        <div className="space-y-1 text-sm">
          <div className="flex gap-x-2">
            <span>Total Amount: </span>
            <PriceComponent amount={order.totalAmount} />
          </div>
          <p>Delivery Date: {formatDate(order.deliveryDate)}</p>
          <p className="text-sm">
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
