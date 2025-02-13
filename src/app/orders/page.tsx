'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/app-layout';
import { getAllOrders } from '@/libs/orders/orders-api';
import { Order } from '@/libs/orders/types';
import { Card, CardHeader, CardBody, CardFooter, Button, Spinner } from '@heroui/react';
import Link from 'next/link';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load orders.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AppLayout>
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Orders</h2>
        {loading && (
          <div className="flex justify-center items-center h-40">
            <Spinner label="Loading orders..." />
          </div>
        )}
        {error && <div className="text-danger mb-4">{error}</div>}
        {!loading && orders.length === 0 && <div>No orders found.</div>}
        {!loading && orders.length > 0 && (
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
                  {/* Optionally, list order items or additional details here */}
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
