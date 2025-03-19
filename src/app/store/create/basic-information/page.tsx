'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@heroui/react';
import { useStoreCreation } from '@/context/store-creation-context';
import AppLayout from '@/components/app-layout';

export default function CreateStoreBasicInformation() {
  const { storeData, updateStoreData } = useStoreCreation();
  const router = useRouter();

  const handleNext = () => {
    router.push('/store/create/location');
  };

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold">Step 1: Basic Information</h1>
      <Input
        label="Store Name"
        value={storeData.name}
        onChange={(e) => updateStoreData({ name: e.target.value })}
      />
      <Input
        label="Description"
        value={storeData.description}
        onChange={(e) => updateStoreData({ description: e.target.value })}
      />
      <Button onPress={handleNext}>Next</Button>
    </AppLayout>
  );
}
