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
  const [previewUrls, setPreviewUrls] = useState<string[]>(initialUrls);

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      const result = await mutateAsyncProductPhotos(files);
      setPreviewUrls(result.imageUrls);
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
        onChange={handleOnChange}
      />

      <Button
        type="button"
        fullWidth
        onPress={() => imageInputRef.current?.click()}
        startContent={<FaPaperclip />}
      >
        Choose Product Photos
      </Button>

      {previewUrls.length > 0 && (
        <ScrollShadow orientation="horizontal" className="flex gap-x-2">
          {previewUrls.map((url) => (
            <Image key={url} src={url} width={100} height={100} className="rounded" alt="" />
          ))}
        </ScrollShadow>
      )}
    </div>
  );
}
