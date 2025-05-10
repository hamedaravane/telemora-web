import { Button } from '@heroui/react';
import React from 'react';

import OrderSummaryCard from '@/libs/orders/components/summary-card';
import { OrderSummary } from '@/libs/orders/types';

export default function SummaryOrdersSection({
  orders,
  title,
}: {
  orders: OrderSummary[];
  title: string;
}) {
  return (
    <section className="space-y-4">
      <h1>{title}</h1>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <Button as={'link'} href="/orders">
            Create your first order
          </Button>
        ) : orders.map((order) => (
          <OrderSummaryCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}
