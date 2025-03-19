'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select, SelectItem } from '@heroui/react';
import { useStoreCreation } from '@/context/store-creation-context';
import { StoreCategory } from '@/libs/stores/types';
import AppLayout from '@/components/app-layout';

export default function CreateStoreCategorySelection() {
  const { storeData, updateStoreData } = useStoreCreation();
  const router = useRouter();

  const handleNext = () => router.push('/store/create/working-hours');
  const handleBack = () => router.push('/store/create/location');

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Step 3: Store Category</h1>
      <Select
        label="Select Category"
        value={storeData.category}
        onChange={(e) => updateStoreData({ category: e.target.value as StoreCategory })}
      >
        {Object.entries(StoreCategory).map(([key, value]) => (
          <SelectItem key={key}>
            {value}
          </SelectItem>
        ))}
      </Select>

      <div className="mt-6 flex justify-between">
        <Button onPress={handleBack}>Back</Button>
        <Button onPress={handleNext} isDisabled={!storeData.category}>
          Next
        </Button>
      </div>
    </AppLayout>
  );
}
