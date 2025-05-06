'use client';

import { ScrollShadow, Skeleton } from '@heroui/react';
import React from 'react';

import AppLayout from '@/libs/common/components/app-layout';
import { StorePreviewCard } from '@/libs/stores/components/preview-card';
import { useDiscoverableStoresQuery, useFeaturedStoresQuery } from '@/libs/stores/hooks';

export default function MarketPage() {
  const { data: discoverStores, isLoading: isDiscoverStoresLoading } = useDiscoverableStoresQuery();
  const { data: featuredStores, isLoading: isFeaturedStoresLoading } = useFeaturedStoresQuery();

  return (
    <AppLayout>
      <div className="space-y-5">
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
      </div>
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
