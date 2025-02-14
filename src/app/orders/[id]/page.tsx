'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import { getOrdersById } from '@/libs/orders/orders-api';
import type { Order } from '@/libs/orders/types';
import { Button, Card, CardBody, CardFooter, CardHeader, Spinner } from '@heroui/react';
import Link from 'next/link';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: order,
    isLoading,
    error,
  } = useQuery<Order>({
    queryKey: ['order', id],
    queryFn: () => getOrdersById(id as string),
    enabled: !!id,
  });

  return (
    <AppLayout>
      <main className="p-4">
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Spinner label="Loading order details..." />
          </div>
        )}
        {error && <div className="text-danger">Failed to load order details.</div>}
        {!isLoading && order && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Order #{order.id}</h2>
              <p className="text-sm">Status: {order.status}</p>
            </CardHeader>
            <CardBody>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div key={item.id} className="border p-2 rounded mb-2">
                      <p>
                        <strong>Product:</strong> {item.product.name}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Total Price:</strong> ${item.totalPrice}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No items in this order.</p>
                )}
              </div>
            </CardBody>
            <CardFooter>
              <Button as={Link} href="/orders" size="sm">
                Back to Orders
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </AppLayout>
  );
}
