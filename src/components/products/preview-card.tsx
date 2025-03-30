'use client';

import { ProductPreview } from '@/libs/products/types';
import Image from 'next/image';
import Link from 'next/link';
import Price from '@/components/shared/price';
import { Card, CardBody, CardFooter } from '@heroui/react';

export default function ProductPreviewCard({ product }: { product: ProductPreview }) {
  const productLink = `/products/${product.id}`;

  return (
    <Link href={productLink}>
      <Card>
        <CardBody className="h-32">
          <Image
            src={product.image.url}
            alt={product.image.alt ?? product.name}
            priority={true}
            fill
            sizes="(min-width: 640px) 32vw, 100vw"
            className="object-cover h-32 w-32"
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
