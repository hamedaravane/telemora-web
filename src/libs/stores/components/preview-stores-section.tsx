import { Button, Divider } from '@heroui/react';
import React from 'react';

import { StorePreviewCard } from '@/libs/stores/components/preview-card';
import { StorePreview } from '@/libs/stores/types';

export default function PreviewStoresSection({
  stores,
  title,
}: {
  stores: StorePreview[];
  title: string;
}) {
  return (
    <section className="space-y-4">
      <Divider />
      <h1>{title}</h1>
      <div className="grid grid-cols-2 gap-3">
        {stores.length === 0 ? (
          <Button as={'link'} href="/stores/create">
            Create your first Store
          </Button>
        ) : stores.map((store) => (
          <StorePreviewCard key={store.id} store={store} />
        ))}
      </div>
    </section>
  );
}
