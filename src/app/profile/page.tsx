'use client';

import AppLayout from '@/components/shared/app-layout';
import { useUser } from '@/context/user-context';
import { Button, Card, CardBody, CardHeader, Spinner } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { UserPrivateProfile } from '@/libs/users/types';
import { OrderSummary } from '@/libs/orders/types';
import Price from '@/components/shared/price';
import { StorePreviewCard } from '@/components/stores/preview-card';

export default function ProfilePage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  if (!user) {
    return (
      <AppLayout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center text-red-500 px-4">
          <p className="mb-4">Failed to load profile data.</p>
          <Button onPress={() => window.location.reload()}>Retry</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-10">
        <ProfileCard user={user} />
        {user.stores && user.stores.length > 0 && (
          <section>
            <h3 className="text-base font-semibold mb-3">My Stores</h3>
            <div className="grid grid-cols-2 gap-3">
              {user.stores.map((store) => (
                <StorePreviewCard key={store.id} store={store} />
              ))}
            </div>
          </section>
        )}
        {user.orders && user.orders.length > 0 && <RecentOrders orders={user.orders} />}
      </main>
    </AppLayout>
  );
}

function ProfileCard({ user }: { user: UserPrivateProfile }) {
  return (
    <div>
      <div className="text-center">
        <Image
          src={user.photo?.url ?? '/default-profile.png'}
          alt="user photo"
          width={64}
          height={64}
          className="rounded-full object-cover aspect-square inline-block"
        />
        <div className="mt-4">
          <h2 className="font-semibold text-lg">
            {user.firstName} {user.lastName}
          </h2>
          {user.username && <p className="text-gray-500 text-sm">@{user.username}</p>}
        </div>
      </div>
      <div className="mt-4">
        {user.email && <a className="lowercase text-blue-400">{user.email}</a>}
        {user.phoneNumber && <p>{user.phoneNumber}</p>}
        {user.walletAddress && (
          <p className="truncate">
            <span className="font-mono">{user.walletAddress}</span>
          </p>
        )}
      </div>
    </div>
  );
}

function RecentOrders({ orders }: { orders: OrderSummary[] }) {
  return (
    <section>
      <h3 className="text-base font-semibold mb-3">Recent Orders</h3>
      <div className="space-y-2">
        {orders.slice(0, 3).map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex justify-between text-sm">
              <p>Order #{order.id}</p>
              <p className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
            </CardHeader>
            <CardBody className="text-sm text-gray-600">
              <Price amount={order.totalAmount} />
              <p>Status: {order.status}</p>
              <p>Store: {order.store?.name}</p>
            </CardBody>
          </Card>
        ))}
        <div className="text-center mt-2">
          <Link href="/orders">
            <Button variant="ghost" size="sm">
              View All Orders
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
