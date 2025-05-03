'use client';

import { ProductPreview } from '@/libs/products/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardFooter } from '@heroui/react';
import PriceComponent from '@/libs/common/components/PriceComponent';

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
            fill
            sizes="(min-width: 640px) 32vw, 100vw"
            className="relative object-cover"
          />
        </CardBody>
        <CardFooter className="block space-y-2">
          <h3 className="text-sm font-medium line-clamp-2 truncate">{product.name}</h3>
          <PriceComponent amount={product.price} />
        </CardFooter>
      </Card>
    </Link>
  );
}
