'use client';
import AppLayout from '@/components/app-layout';
import { useEffect, useState } from 'react';
import { getAllStores } from '@/libs/stores/stores-api';
import { Button, Link } from '@heroui/react';
import { FaPlus } from 'react-icons/fa6';
import { CreateStoreDto } from '@/libs/stores/types';

export default function Store() {
  const [stores, setStores] = useState<CreateStoreDto[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllStores()
      .then((data) => {
        setStores(data);
      })
      .catch(() => {
        console.log('nothing');
      })
      .finally(() => {
        setLoading(false);
      });
  });
  return (
    <AppLayout>
      <main className="px-4">
        {stores ? (
          stores.map((store) => {
            return <div key={store.name}>{store.name}</div>;
          })
        ) : (
          <pre>{JSON.stringify(stores)}</pre>
        )}
        <Button as={Link} fullWidth size="lg" href="./create">
          <FaPlus />
          <span>Create a new Store</span>
        </Button>
      </main>
    </AppLayout>
  );
}
