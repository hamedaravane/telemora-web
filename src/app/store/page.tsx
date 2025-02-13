'use client';
import AppLayout from '@/components/app-layout';
import { useEffect, useState } from 'react';
import { getAllStores } from '@/libs/stores/stores-api';
import { Button } from '@heroui/react';
import { Link } from '@heroui/link';
import { FaPlus } from 'react-icons/fa6';
import { CreateStoreDto } from '@/libs/stores/types';

export default function Store() {
  const [stores, setStores] = useState<CreateStoreDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllStores()
      .then((data) => {
        setStores(data);
      })
      .catch((err) => {
        console.error('Error fetching stores:', err);
        setError('Failed to load stores.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AppLayout>
      <main className="px-4">
        {loading && <p>Loading stores...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && stores.length === 0 && (
          <div className="py-4">No stores available. Create one now!</div>
        )}
        {!loading && !error && stores.length > 0 && (
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
