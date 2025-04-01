'use client';

import { ProductSummary, ProductType } from '@/libs/products/types';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@heroui/react';
import { FaStore } from 'react-icons/fa6';
import Price from '@/components/shared/price';

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
      className={`flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-all ${className}`}
    >
      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 shrink-0">
        <Image src={image[0].url} alt={image[0].alt ?? name} fill className="object-cover" />
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold line-clamp-1">{name}</h3>
          <Price amount={price} />
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
