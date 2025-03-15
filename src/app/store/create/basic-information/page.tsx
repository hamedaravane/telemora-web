'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@heroui/react';
import { useStore } from '@/context/store-context';

export default function Step1() {
  const { storeData, updateStoreData } = useStore();
  const router = useRouter();

  const handleNext = () => {
    router.push('/stores/create/step-2');
  };

  return (
    <div className="min-h-screen p-4">
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
    </div>
  );
}
