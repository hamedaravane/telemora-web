'use client';

import { Card, CardBody, CardFooter, CardHeader, Chip } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

import StarRating from '@/libs/common/components/star-rating';
import { Address } from '@/libs/location/types';
import { StoreSummary } from '@/libs/stores/types';

const StoreSummaryCard = ({ store }: { store: StoreSummary }) => {
  const storeUrl = `/stores/${store.id}`;

  return (
    <Link href={storeUrl} className="block">
      <Card>
        <CardHeader>
          <div className="flex items-end gap-x-4">
            <Image
              src={store.logo?.url ?? '/fallback-store.png'}
              alt={store.name}
              width={48}
              height={48}
              className="inline-block rounded-full h-12 w-12 object-cover"
            />
            <div>
              <h3 className="font-semibold truncate">{store.name}</h3>
              <StarRating rating={store.reputation} />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-xs truncate">{store.description}</p>
        </CardBody>
        <CardFooter className="block space-y-2">
          <p className="text-xs truncate">{formatAddress(store.address)}</p>
          <div className="space-x-1">
            {store.tags?.slice(0, 3).map((tag) => (
              <Chip key={tag} size="sm">
                {tag}
              </Chip>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

const formatAddress = (address: Address) => {
  return [address.city?.name, address.state?.name, address.country.name].filter(Boolean).join(', ');
};

export default StoreSummaryCard;
