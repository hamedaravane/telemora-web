'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import { getOrdersById } from '@/libs/orders/orders-api';
import { Order } from '@/libs/orders/types';
import { Card, CardHeader, CardBody, CardFooter, Spinner, Button } from '@heroui/react';
import Link from 'next/link';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getOrdersById(id)
        .then((data: Order) => {
          setOrder(data);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load order details.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <AppLayout>
      <main className="p-4">
        {loading && (
          <div className="flex justify-center items-center h-40">
            <Spinner label="Loading order details..." />
          </div>
        )}
        {error && <div className="text-danger">{error}</div>}
        {!loading && order && (
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
