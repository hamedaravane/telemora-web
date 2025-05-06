import { Card, CardBody, Chip } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

import PriceComponent from '@/libs/common/components/PriceComponent';
import { OrderItemPreview } from '@/libs/orders/types';

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
            <PriceComponent amount={orderItem.totalPrice} />
          </div>
        </div>
        <Chip size="sm">x{orderItem.quantity}</Chip>
      </CardBody>
    </Card>
  );
}
