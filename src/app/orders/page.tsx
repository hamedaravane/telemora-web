'use client';

import { useOrdersData } from '@/libs/orders/orders-api';
import AppLayout from '@/components/app-layout';
import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from '@heroui/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Order } from '@/libs/orders/types';

export default function OrdersPage() {
  const { data: orders, error, isLoading } = useOrdersData();
  const router = useRouter();

  const handleRouteToMarket = () => router.push('/market');

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500 text-sm text-center">
            Failed to load orders. Please try again later.
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-center mb-4">Orders</h1>
      <p className="text-center text-gray-500 mb-6">Track your orders here.</p>

      {!orders || orders.length === 0 ? (
        <div className="text-center mt-12">
          <div className="text-gray-400 text-5xl mb-2"></div>
          <p className="text-gray-600 mb-4">You don’t any order yet!</p>
          <Button size="lg" onPress={handleRouteToMarket}>
            Take a look to market
          </Button>
        </div>
      ) : (
        <div>
          {orders!.map((order) => (
            <OrderCard order={order} key={order.id}></OrderCard>
          ))}
        </div>
      )}
    </AppLayout>
  );
}

export function OrderCard({ order }: { order: Order }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Order #{order.id}</h2>
          <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <Badge color={getStatusColor(order.status)}>{order.status}</Badge>
      </CardHeader>
      <CardBody>
        <p className="font-medium">Store: {order.store.name}</p>
        <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
        <Button variant="ghost" size="sm" onPress={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Hide Details' : 'View Details'}
        </Button>
        <Accordion>
          <AccordionItem className="mt-2">
            <h3 className="font-semibold">Items:</h3>
            <ul className="list-disc list-inside">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.product.name} x {item.quantity} - ${item.totalPrice.toFixed(2)}
                </li>
              ))}
            </ul>
            {order.shipment && (
              <>
                <h3 className="font-semibold mt-2">Shipment:</h3>
                <p>Courier: {order.shipment.courierService}</p>
                <p>Tracking Number: {order.shipment.trackingNumber}</p>
                <p>
                  Estimated Delivery:{' '}
                  {new Date(order.shipment.deliveryEstimate).toLocaleDateString()}
                </p>
              </>
            )}
            {order.payment && (
              <>
                <h3 className="font-semibold mt-2">Payment:</h3>
                <p>Status: {order.payment.status}</p>
                <p>Transaction Hash: {order.payment.transactionHash}</p>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
}

const getStatusColor = (
  status: string,
): 'warning' | 'primary' | 'success' | 'danger' | 'default' | 'secondary' | undefined => {
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
};
