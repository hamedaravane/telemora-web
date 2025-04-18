'use client';

import { ProductPreview } from '@/libs/products/types';
import Image from 'next/image';
import Link from 'next/link';
import Price from '@/components/shared/price';
import { Card, CardBody, CardFooter } from '@heroui/react';

export default function ProductPreviewCard({ product }: { product: ProductPreview }) {
  return (
    <Link href={`/stores/${product.storeId}/products/${product.id}`}>
      <Card>
        <CardBody className="h-32">
          <Image
            src={product.image[0].url}
            alt={product.image[0].alt ?? product.name}
            priority={true}
            fill
            sizes="(min-width: 640px) 32vw, 100vw"
            className="relative object-cover h-32 w-32"
          />
        </CardBody>
        <CardFooter className="block space-y-2">
          <h3 className="text-sm font-medium line-clamp-2 truncate">{product.name}</h3>
          <Price amount={product.price} />
        </CardFooter>
      </Card>
    </Link>
  );
}
