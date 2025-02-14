'use client';

import { useQuery } from '@tanstack/react-query';
import AppLayout from '@/components/app-layout';
import { getAllOrders } from '@/libs/orders/orders-api';
import { Button, Card, CardBody, CardFooter, CardHeader, Spinner } from '@heroui/react';
import Link from 'next/link';

export default function Orders() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  });

  return (
    <AppLayout>
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Orders</h2>
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Spinner label="Loading orders..." />
          </div>
        )}
        {error && <div className="text-danger mb-4">Failed to load orders.</div>}
        {!isLoading && orders && orders.length === 0 && <div>No orders found.</div>}
        {!isLoading && orders && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <h3 className="text-lg font-bold">Order #{order.id}</h3>
                  <span className="text-sm">Status: {order.status}</span>
                </CardHeader>
                <CardBody>
                  <div>
                    Items: {order.items?.length || 0}{' '}
                    {order.items && order.items.length !== 1 ? 'items' : 'item'}
                  </div>
                </CardBody>
                <CardFooter>
                  <Button as={Link} href={`/orders/${order.id}`} size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </AppLayout>
  );
}
