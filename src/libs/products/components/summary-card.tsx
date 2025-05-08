'use client';

import { Badge } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStore } from 'react-icons/fa6';

import PriceComponent from '@/libs/common/components/PriceComponent';
import { ProductSummary, ProductType } from '@/libs/products/types';

interface ProductSummaryCardProps {
  product: ProductSummary;
  className?: string;
}

export default function ProductSummaryCard({ product, className }: ProductSummaryCardProps) {
  const { id, slug, name, price, image, productType, store } = product;

  const href = `/products/${slug ?? id}`;

  const productTypeLabel: Record<ProductType, string> = {
    [ProductType.PHYSICAL]: 'Physical',
    [ProductType.DIGITAL]: 'Digital',
    [ProductType.SERVICE]: 'Service',
  };

  const typeColor: Record<ProductType, 'primary' | 'success' | 'warning'> = {
    [ProductType.PHYSICAL]: 'primary',
    [ProductType.DIGITAL]: 'success',
    [ProductType.SERVICE]: 'warning',
  };

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-all hover:shadow-sm ${className}`}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image src={image[0].url} alt={image[0].alt ?? name} fill className="object-cover" />
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-sm font-semibold">{name}</h3>
          <PriceComponent amount={price} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <FaStore className="text-gray-400" />
            <span className="line-clamp-1">{store.name}</span>
          </div>
          <Badge size="sm" color={typeColor[productType]}>
            {productTypeLabel[productType]}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
