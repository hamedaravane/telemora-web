'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select } from '@heroui/react';
import { useStore } from '@/context/store-context';

export default function Step2() {
  const { storeData, updateStoreData } = useStore();
  const router = useRouter();

  const handleNext = () => router.push('/stores/create/step-3');
  const handleBack = () => router.push('/stores/create/step-1');

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold">Step 2: Store Location</h1>
      <Select
        label="Country"
        onChange={(e) => updateStoreData({ country: Number(e.target.value) })}
      >
        <option value="1">USA</option>
        <option value="2">Canada</option>
      </Select>
      <Button onPress={handleBack}>Back</Button>
      <Button onPress={handleNext}>Next</Button>
    </div>
  );
}
