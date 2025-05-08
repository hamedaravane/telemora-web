import { Card, CardBody, cn } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import StarRating from '@/libs/common/components/star-rating';
import { StorePreview } from '@/libs/stores/types';

export const StorePreviewCard = ({ store }: { store: StorePreview }) => {
  return (
    <Link href={`/stores/${store.id}`} className="block" passHref>
      <Card
        className={cn(
          'rounded-xl p-4 transition hover:shadow-md',
          !store.isActive && 'pointer-events-none opacity-50',
        )}
      >
        <CardBody className="flex flex-col items-center space-y-2 text-center">
          <Image
            src={store.logo?.url ?? '/fallback-store.png'}
            alt={store.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="w-full">
            <h3 className="truncate text-sm font-medium">{store.name}</h3>
            <StarRating rating={store.reputation} />
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};
