import { Card, CardBody, Chip } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import PriceComponent from '@/libs/common/components/PriceComponent';
import { OrderItemPreview } from '@/libs/orders/types';

export default function OrderItemPreviewCard({ orderItem }: { orderItem: OrderItemPreview }) {
  return (
    <Card>
      <CardBody className="flex flex-row justify-between text-sm">
        <div className="flex gap-x-4">
          {orderItem.product.slug ? (
            <Link href={`/products/${orderItem.product.slug}`} aria-label={`View details for ${orderItem.product.name}`} className="focus:outline-none focus:ring-2 focus:ring-primary rounded">
              <Image
                src={orderItem.product.image?.[0]?.url || "/fallback-image.png"}
                alt={sanitizeAltText(orderItem.product.name)}
                width={64}
                height={64}
                className="aspect-square rounded object-cover"
                loading="lazy"
              />
            </Link>
          ) : (
            <Image
              src={orderItem.product.image?.[0]?.url || "/fallback-image.png"}
              alt={sanitizeAltText(orderItem.product.name)}
              width={64}
              height={64}
              className="aspect-square rounded object-cover"
              loading="lazy"
            />
          )}
          <div className="space-y-4">
            {orderItem.product.slug ? (
              <Link href={`/products/${orderItem.product.slug}`} aria-label={`View details for ${orderItem.product.name}`} className="truncate max-w-[10rem] line-clamp-1 block font-bold text-inherit focus:outline-none focus:ring-2 focus:ring-primary rounded">
                <h3 className="truncate" aria-label={orderItem.product.name}>{orderItem.product.name}</h3>
              </Link>
            ) : (
              <h3 className="truncate max-w-[10rem] line-clamp-1 block" aria-label={orderItem.product.name}><strong>{orderItem.product.name}</strong></h3>
            )}
            <PriceComponent amount={orderItem.totalPrice} />
          </div>
        </div>
        <Chip size="sm">x{orderItem.quantity}</Chip>
      </CardBody>
    </Card>
  );
}

function sanitizeAltText(text: string): string {
  if (!text) return "Product image";
  const safe = text.replace(/[^\w\s\-.,]/g, "").trim();
  return safe.length > 80 ? safe.slice(0, 77) + "..." : safe;
}
