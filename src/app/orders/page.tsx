'use client';

import { Button, Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaBoxOpen } from 'react-icons/fa6';

import AppLayout from '@/libs/common/components/app-layout';
import ErrorPage from '@/libs/common/components/errorPage';
import { PageHeader } from '@/libs/common/components/page-header';
import OrderSummaryCard from '@/libs/orders/components/summary-card';
import { useMyOrders } from '@/libs/orders/hooks';

export default function OrdersPage() {
  const router = useRouter();
  const { data: orders, error, isLoading } = useMyOrders();

  const goToMarket = () => router.push('/market');

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  if (error || !orders) return <ErrorPage />;

  return (
    <AppLayout>
      <PageHeader title="My Orders" subtitle="Track your purchases and check order status." />

      {orders?.length === 0 ? (
        <div className="mt-20 flex flex-col items-center text-center">
          <FaBoxOpen className="mb-4 h-16 w-16" />
          <p className="mb-4">You haven’t placed any orders yet.</p>
          <Button onPress={goToMarket}>Go to Marketplace</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 pb-10">
          {orders.map((order) => (
            <OrderSummaryCard key={order.id} order={order} href={`/orders/${order.id}`} />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
