'use client';

import { Button, Form, Progress, Spinner } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { hapticFeedback } from '@telegram-apps/sdk-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/page-header';
import { useSubmitStoreLogoMutation } from '@/libs/stores/hooks';
import { CreateStoreLogoDto, storeLogoFormSchema } from '@/libs/stores/schemas';

export default function CreateStoreLogoUpload() {
  const router = useRouter();
  const { storeId } = useParams<{ storeId: string }>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { mutateAsync, isPending } = useSubmitStoreLogoMutation(storeId);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const MIN_RES = 300;
  const MAX_RES = 1000;

  const form = useForm<CreateStoreLogoDto>({
    resolver: zodResolver(storeLogoFormSchema),
    defaultValues: {
      logoFile: undefined,
    },
  });

  const processImage = async (file: File): Promise<File | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target?.result as string;

        img.onload = () => {
          if (img.width < MIN_RES || img.height < MIN_RES) {
            toast.error('Image resolution too low. Minimum is 300x300.');
            resolve(null);
            return;
          }

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(null);

          const size = Math.min(img.width, img.height, MAX_RES);
          canvas.width = size;
          canvas.height = size;

          const sx = (img.width - size) / 2;
          const sy = (img.height - size) / 2;

          ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);
          canvas.toBlob(
            (blob) => {
              if (!blob) return resolve(null);
              resolve(new File([blob], 'store-logo.png', { type: 'image/png' }));
            },
            'image/png',
            0.8,
          );
        };
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File must be under 5MB.');
      return;
    }

    setIsProcessing(true);
    const processed = await processImage(file);
    setIsProcessing(false);

    if (processed) {
      form.setValue('logoFile', processed);
      setPreviewUrl(URL.createObjectURL(processed));
    } else {
      toast.error('Image processing failed.');
    }
  };

  const handleRemoveImage = () => {
    form.setValue('logoFile', undefined);
    setPreviewUrl(null);
  };

  const onSubmit = async (data: CreateStoreLogoDto) => {
    if (!data.logoFile) {
      toast.error('Please upload a logo image.');
      return;
    }

    try {
      const result = await mutateAsync(data);
      toast.success('Store created successfully!');
      hapticFeedback.impactOccurred('light');
      router.push(`/stores/${result.id}`);
    } catch {
      toast.error('Store submission failed.');
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <AppLayout>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Progress label="Final Step" maxValue={5} value={5} size="sm" />
        <PageHeader title="Upload Store Logo" subtitle="blah blah" />
        <input type="file" accept="image/*" hidden onChange={handleFileChange} />

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
          type="submit"
          className="mt-6"
          isDisabled={isProcessing || !form.watch('logoFile')}
          isLoading={isPending}
        >
          Submit Store
        </Button>
      </Form>
    </AppLayout>
  );
}
