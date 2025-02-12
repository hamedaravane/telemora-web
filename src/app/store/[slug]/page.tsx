'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import { Spinner, Card, Button, CardFooter, CardBody, CardHeader, Image } from '@heroui/react';
import Link from 'next/link';
import { getStoresById } from '@/libs/stores/stores-api';
import { Store } from '@/libs/stores/types';

export default function StorePage() {
  const { slug } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      getStoresById(slug)
        .then((data) => {
          setStore(data);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load store details.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slug]);

  return (
    <AppLayout>
      <main className="p-4">
        {loading && (
          <div className="flex justify-center items-center h-40">
            <Spinner label="Loading store..." />
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && store && (
          <Card>
            <CardHeader>
              {store.logoUrl ? (
                <Image src={store.logoUrl} alt={store.name} className="w-12 h-12 rounded-full" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300" />
              )}
              <div className="ml-4">
                <h3 className="text-xl font-bold">{store.name}</h3>
                <p className="text-sm">{store.category}</p>
              </div>
            </CardHeader>
            <CardBody>
              <p>{store.description || 'No description provided.'}</p>
              <p className="mt-2 text-sm">
                Contact: {store.contactNumber || 'N/A'} | Email: {store.email || 'N/A'}
              </p>
              <p className="mt-2 text-sm">Address: {store.address || 'N/A'}</p>
            </CardBody>
            <CardFooter>
              <Button as={Link} href={`/store/${slug}/edit`} size="sm">
                Edit Store
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </AppLayout>
  );
}
