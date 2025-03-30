'use client';

import { StoreDetail } from '@/libs/stores/types';
import Image from 'next/image';
import { Button, Card, CardBody, CardHeader, Chip, Tooltip } from '@heroui/react';
import { FaClock, FaEnvelope, FaPhone, FaShareAlt } from 'react-icons/fa';
import Link from 'next/link';
import { formatAddress } from '@/components/stores/summary-card';
import StarRating from '@/components/shared/star-rating';
import ProductPreviewCard from '@/components/products/preview-card';

interface StoreDetailCardProps {
  store: StoreDetail;
  showProducts?: boolean;
  showActions?: boolean;
}

export default function StoreDetailCard({
  store,
  showProducts = true,
  showActions = true,
}: StoreDetailCardProps) {
  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="flex items-start gap-4">
        <Image
          src={store.logo?.url ?? '/fallback-store.png'}
          alt={store.name}
          width={72}
          height={72}
          className="rounded-full object-cover h-18 w-18 border"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-lg font-semibold">{store.name}</h1>
              <StarRating rating={store.reputation} />
              <p className="text-sm text-gray-500 mt-1">{formatAddress(store.address)}</p>
            </div>
            {showActions && (
              <Tooltip content="Share this store">
                <Button
                  size="sm"
                  variant="light"
                  isIconOnly
                  onPress={() => navigator.clipboard.writeText(window.location.href)}
                >
                  <FaShareAlt className="text-base" />
                </Button>
              </Tooltip>
            )}
          </div>

          {store.tags && store.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {store.tags.slice(0, 4).map((tag) => (
                <Chip key={tag} size="sm" className="bg-gray-100 text-gray-700">
                  {tag}
                </Chip>
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardBody className="space-y-4 text-sm">
        {store.description && <p className="text-gray-700">{store.description}</p>}

        <div className="space-y-1 text-gray-600">
          {store.contactNumber && (
            <p className="flex items-center gap-2">
              <FaPhone className="text-gray-400" /> {store.contactNumber}
            </p>
          )}
          {store.email && (
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-gray-400" /> {store.email}
            </p>
          )}
        </div>

        {store.socialMediaLinks && Object.keys(store.socialMediaLinks).length > 0 && (
          <div className="mt-2 space-y-1">
            {Object.entries(store.socialMediaLinks).map(([platform, url]) => (
              <p key={platform}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {platform}
                </a>
              </p>
            ))}
          </div>
        )}

        {store.workingHours && (
          <div>
            <h4 className="text-sm font-semibold mt-4 mb-1 flex items-center gap-2">
              <FaClock className="text-gray-400" />
              Working Hours
            </h4>
            <ul className="text-xs text-gray-600">
              {Object.entries(store.workingHours).map(([day, hours]) => (
                <li key={day}>
                  {day}: {hours.open} - {hours.close}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showProducts && store.products?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mt-4 mb-2">Top Products</h4>
            <div className="grid grid-cols-2 gap-4">
              {store.products.slice(0, 4).map((product) => (
                <ProductPreviewCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-3">
              <Link
                href={`/stores/${store.slug ?? store.id}/products`}
                className="text-sm text-blue-600 underline"
              >
                View All Products
              </Link>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
