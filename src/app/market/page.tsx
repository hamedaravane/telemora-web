'use client';

import React from 'react';
import Image from 'next/image';
import { useMarketData } from '@/libs/market/market-api';
import AppLayout from '@/components/app-layout';
import { ProductCategoryNode, ProductPreview } from '@/libs/products/types';
import { StorePreview } from '@/libs/stores/types';
import { HomeFeedSection } from '@/libs/market/types';
import { Button, Card, CardBody, CardFooter, ScrollShadow, Spinner } from '@heroui/react';
import Link from 'next/link';
import StarRating from '@/components/star-rating';
import Price from '@/components/price';

export default function MarketPage() {
  const { data, isLoading, error, refetch } = useMarketData();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  if (error || !data) {
    return (
      <AppLayout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <p className="text-red-500 text-sm mb-4">
            Failed to load market data. Please try again later.
          </p>
          <Button onPress={() => refetch()}>Retry</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="px-4 py-6 space-y-10">
        {data.sections.map((section) => (
          <MarketSection key={section.id} section={section} />
        ))}
      </div>
    </AppLayout>
  );
}

function MarketSection({ section }: { section: HomeFeedSection }) {
  const { title, subtitle, expiresAt, type, data } = section;

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          {expiresAt && (
            <p className="text-xs text-red-500">
              Ends at {new Date(expiresAt).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      {type === 'productCarousel' && (
        <HorizontalScroll>
          {(data as ProductPreview[]).map((product) => (
            <MarketProductCard key={product.id} product={product} />
          ))}
        </HorizontalScroll>
      )}

      {type === 'storeCarousel' && (
        <HorizontalScroll>
          {(data as StorePreview[]).map((store) => (
            <MarketStoreCard key={store.id} store={store} />
          ))}
        </HorizontalScroll>
      )}

      {type === 'categoryGrid' && (
        <div className="grid grid-cols-2 gap-4">
          {(data as ProductCategoryNode[]).map((category) => (
            <MarketCategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </section>
  );
}

function HorizontalScroll({ children }: { children: React.ReactNode }) {
  return (
    <ScrollShadow className="flex gap-x-4 max-w-full" hideScrollBar orientation="horizontal">
      {children}
    </ScrollShadow>
  );
}

function MarketProductCard({ product }: { product: ProductPreview }) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card>
        <CardBody className="min-h-32">
          <Image
            src={product.image.url}
            alt={product.image.alt || 'Product'}
            fill
            sizes="128px"
            className="object-cover h-32 aspect-square"
          />
        </CardBody>
        <CardFooter className="flex-col justify-start items-start">
          <h3 className="text-sm font-medium truncate">{product.name}</h3>
          <Price amount={product.price} />
        </CardFooter>
      </Card>
    </Link>
  );
}

function MarketStoreCard({ store }: { store: StorePreview }) {
  return (
    <Link href={`/stores/${store.id}`} className="w-32">
      <div className="text-center h-14 w-14">
        <Image
          src={store.logo?.url || '/placeholder.png'}
          alt={store.name}
          width={32}
          height={32}
          className="object-cover rounded-full h-14 w-14 aspect-square"
        />
      </div>
      <div className="mt-2">
        <p className="text-sm font-semibold max-w-full truncate">{store.name}</p>
        <StarRating rating={store.reputation} />
      </div>
    </Link>
  );
}

function MarketCategoryCard({ category }: { category: ProductCategoryNode }) {
  return <Button variant="flat">{category.name}</Button>;
}
