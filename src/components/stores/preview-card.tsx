import { StorePreview } from '@/libs/stores/types';
import Image from 'next/image';
import StarRating from '@/components/shared/star-rating';
import Link from 'next/link';
import React from 'react';
import { Card, CardBody, cn } from '@heroui/react';
import { FaCheck, FaLock, FaUnlock } from 'react-icons/fa';

export const StorePreviewCard = ({ store }: { store: StorePreview }) => {
  return (
    <Link href={`/stores/${store.id}`} passHref>
      <Card
        className={cn(
          'p-4 rounded-xl transition hover:shadow-md',
          !store.isActive && 'opacity-50 pointer-events-none',
        )}
      >
        <CardBody className="flex flex-col items-center text-center space-y-2">
          <Image
            src={store.logo?.url ?? '/fallback-store.png'}
            alt={store.name}
            width={64}
            height={64}
            className="rounded-full object-cover h-16 w-16"
          />
          <div className="w-full">
            <h3 className="font-medium text-sm truncate">{store.name}</h3>
            <StarRating rating={store.reputation} />
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};
