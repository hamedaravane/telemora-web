'use client';

import { ProductPreview } from '@/libs/products/types';
import Image from 'next/image';
import Link from 'next/link';
import Price from '@/components/shared/price';
import { Card, CardBody, CardFooter } from '@heroui/react';
import { CurrencyInfo } from '@/libs/users/types';
import Decimal from 'decimal.js';

interface ProductPreviewCard{
  product: ProductPreview,
  currencyInfo: CurrencyInfo
}

export default function ProductPreviewCard({ product, currencyInfo }: ProductPreviewCard) {
 
  const tonPriceInLocalCurrency = new Decimal(currencyInfo?.tonToUsdRate || 0)
    .dividedBy(new Decimal(currencyInfo?.localCurrencyToUsdRate || 0))
    .toNumber();
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
          <Price amount={product.price} />
          <Price amount={tonPriceInLocalCurrency} localCurrencyCode={currencyInfo.localCurrencyCode}/>
        </CardFooter>
      </Card>
    </Link>
  );
}
