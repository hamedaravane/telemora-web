'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Card, CardBody, CardHeader, Spinner, Tooltip } from '@heroui/react';
import Image from 'next/image';
import { useUser } from '@/context/user-context';
import { useSingleStoreDataById } from '@/libs/stores/stores-api';
import AppLayout from '@/components/app-layout';
import Price from '@/components/price';

export default function StoreDetailsPage() {
  const { storeId } = useParams();
  const router = useRouter();
  const { user } = useUser();

  const {
    data: store,
    isLoading,
    error,
  } = useSingleStoreDataById(Number(storeId));

  const isOwnerOrAdmin =
    user &&
    store &&
    (store.owner.id === user.id || store.admins.some((admin) => admin.id === user.id));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load store. Please try again later.</p>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {store.logoUrl && (
            <Image src={store.logoUrl} alt={store.name} width={48} height={48} className="rounded-full" />
          )}
          <h1 className="text-xl font-bold">{store.name}</h1>
        </div>
        <div className="flex space-x-2">
          <Tooltip content="Share this store">
            <Button
              size="sm"
              variant="ghost"
              onPress={() => navigator.clipboard.writeText(window.location.href)}
            >
              Share
            </Button>
          </Tooltip>
          {isOwnerOrAdmin && (
            <Button size="sm" onPress={() => router.push(`/stores/${store.id}/edit`)}>
              Edit Store
            </Button>
          )}
        </div>
      </div>

      <div className="mb-6">
        {store.description && <p className="text-gray-700 mb-2">{store.description}</p>}
        <p className="text-gray-500 text-sm">Category: {store.category}</p>
        <p className="text-gray-500 text-sm">Reputation: {store.reputation}</p>

        {store.workingHours && (
          <div className="mt-4">
            <h2 className="font-semibold text-sm mb-1">Working Hours:</h2>
            <ul className="text-sm text-gray-600">
              {Object.entries(store.workingHours).map(([day, time]) => (
                <li key={day}>
                  {day}: {time.open} - {time.close}
                </li>
              ))}
            </ul>
          </div>
        )}

        {(store.contactNumber || store.email) && (
          <div className="mt-4 space-y-1 text-sm text-gray-600">
            {store.contactNumber && <p>Phone: {store.contactNumber}</p>}
            {store.email && <p>Email: {store.email}</p>}
          </div>
        )}

        {store.socialMediaLinks && (
          <div className="mt-2 text-sm text-blue-600 underline">
            {Object.entries(store.socialMediaLinks).map(([platform, url]) => (
              <p key={platform}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {platform}
                </a>
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Products</h2>
        <div className="grid gap-3">
          {store.products.slice(0, 4).map((product) => (
            <Card key={product.id} className="w-full">
              <CardHeader>{product.name}</CardHeader>
              <CardBody>
                <Price amount={product.price} />
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center mt-4">
          <Button variant="ghost" onPress={() => router.push(`/stores/${store.id}/products`)}>
            View All Products
          </Button>
        </div>

        {isOwnerOrAdmin && (
          <div className="text-center mt-2">
            <Button onPress={() => router.push(`/stores/${store.id}/products/new`)}>
              Add New Product
            </Button>
          </div>
        )}
      </div>

      {isOwnerOrAdmin && store.orders && store.orders.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Recent Orders</h2>
          <div className="space-y-2">
            {store.orders.slice(0, 3).map((order) => (
              <Card key={order.id} className="w-full">
                <CardHeader>Order #{order.id}</CardHeader>
                <CardBody>
                  <p className="text-sm text-gray-600">{order.payment.id} items</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        {isOwnerOrAdmin && (
          <Button
            variant="bordered"
            color="danger"
            onPress={() => router.push(`/stores/${store.id}/delete`)}
          >
            Delete Store
          </Button>
        )}
        <div className="text-center mt-4">
          <Button variant="ghost">Visit Public Store Page</Button>
        </div>
      </div>
    </AppLayout>
  );
}
