'use client';

import React from 'react';
import AppLayout from '@/components/shared/app-layout';
import { ScrollShadow, Skeleton } from '@heroui/react';
import { StorePreviewCard } from '@/components/stores/preview-card';
import { useDiscoverStores, useFeaturedStores } from '@/libs/stores/stores-api';

export default function MarketPage() {
  const { data: discoverStores, isLoading: isDiscoverStoresLoading } = useDiscoverStores();
  const { data: featuredStores, isLoading: isFeaturedStoresLoading } = useFeaturedStores();

  return (
    <AppLayout>
      {isDiscoverStoresLoading && (
        <section>
          <HorizontalScroll>
            {new Array<number>(4).map((_) => (
              <Skeleton key={_} />
            ))}
          </HorizontalScroll>
        </section>
      )}
      {discoverStores && (
        <section>
          <HorizontalScroll>
            {discoverStores.map((store) => (
              <StorePreviewCard key={store.id} store={store} />
            ))}
          </HorizontalScroll>
        </section>
      )}

      {isFeaturedStoresLoading && (
        <section>
          <HorizontalScroll>
            {new Array<number>(4).map((_) => (
              <Skeleton key={_} />
            ))}
          </HorizontalScroll>
        </section>
      )}
      {featuredStores && (
        <section>
          <HorizontalScroll>
            {featuredStores.map((store) => (
              <StorePreviewCard key={store.id} store={store} />
            ))}
          </HorizontalScroll>
        </section>
      )}
    </AppLayout>
  );
}

function HorizontalScroll({ children }: { children: React.ReactNode }) {
  return (
    <ScrollShadow className="flex gap-x-4 max-w-full" hideScrollBar orientation="horizontal">
      {children}
    </ScrollShadow>
  );
}
