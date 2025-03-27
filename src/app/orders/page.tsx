'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useOrdersData } from '@/libs/orders/orders-api';
import AppLayout from '@/components/app-layout';
import { Button, Card, CardBody, CardHeader, Divider, Spinner } from '@heroui/react';
import { format } from 'date-fns';
import { FaBoxOpen, FaChevronRight, FaWallet } from 'react-icons/fa6';
import { OrderSummary } from '@/libs/orders/types';

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
      <div className="mb-6 mx-4">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className=" text-sm mt-1">Track your purchases and check order status.</p>
      </div>

      {orders?.length === 0 ? (
        <div className="flex flex-col items-center text-center mt-20">
          <FaBoxOpen className="w-16 h-16  mb-4" />
          <p className=" mb-4">You haven’t placed any orders yet.</p>
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

function OrderCard({ order }: { order: OrderSummary }) {
  const formattedDate = format(new Date(order.createdAt), 'PPP');

  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader className="flex items-center justify-between px-4 pt-4">
        <div>
          <h2 className="text-sm font-semibold">Order #{order.id}</h2>
          <p className="text-xs">{formattedDate}</p>
        </div>
        <div className="text-xs rounded px-1 border">{order.status}</div>
      </CardHeader>

      <CardBody className="px-4 pb-4 space-y-3">
        <div className="text-sm">
          <p className="">
            <span className="font-medium">Store:</span> {order.store.name}
          </p>
          <p className="">
            <span className="font-medium">Total:</span> ${order.totalAmount.toFixed(2)}
          </p>
        </div>

        <Divider />

        {order.status && (
          <div className="mt-3">
            <div className="flex items-center gap-2  mb-1">
              <FaWallet />
              <p className="text-sm font-medium">Payment</p>
            </div>
            <p className="text-xs">Status: {order.status}</p>
          </div>
        )}

        <div className="pt-2 flex justify-end gap-2">
          {order.status === 'pending' && (
            <Button variant="bordered" size="sm">
              Complete Payment
            </Button>
          )}
          <Button variant="flat" size="sm" endContent={<FaChevronRight />}>
            View Details
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
