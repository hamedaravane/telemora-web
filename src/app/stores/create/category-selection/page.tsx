'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select, SelectItem } from '@heroui/react';
import { useStoreCreation } from '@/context/store-creation-context';
import { StoreCategory } from '@/libs/stores/types';
import AppLayout from '@/components/shared/app-layout';

export default function CreateStoreCategorySelection() {
  const { storeData, updateStoreData } = useStoreCreation();
  const router = useRouter();

  const categoryOptions = useMemo(
    () => Object.entries(StoreCategory).map(([key, value]) => ({ key, label: value })),
    [],
  );

  const handleNext = () => router.push('/store/create/working-hours');
  const handleBack = () => router.push('/store/create/location');

  return (
    <AppLayout>
      <div className="text-sm text-gray-500 mb-4">Step 2 of 5</div>
      <h1 className="text-2xl font-bold mb-2">Step 3: Store Category</h1>
      <p className="text-gray-600 text-sm mb-6">
        Choose a category that best represents your store. This helps customers find your business
        more easily.
      </p>

      <Select
        label="Select Category"
        selectedKeys={storeData.category ? new Set([storeData.category]) : undefined}
        onSelectionChange={(keys) => {
          updateStoreData({ category: Array.from(keys)[0] as StoreCategory });
        }}
      >
        {categoryOptions.map(({ key, label }) => (
          <SelectItem key={key}>{label}</SelectItem>
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
