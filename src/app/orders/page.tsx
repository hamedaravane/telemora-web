'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useOrdersData } from '@/libs/orders/orders-api';
import AppLayout from '@/components/shared/app-layout';
import { Button, Spinner } from '@heroui/react';
import { FaBoxOpen } from 'react-icons/fa6';
import OrderSummaryCard from '@/components/orders/summary-card';
import { PageHeader } from '@/components/shared/page-header';

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
      <PageHeader title="My Orders" subtitle="Track your purchases and check order status." />

      {orders?.length === 0 ? (
        <div className="flex flex-col items-center text-center mt-20">
          <FaBoxOpen className="w-16 h-16  mb-4" />
          <p className=" mb-4">You haven’t placed any orders yet.</p>
          <Button onPress={goToMarket}>Go to Marketplace</Button>
        </div>
      ) : (
        <div className="space-y-4 pb-10">
          {orders.map((order) => (
            <OrderSummaryCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
