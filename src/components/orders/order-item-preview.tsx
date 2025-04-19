import React from 'react';
import { OrderItemPreview } from '@/libs/orders/types';
import Price from '@/components/shared/price';
import { Card, CardBody, Chip } from '@heroui/react';
import Image from 'next/image';

export default function OrderItemPreviewCard({ orderItem }: { orderItem: OrderItemPreview }) {
  return (
    <Card>
      <CardBody className="flex flex-row justify-between text-sm">
        <div className="flex gap-x-4">
          <Image
            src={orderItem.product.image[0].url}
            alt={orderItem.product.name}
            width={64}
            height={64}
            className="aspect-square object-cover rounded"
          />
          <div className="space-y-4">
            <strong>{orderItem.product.name}</strong>
            <Price amount={orderItem.totalPrice} />
          </div>
        </div>
        <Chip size="sm">x{orderItem.quantity}</Chip>
      </CardBody>
    </Card>
  );
}
