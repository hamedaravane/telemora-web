'use client';

import AppLayout from '@/components/shared/app-layout';
import { useUser } from '@/context/user-context';
import { Button, Divider, Skeleton } from '@heroui/react';
import Image from 'next/image';
import { UserPrivateProfile } from '@/libs/users/types';
import { StorePreviewCard } from '@/components/stores/preview-card';
import OrderSummaryCard from '@/components/orders/summary-card';
import { FaGear } from 'react-icons/fa6';
import { FaPen } from 'react-icons/fa';
import { PageHeader } from '@/components/shared/page-header';
import ErrorPage from '@/components/shared/errorPage';
import React from 'react';

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

  if (!user) return <ErrorPage />;

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
                <OrderSummaryCard key={order.id} order={order} />
              ))}
            </div>
          </section>
        )}
      </main>
    </AppLayout>
  );
}

function ProfileCard({ user }: { user: UserPrivateProfile }) {
  return (
    <div className="space-y-2">
      <div className="text-center">
        <Image
          src={user.photo?.url ?? '/default-profile.png'}
          alt="user photo"
          width={128}
          height={128}
          className="rounded-full object-cover w-32 aspect-square inline-block"
        />
        <div className="mt-4">
          <h2 className="font-semibold text-lg">
            {user.firstName} {user.lastName}
          </h2>
          {user.username && <p className="text-gray-500 lowercase text-sm">@{user.username}</p>}
        </div>
      </div>
      <div className="flex space-x-2">
        <Button fullWidth size="sm" variant="flat">
          <FaPen />
          Edit Profile
        </Button>
        <Button fullWidth size="sm" variant="flat">
          <FaGear />
          Preferences
        </Button>
      </div>
    </div>
  );
}
