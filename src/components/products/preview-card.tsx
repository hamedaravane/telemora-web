'use client';

import { ProductPreview } from '@/libs/products/types';
import Image from 'next/image';
import Link from 'next/link';
import Price from '@/components/shared/price';

interface ProductPreviewCardProps {
  product: ProductPreview;
  className?: string;
}

export default function ProductPreviewCard({ product, className }: ProductPreviewCardProps) {
  const productLink = `/products/${product.slug ?? product.id}`;

  return (
    <Link
      href={productLink}
      className={`block rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white overflow-hidden ${className}`}
    >
      <div className="relative w-full aspect-[4/5] bg-gray-100">
        <Image
          src={product.image.url}
          alt={product.image.alt ?? product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-3 space-y-1">
        <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
        <Price amount={product.price} />
      </div>
    </Link>
  );
}
