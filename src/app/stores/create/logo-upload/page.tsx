'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Spinner } from '@heroui/react';
import Image from 'next/image';
import { useStoreCreation } from '@/context/storeCreationContext';
import AppLayout from '@/components/shared/app-layout';
import toast from 'react-hot-toast';

export default function CreateStoreLogoUpload() {
  const { storeData, updateStoreData, submitStore } = useStoreCreation();
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const MIN_IMAGE_RESOLUTION = 300;
  const MAX_IMAGE_RESOLUTION = 1000;

  const processImage = async (file: File) => {
    return new Promise<File | null>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target?.result as string;

        img.onload = () => {
          if (img.width < MIN_IMAGE_RESOLUTION || img.height < MIN_IMAGE_RESOLUTION) {
            toast.error('Image resolution is too low. Please upload a higher-quality image.');
            resolve(null);
            return;
          }

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            console.error('Canvas context not available');
            resolve(null);
            return;
          }

          let size = Math.min(img.width, img.height);
          if (size > MAX_IMAGE_RESOLUTION) {
            size = MAX_IMAGE_RESOLUTION;
          }

          canvas.width = size;
          canvas.height = size;

          const sx = (img.width - size) / 2;
          const sy = (img.height - size) / 2;

          ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], 'stores-logo.png', { type: 'image/png' });
                resolve(compressedFile);
              } else {
                resolve(null);
              }
            },
            'image/png',
            0.8,
          );
        };
      };
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size is too large. Please upload an image under 5MB.');
      return;
    }

    setIsProcessing(true);

    const processedFile = await processImage(file);

    setIsProcessing(false);

    if (processedFile) {
      updateStoreData({ logoFile: processedFile });
      /* TODO: URL.createObjectURL() in Logo upload never calls URL.revokeObjectURL
          Repeated uploads leak blobs and crash low‑memory Android web‑views */
      setPreviewUrl(URL.createObjectURL(processedFile));
    } else {
      toast.error('Failed to process the image. Try again.');
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleRemoveImage = () => {
    updateStoreData({ logoFile: undefined });
    setPreviewUrl(null);
  };

  const handleSubmit = async () => {
    await submitStore();
    router.push('/stores');
  };

  return (
    <AppLayout>
      <div className="text-sm text-gray-500 mb-4">Step 5 of 5</div>
      <h1 className="text-2xl font-bold">Store Logo</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {isProcessing && (
        <div className="mt-4 flex justify-center">
          <Spinner size="lg" />
        </div>
      )}

      {previewUrl && (
        <div className="mt-4">
          <Image
            src={previewUrl}
            alt="Preview"
            width={150}
            height={150}
            className="rounded-lg border"
          />
          <Button variant="bordered" className="mt-2" onPress={handleRemoveImage}>
            Change Image
          </Button>
        </div>
      )}

      <Button
        onPress={handleSubmit}
        className="mt-6"
        isDisabled={isProcessing || !storeData.logoFile}
      >
        Submit Store
      </Button>
    </AppLayout>
  );
}
