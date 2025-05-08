'use client';

import { Divider } from '@heroui/react';
import React from 'react';

import { useUser } from '@/context/userContext';
import AppLayout from '@/libs/common/components/AppLayout';
import SummaryOrdersSection from '@/libs/orders/components/summary-orders-section';
import PreviewStoresSection from '@/libs/stores/components/preview-stores-section';
import ProfileCard from '@/libs/users/components/profile-card';

export default function ProfilePage() {
  const { data, isLoading, isError } = useUser();

  if (!data || isError) {
    return (
      <AppLayout>
        <div>user not found</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="mx-auto max-w-2xl space-y-10 px-4 py-6">
        <ProfileCard user={data} />
        <Divider />
        {data.stores && data.stores.length > 0 && (
          <PreviewStoresSection stores={data.stores} title="My Stores" />
        )}
        <Divider />
        {data.orders && (
          <SummaryOrdersSection orders={data.orders} title="Recent Orders" />
        )}
      </main>
    </AppLayout>
  );
}
