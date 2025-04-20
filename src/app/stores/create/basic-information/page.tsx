'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Spinner } from '@heroui/react';
import { useStoreCreation } from '@/context/storeCreationContext';
import AppLayout from '@/components/shared/app-layout';
import { PageHeader } from '@/components/shared/page-header';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';

export default function CreateStoreBasicInformation() {
  const { storeData, updateStoreData } = useStoreCreation();
  const router = useRouter();
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const wallet = useTonWallet();

  useEffect(() => {
    document.getElementById('store-name')?.focus();
  }, []);

  const validateForm = () => {
    const newErrors: { name?: string } = {};
    if (!storeData.name.trim()) newErrors.name = 'Store Name is required.';
    if (!wallet?.account.address) newErrors.name = 'Please connect your wallet.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) return;
    setIsLoading(true);
    router.push('/stores/create/location');
  };

  return (
    <AppLayout>
      <div className="text-sm text-gray-500 mb-4" aria-live="polite">
        Step 1 of 5
      </div>

      <PageHeader
        title="Basic Information"
        subtitle="Your store's name and description will be visible to customers. Choose a name that reflects your brand."
      />

      <Input
        id="store-name"
        label="Store Name"
        value={storeData.name}
        onChange={(e) => updateStoreData({ name: e.target.value })}
        placeholder="e.g. John's Electronics"
        errorMessage={errors.name}
        aria-describedby="store-name-helper"
      />
      <p id="store-name-helper" className="text-sm text-gray-500 my-2">
        Pick a name that represents your store.
      </p>

      <Input
        label="Description (Optional)"
        value={storeData.description}
        onChange={(e) => updateStoreData({ description: e.target.value })}
        placeholder="e.g. We sell the best gadgets in town!"
        maxLength={200}
      />
      <p className="text-sm text-gray-500 my-2">
        {storeData.description?.length ?? 0}/200 characters
      </p>

      <TonConnectButton />

      <div className="mt-6 flex gap-x-2 justify-between">
        <Button
          variant="bordered"
          onPress={() => router.back()}
          className="w-1/3"
          aria-label="Go back to previous step"
        >
          Back
        </Button>
        <Button
          onPress={handleNext}
          className="w-2/3 transition-transform transform active:scale-95"
          disabled={isLoading}
          aria-busy={isLoading}
          aria-label="Proceed to next step"
        >
          {isLoading ? <Spinner size="sm" /> : 'Next'}
        </Button>
      </div>
    </AppLayout>
  );
}
