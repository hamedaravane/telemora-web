'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardHeader, Chip, Spinner } from '@heroui/react';
import { useUser } from '@/context/user-context';
import Image from 'next/image';
import { useStoresData } from '@/libs/stores/stores-api';
import AppLayout from '@/components/app-layout';

export default function StoreListPage() {
  const { isLoading: isAuthLoading } = useUser();
  const router = useRouter();
  const { data: stores, error, isLoading } = useStoresData();

  const handleCreateStore = () => router.push('/store/create/basic-information');
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
        <div className="grid gap-4">
          {stores!.map((store) => (
            <Card
              key={store.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && handleOpenStore(Number(store.id))
              }
              className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary"
              onPress={() => handleOpenStore(Number(store.id))}
              aria-label={`Open store: ${store.name}`}
            >
              <CardHeader className="flex items-center gap-3">
                {store.logo?.url ? (
                  <Image
                    src={store.logo.url}
                    alt={`${store.name} logo`}
                    width={48}
                    height={48}
                    className="rounded-full aspect-square object-cover"
                    unoptimized={false}
                    sizes="48px"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xl">🏪</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <h2 className="font-semibold text-base line-clamp-1">
                    {store.name ?? 'Unnamed Store'}
                  </h2>
                  <div>{store.tags?.map((tag, index) => <Chip key={index}>{tag}</Chip>)}</div>
                </div>
              </CardHeader>
            </Card>
          ))}

          <div className="text-center mt-8">
            <Button variant="bordered" size="lg" onPress={handleCreateStore}>
              + New Store
            </Button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
