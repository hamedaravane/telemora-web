'use client';

import { Divider, Skeleton } from '@heroui/react';
import React from 'react';

import { useUser } from '@/context/userContext';
import AppLayout from '@/libs/common/components/app-layout';
import { PageHeader } from '@/libs/common/components/page-header';
import OrderSummaryCard from '@/libs/orders/components/summary-card';
import { StorePreviewCard } from '@/libs/stores/components/preview-card';
import ProfileCard from '@/libs/users/components/profile-card';

export default function ProfilePage() {
  const user = useUser();

  if (!user) {
    return (
      <AppLayout>
        <main className="mx-auto max-w-2xl space-y-10 px-4 py-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <Skeleton className="h-32 w-32 rounded-full" />
              <Skeleton className="mt-4 h-4 w-40 rounded" />
              <Skeleton className="mt-2 h-3 w-24 rounded" />
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
      <main className="mx-auto max-w-2xl space-y-10 px-4 py-6">
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
                <OrderSummaryCard key={order.id} order={order} />
              ))}
            </div>
          </section>
        )}
      </main>
    </AppLayout>
  );
}
