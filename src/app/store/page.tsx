'use client';

import AppLayout from '@/components/app-layout';
import { useQuery } from '@tanstack/react-query';
import { getAllStores } from '@/libs/stores/stores-api';
import { Button } from '@heroui/react';
import { Link } from '@heroui/link';
import { FaPlus } from 'react-icons/fa6';
import { CreateStoreDto } from '@/libs/stores/types';

export default function Store() {
  const {
    data: stores,
    isLoading,
    error,
  } = useQuery<CreateStoreDto[]>({
    queryKey: ['stores'],
    queryFn: getAllStores,
  });

  return (
    <AppLayout>
      <main className="px-4">
        {isLoading && <p>Loading stores...</p>}
        {error && <p className="text-danger">Failed to load stores.</p>}
        {!isLoading && stores && stores.length === 0 && (
          <div className="py-4">No stores available. Create one now!</div>
        )}
        {!isLoading && stores && stores.length > 0 && (
          <div className="space-y-4">
            {stores.map((store) => (
              <div key={store.name}>{store.name}</div>
            ))}
          </div>
        )}
        <Button as={Link} fullWidth size="lg" href="/store/create">
          <FaPlus />
          <span>Create a new Store</span>
        </Button>
      </main>
    </AppLayout>
  );
}
