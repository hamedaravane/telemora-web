'use client';

import React from 'react';
import { useMarketData } from '@/libs/market/market-api';
import AppLayout from '@/components/shared/app-layout';
import { ProductCategoryNode, ProductPreview } from '@/libs/products/types';
import { StorePreview } from '@/libs/stores/types';
import { HomeFeedSection } from '@/libs/market/types';
import { Button, ScrollShadow, Spinner } from '@heroui/react';
import ProductPreviewCard from '@/components/products/preview-card';
import { StorePreviewCard } from '@/components/stores/preview-card';

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
      <div className="space-y-10">
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
            <ProductPreviewCard key={product.id} product={product} />
          ))}
        </HorizontalScroll>
      )}

      {type === 'storeCarousel' && (
        <HorizontalScroll>
          {(data as StorePreview[]).map((store) => (
            <StorePreviewCard key={store.id} store={store} />
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

function MarketCategoryCard({ category }: { category: ProductCategoryNode }) {
  return <Button variant="flat">{category.name}</Button>;
}
