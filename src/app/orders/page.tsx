'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/shared/app-layout';
import { Button, Spinner } from '@heroui/react';
import { FaBoxOpen } from 'react-icons/fa6';
import OrderSummaryCard from '@/components/orders/summary-card';
import { PageHeader } from '@/components/shared/page-header';
import { useMyOrders } from '@/libs/orders/hooks';
import ErrorPage from '@/components/shared/errorPage';

export default function OrdersPage() {
  const router = useRouter();
  const { data: orders, error, isLoading } = useMyOrders();

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

  if (error || !orders) return <ErrorPage />;

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
        <div className="flex flex-col gap-y-2 pb-10">
          {orders.map((order) => (
            <OrderSummaryCard key={order.id} currencyInfo={order.currencyInfo} order={order} href={`/orders/${order.id}`} />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
