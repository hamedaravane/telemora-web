'use client';

import { Button, Card, CardBody, CardHeader, Spinner, Tooltip } from '@heroui/react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '@/context/user-context';
import { useSingleStoreDataById } from '@/libs/stores/stores-api';
import AppLayout from '@/components/app-layout';
import Price from '@/components/price';
import { FaLink, FaPlus } from 'react-icons/fa6';
import { FaExternalLinkAlt, FaTrashAlt } from 'react-icons/fa';

export default function StoreDetailsPage() {
  const { storeId } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const { data: store, isLoading, error } = useSingleStoreDataById(Number(storeId));

  const isOwnerOrAdmin =
    user &&
    store &&
    (store.owner.id === user.id || store.admins.some((admin) => admin.id === user.id));

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  if (error || !store) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500 text-center text-sm">
            Failed to load store. Please try again later.
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          {store.logoUrl ? (
            <Image
              src={store.logoUrl}
              alt={store.name}
              width={48}
              height={48}
              className="rounded-full h-12 w-12 object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white">
              {store.name[0]}
            </div>
          )}
          <h1 className="text-xl font-bold">{store.name}</h1>
        </div>
        <div className="flex gap-2">
          <Tooltip content="Copy Store Link">
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              onPress={() => navigator.clipboard.writeText(window.location.href)}
            >
              <FaLink />
            </Button>
          </Tooltip>
          {isOwnerOrAdmin && (
            <Button size="sm" onPress={() => router.push(`/stores/${store.id}/edit`)}>
              Edit Store
            </Button>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 text-sm text-gray-700 space-y-1">
        {store.description && <p>{store.description}</p>}
        <p className="text-gray-500">Category: {store.category}</p>
        <p className="text-gray-500">Reputation: {store.reputation}</p>
      </div>

      {/* Working Hours */}
      {store.workingHours && (
        <div className="mb-6">
          <h2 className="font-semibold text-sm mb-2">Working Hours</h2>
          <ul className="space-y-1 text-sm text-gray-600">
            {Object.entries(store.workingHours).map(([day, time]) => (
              <li key={day}>
                <strong>{day}:</strong> {time.open} - {time.close}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Contact & Socials */}
      <div className="mb-6 space-y-1 text-sm text-gray-600">
        {store.contactNumber && <p>📞 Phone: {store.contactNumber}</p>}
        {store.email && <p>📧 Email: {store.email}</p>}
        {store.socialMediaLinks && (
          <div className="pt-2 space-y-1">
            {Object.entries(store.socialMediaLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block"
              >
                {platform}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Products */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Products</h2>
          <Button
            variant="ghost"
            size="sm"
            onPress={() => router.push(`/stores/${store.id}/products`)}
          >
            View All
          </Button>
        </div>
        {store.products.length === 0 ? (
          <p className="text-sm text-gray-500">No products added yet.</p>
        ) : (
          <div className="grid gap-3">
            {store.products.slice(0, 4).map((product) => (
              <Card key={product.id}>
                <CardHeader className="text-sm font-medium">{product.name}</CardHeader>
                <CardBody>
                  <Price amount={product.price} />
                </CardBody>
              </Card>
            ))}
          </div>
        )}
        {isOwnerOrAdmin && (
          <div className="text-center mt-4">
            <Button
              size="sm"
              variant="bordered"
              onPress={() => router.push(`/stores/${store.id}/products/new`)}
              startContent={<FaPlus />}
            >
              Add New Product
            </Button>
          </div>
        )}
      </div>

      {/* Orders */}
      {isOwnerOrAdmin && store.orders && store.orders.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Recent Orders</h2>
          <div className="space-y-3">
            {store.orders.slice(0, 3).map((order) => (
              <Card key={order.id}>
                <CardHeader className="text-sm font-semibold flex justify-between items-center">
                  <span>Order #{order.id}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </CardHeader>
                <CardBody className="text-sm text-gray-600">
                  <p>Total: ${order.totalAmount.toFixed(2)}</p>
                  <p>Status: {order.status}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="mt-8 space-y-4">
        {isOwnerOrAdmin && (
          <Button
            fullWidth
            variant="bordered"
            color="danger"
            startContent={<FaTrashAlt />}
            onPress={() => router.push(`/stores/${store.id}/delete`)}
          >
            Delete Store
          </Button>
        )}
        <Button
          fullWidth
          variant="ghost"
          startContent={<FaExternalLinkAlt />}
          onPress={() => router.push(`/public/stores/${store.id}`)}
        >
          Visit Public Store Page
        </Button>
      </div>
    </AppLayout>
  );
}
