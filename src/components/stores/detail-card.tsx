import { StoreDetail } from '@/libs/stores/types';
import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/shared/star-rating';
import React from 'react';

export const StoreDetailCard = ({ store }: { store: StoreDetail }) => {
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
};
