'use client';

import AppLayout from '@/libs/common/components/app-layout';
import { useUser } from '@/context/userContext';
import { Divider, Skeleton } from '@heroui/react';
import { StorePreviewCard } from '@/libs/stores/components/preview-card';
import OrderSummaryCard from '@/libs/orders/components/summary-card';
import { PageHeader } from '@/libs/common/components/page-header';
import React from 'react';
import ProfileCard from '@/libs/users/components/profile-card';

export default function ProfilePage() {
  const user = useUser();

  if (!user) {
    return (
      <AppLayout>
        <main className="max-w-2xl mx-auto px-4 py-6 space-y-10">
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <Skeleton className="w-32 h-32 rounded-full" />
              <Skeleton className="w-40 h-4 mt-4 rounded" />
              <Skeleton className="w-24 h-3 mt-2 rounded" />
            </div>

            <div className="flex space-x-2">
              <Skeleton className="h-10 flex-1 rounded-md" />
              <Skeleton className="h-10 flex-1 rounded-md" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-28 rounded-md" />
            <div className="grid grid-cols-2 gap-3">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-md" />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-32 rounded-md" />
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-md" />
              ))}
            </div>
          </div>
        </main>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-10">
        <ProfileCard user={user} />
        <Divider />
        {user.stores && user.stores.length > 0 && (
          <section>
            <PageHeader title="My Stores" />
            <div className="grid grid-cols-2 gap-3">
              {user.stores.map((store) => (
                <StorePreviewCard key={store.id} store={store} />
              ))}
            </div>
          </section>
        )}
        <Divider />
        {user.orders && user.orders.length > 0 && (
          <section>
            <PageHeader title="Recent Orders" />
            <div className="space-y-4">
              {user.orders.map((order) => (
                <OrderSummaryCard key={order.id} order={order} currencyInfo={user.currencyInfo} />
              ))}
            </div>
          </section>
        )}
      </main>
    </AppLayout>
  );
}
