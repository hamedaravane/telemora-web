'use client';

import { StoreSummary } from '@/libs/stores/types';
import { Card, Chip, cn, Tooltip } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/components/shared/star-rating';
import { Address } from '@/libs/location/types';

interface StoreSummaryCardProps {
  store: StoreSummary;
  href?: string;
  showTags?: boolean;
  compact?: boolean;
}

const StoreSummaryCard = ({
  store,
  href,
  showTags = true,
  compact = false,
}: StoreSummaryCardProps) => {
  const storeUrl = href ?? `/stores/${store.slug ?? store.id}`;

  return (
    <Link href={storeUrl} passHref>
      <Card
        className={cn(
          'w-full p-4 rounded-xl transition hover:shadow-md bg-white dark:bg-gray-900',
          compact && 'p-3',
        )}
      >
        <div className="flex items-center space-x-4">
          <Image
            src={store.logo?.url ?? '/fallback-store.png'}
            alt={store.name}
            width={64}
            height={64}
            className="rounded-full h-16 w-16 object-cover border"
          />

          <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold truncate text-md">{store.name}</h3>
              {!store.isActive && (
                <Tooltip content="This store is inactive">
                  <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-500 rounded-full">
                    Inactive
                  </span>
                </Tooltip>
              )}
            </div>

            <StarRating rating={store.reputation} size="sm" />

            <p className="text-sm text-gray-500 truncate mt-1">{formatAddress(store.address)}</p>

            {showTags && store.tags && store.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {store.tags.slice(0, 3).map((tag) => (
                  <Chip key={tag} size="sm" className="bg-gray-100 text-gray-700">
                    {tag}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export const formatAddress = (address: Address) => {
  return [address.city, address.state, address.country].filter(Boolean).join(', ');
};

export default StoreSummaryCard;
