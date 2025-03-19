'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select, SelectItem } from '@heroui/react';
import { useStoreCreation } from '@/context/store-creation-context';
import AppLayout from '@/components/app-layout';

export default function CreateStoreLocation() {
  const { storeData, updateStoreData } = useStoreCreation();
  const router = useRouter();

  const handleNext = () => router.push('/store/create/category-selection');
  const handleBack = () => router.push('/store/create/basic-information');

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold">Step 2: Store Location</h1>
      <Select
        label="Country"
        onChange={(e) => updateStoreData({ country: Number(e.target.value) })}
      >
        <SelectItem key="1">USA</SelectItem>
        <SelectItem key="2">Canada</SelectItem>
      </Select>
      <Button onPress={handleBack}>Back</Button>
      <Button onPress={handleNext}>Next</Button>
    </AppLayout>
  );
}
