'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import Image from 'next/image';
import { useStore } from '@/context/store-context';

export default function Step5() {
  const { storeData, updateStoreData } = useStore();
  const router = useRouter();

  const handleSubmit = () => {
    // Call API to submit all stored data
    router.push('/stores');
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold">Step 5: Store Logo</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => updateStoreData({ logoFile: e.target.files![0] })}
      />
      {storeData.logoFile && (
        <Image
          src={URL.createObjectURL(storeData.logoFile)}
          alt="Preview"
          width={100}
          height={100}
        />
      )}
      <Button onPress={handleSubmit}>Submit Store</Button>
    </div>
  );
}
