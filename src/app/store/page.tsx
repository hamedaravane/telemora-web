'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, CardHeader, Spinner } from '@heroui/react';
import { useUser } from '@/context/user-context';
import Image from 'next/image';
import { useStoresData } from '@/libs/stores/stores-api';

export default function StoreListPage() {
  const { isLoading: isAuthLoading } = useUser();
  const router = useRouter();

  const { data: stores, error, isLoading } = useStoresData();

  if (isAuthLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load store data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-center mb-6">My Stores</h1>
      {stores && stores.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-600">You don’t own any stores yet.</p>
          <Button className="mt-4" onPress={() => router.push('/stores/create')}>
            Create Store
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {stores?.map((store) => (
            <Card
              key={store.id}
              className="cursor-pointer transition-transform hover:scale-105"
              onPress={() => router.push(`/stores/${store.id}`)}
            >
              <CardHeader>{store.name}</CardHeader>
              <CardBody>
                <div className="flex items-center space-x-4">
                  {store.logoUrl ? (
                    <Image
                      src={store.logoUrl}
                      alt={store.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-700">📦</span>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-600">{store.category}</p>
                    <p className="text-gray-500">{store.reputation} Reputation</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <Button variant="solid" onPress={() => router.push('/stores/create')}>
          New Store
        </Button>
      </div>
    </div>
  );
}
