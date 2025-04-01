'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { useStoreCreation } from '@/context/store-creation-context';
import AppLayout from '@/components/shared/app-layout';
import { PageHeader } from '@/components/shared/page-header';

export default function CreateStoreTags() {
  const { storeData, updateStoreData } = useStoreCreation();
  const router = useRouter();

  const handleNext = () => router.push('/stores/create/working-hours');
  const handleBack = () => router.push('/stores/create/location');

  return (
    <AppLayout>
      <div className="text-sm text-gray-500 mb-4">Step 2 of 5</div>
      <PageHeader
        title="Tags"
        subtitle="Choose tags that best represents your store. This helps customers find your business
        more easily."
      />

      {/* TDOD: Add tags */}

      <div className="mt-6 flex justify-between">
        <Button onPress={handleBack}>Back</Button>
        <Button onPress={handleNext} isDisabled={!storeData.tags}>
          Next
        </Button>
      </div>
    </AppLayout>
  );
}
