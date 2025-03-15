'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select } from '@heroui/react';
import { useStore } from '@/context/store-context';

export default function Step3() {
  const { storeData, updateStoreData } = useStore();
  const router = useRouter();

  const handleNext = () => router.push('/stores/create/step-4');
  const handleBack = () => router.push('/stores/create/step-2');

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Step 3: Store Category</h1>
      <Select
        label="Select Category"
        value={storeData.category}
        onChange={(e) => updateStoreData({ category: e.target.value })}
      >
        <option value="">Select a category</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="home-goods">Home Goods</option>
        <option value="automotive">Automotive</option>
      </Select>

      <div className="mt-6 flex justify-between">
        <Button onPress={handleBack}>Back</Button>
        <Button onPress={handleNext} isDisabled={!storeData.category}>
          Next
        </Button>
      </div>
    </div>
  );
}
