'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useOrdersData } from '@/libs/orders/orders-api';
import AppLayout from '@/components/app-layout';
import { Badge, Button, Card, CardBody, CardHeader, Divider, Spinner } from '@heroui/react';
import { Order, OrderItem } from '@/libs/orders/types';
import { format } from 'date-fns';
import { FaBoxOpen, FaChevronRight, FaTruck, FaWallet } from 'react-icons/fa6';

export default function OrdersPage() {
  const router = useRouter();
  const { data: orders, error, isLoading } = useOrdersData();

  const goToMarket = () => router.push('/market');

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  if (!orders || error) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <p className="text-red-500 text-sm">Failed to load orders. Please try again later.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center">My Orders</h1>
        <p className="text-gray-500 text-sm text-center mt-1">
          Track your purchases and check order status.
        </p>
      </div>

      {orders?.length === 0 ? (
        <div className="flex flex-col items-center text-center mt-20">
          <FaBoxOpen className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">You haven’t placed any orders yet.</p>
          <Button onPress={goToMarket}>Go to Marketplace</Button>
        </div>
      ) : (
        <div className="space-y-4 pb-10">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </AppLayout>
  );
}

function OrderCard({ order }: { order: Order }) {
  const formattedDate = format(new Date(order.createdAt), 'PPP');
  const isPaymentPending = order.payment.status === 'pending';

  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader className="flex items-center justify-between px-4 pt-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Order #{order.id}</h2>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        <Badge size="sm" color={getStatusColor(order.status)} className="capitalize">
          {order.status}
        </Badge>
      </CardHeader>

      <CardBody className="px-4 pb-4 space-y-3">
        {/* Store Info */}
        <div className="text-sm">
          <p className="text-gray-700">
            <span className="font-medium">Store:</span> {order.store.name}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Total:</span> ${order.totalAmount.toFixed(2)}
          </p>
        </div>

        <Divider />

        {/* Items */}
        <div className="space-y-1">
          {order.items.map((item: OrderItem) => (
            <div key={item.id} className="flex justify-between text-sm text-gray-600">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>${item.totalPrice.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Shipment */}
        {order.shipment && (
          <div className="mt-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <FaTruck className="w-4 h-4" />
              <p className="text-sm font-medium">Shipment</p>
            </div>
            <p className="text-xs">Courier: {order.shipment.courierService}</p>
            <p className="text-xs">Tracking: {order.shipment.trackingNumber}</p>
            <p className="text-xs">
              Estimated: {format(new Date(order.shipment.deliveryEstimate), 'PPP')}
            </p>
          </div>
        )}

        {/* Payment */}
        {order.payment && (
          <div className="mt-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <FaWallet className="w-4 h-4" />
              <p className="text-sm font-medium">Payment</p>
            </div>
            <p className="text-xs">Status: {order.payment.status}</p>
            <p className="text-xs truncate">Tx Hash: {order.payment.transactionHash || 'N/A'}</p>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="pt-2 flex justify-end gap-2">
          {isPaymentPending && (
            <Button variant="bordered" size="sm">
              Complete Payment
            </Button>
          )}
          <Button variant="ghost" size="sm" endContent={<FaChevronRight className="w-4 h-4" />}>
            View Details
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

function getStatusColor(
  status: string,
): 'warning' | 'primary' | 'success' | 'danger' | 'default' | 'secondary' {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'confirmed':
    case 'processing':
      return 'secondary';
    case 'shipped':
      return 'primary';
    case 'delivered':
    case 'completed':
      return 'success';
    case 'canceled':
    case 'refunded':
      return 'danger';
    default:
      return 'default';
  }
}
