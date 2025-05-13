'use client';

import { Card, CardBody, CardFooter } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

import PriceComponent from '@/libs/common/components/PriceComponent';
import { ProductPreview } from '@/libs/products/types';

interface ProductPreviewCard {
  product: ProductPreview;
}

export default function ProductPreviewCard({ product }: ProductPreviewCard) {
  return (
    <Link href={`/stores/${product.storeId}/products/${product.id}`}>
      <Card>
        <CardBody className="h-32">
          <Image
            src={product.image[0].url}
            alt={product.image[0].alt ?? product.name}
            priority={true}
            width={100}
            height={100}
            className="relative aspect-square w-full rounded object-cover"
          />
        </CardBody>
        <CardFooter className="block space-y-2">
          <h3 className="line-clamp-2 truncate text-sm font-medium">{product.name}</h3>
          <PriceComponent amount={product.price} />
        </CardFooter>
      </Card>
    </Link>
  );
}
