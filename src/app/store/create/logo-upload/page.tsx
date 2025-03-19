'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import Image from 'next/image';
import { useStoreCreation } from '@/context/store-creation-context';
import AppLayout from '@/components/app-layout';

export default function CreateStoreLogoUpload() {
  const { storeData, updateStoreData, submitStore } = useStoreCreation();
  const router = useRouter();

  const handleSubmit = async () => {
    await submitStore();
    router.push('/stores');
  };

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold">Final Step: Store Logo</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => updateStoreData({ logoUrl: e.target.files![0] })}
      />
      {storeData.logoUrl && (
        <Image
          src={URL.createObjectURL(storeData.logoUrl)}
          alt="Preview"
          width={100}
          height={100}
        />
      )}
      <Button onPress={handleSubmit}>Submit Store</Button>
    </AppLayout>
  );
}
