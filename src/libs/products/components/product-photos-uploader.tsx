import { Button, ScrollShadow } from '@heroui/react';
import { FaPaperclip } from 'react-icons/fa';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useUploadProductPhotosMutation } from '@/libs/products/hooks';
import { useFormContext } from 'react-hook-form';

const DEFAULT_ACCEPT = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heic-sequence',
];

export function ProductPhotosUploader() {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const { mutateAsync: mutateAsyncProductPhotos, isPending } = useUploadProductPhotosMutation();
  const { setValue, getValues } = useFormContext();
  const initialUrls = getValues('imageUrls') || [];
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>(initialUrls);

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      const result = await mutateAsyncProductPhotos(files);
      setUploadedImageUrls(result.imageUrls);
      setValue('imageUrls', result.imageUrls);
    } catch (err) {
      toast.error('Failed to upload images');
    }
  };

  return (
    <div>
      <input
        ref={imageInputRef}
        hidden
        type="file"
        multiple
        accept={DEFAULT_ACCEPT.join(',')}
        aria-label="Choose images"
        onChange={handleFileInputChange}
      />

      <Button
        type="button"
        fullWidth
        isDisabled={isPending}
        isLoading={isPending}
        onPress={() => imageInputRef.current?.click()}
        startContent={<FaPaperclip />}
      >
        Choose Product Photos
      </Button>

      {uploadedImageUrls.length > 0 && (
        <ScrollShadow orientation="horizontal" className="flex gap-x-2">
          {uploadedImageUrls.map((url) => (
            <Image key={url} src={url} width={100} height={100} className="rounded" alt="" />
          ))}
        </ScrollShadow>
      )}
    </div>
  );
}
