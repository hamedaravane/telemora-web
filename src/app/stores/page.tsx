'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardHeader, Chip, Spinner } from '@heroui/react';
import { useUser } from '@/context/user-context';
import Image from 'next/image';
import { useStoresData } from '@/libs/stores/stores-api';
import AppLayout from '@/components/shared/app-layout';
import StoreSummaryCard from '@/components/stores/summary-card';

export default function StoreListPage() {
  const { isLoading: isAuthLoading } = useUser();
  const router = useRouter();
  const { data: stores, error, isLoading } = useStoresData();

  const handleCreateStore = () => router.push('/stores/create/basic-information');
  const handleOpenStore = (id: number) => router.push(`/stores/${id}`);

  if (isAuthLoading || isLoading) {
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
            Failed to load store data. Please try again later.
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-center mb-4">My Stores</h1>
      <p className="text-center text-gray-500 mb-6">Manage your business from here</p>

      {stores && stores.length === 0 ? (
        <div className="text-center mt-12">
          <div className="text-gray-400 text-5xl mb-2">🏪</div>
          <p className="text-gray-600 mb-4">You don’t own any stores yet.</p>
          <Button size="lg" onPress={handleCreateStore}>
            Create Your First Store
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {stores!.map((store) => (
            <StoreSummaryCard key={store.id} store={store} />
          ))}

          <Button fullWidth variant="bordered" size="lg" onPress={handleCreateStore}>
            + New Store
          </Button>
        </div>
      )}
    </AppLayout>
  );
}
