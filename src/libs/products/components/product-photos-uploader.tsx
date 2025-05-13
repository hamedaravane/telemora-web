'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
} from '@heroui/react';
import { FaPaperclip, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useUploadProductPhotosMutation } from '@/libs/products/hooks';
import { useForm } from 'react-hook-form';

const DEFAULT_ACCEPT = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heic-sequence',
];
const MAX_FILES = 4;

export function ProductPhotosUploader() {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const { setValue, getValues } = useForm();
  const { mutateAsync: uploadImages, isPending } = useUploadProductPhotosMutation();

  useEffect(() => {
    const initial = getValues('imageUrls') || [];
    setUploadedImageUrls(initial);
  }, []);

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const total = selectedImages.length + selected.length;

    if (total > MAX_FILES) {
      toast.error(`You can upload up to ${MAX_FILES} images.`);
      return;
    }

    const valid = selected.filter((file) => DEFAULT_ACCEPT.includes(file.type));
    if (valid.length !== selected.length) {
      toast.error('Some files were rejected due to unsupported types.');
    }

    const previews = valid.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...valid]);
    setPreviews((prev) => [...prev, ...previews]);
    setModalOpen(true);
  };

  const handleRemove = (index: number) => {
    const newFiles = [...selectedImages];
    const newPreviews = [...previews];
    newFiles.splice(index, 1);
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);

    setSelectedImages(newFiles);
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (selectedImages.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    try {
      const result = await uploadImages(selectedImages);
      setUploadedImageUrls(result.imageUrls);
      setValue('imageUrls', result.imageUrls);
      toast.success('Images uploaded!');
    } catch (err) {
      toast.error('Image upload failed');
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
        onChange={handleSelectFiles}
      />

      <Button
        type="button"
        fullWidth
        isDisabled={selectedImages.length >= MAX_FILES}
        isLoading={isPending}
        onPress={() => imageInputRef.current?.click()}
        startContent={<FaPaperclip />}
      >
        Choose Product Photos
      </Button>

      {uploadedImageUrls.length > 0 && (
        <ScrollShadow orientation="horizontal" className="flex gap-2">
          {uploadedImageUrls.map((src, i) => (
            <Image
              key={`preview-${i}`}
              src={src}
              alt={`Preview ${i + 1}`}
              width={100}
              height={100}
              className="rounded border"
            />
          ))}
        </ScrollShadow>
      )}

      <Modal isOpen={modalOpen} onOpenChange={setModalOpen}>
        <ModalContent>
          <ModalHeader>Preview Selected Images</ModalHeader>

          <ModalBody>
            {previews.length > 0 ? (
              <ScrollShadow orientation="horizontal" className="flex gap-2">
                {previews.map((src, i) => (
                  <div key={src} className="relative">
                    <Image
                      src={src}
                      alt={`Preview ${i + 1}`}
                      width={100}
                      height={100}
                      className="rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemove(i)}
                      className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-xs text-white"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </ScrollShadow>
            ) : (
              <p className="text-sm text-gray-500">No images selected</p>
            )}
          </ModalBody>

          <ModalFooter className="flex justify-between">
            <Button
              variant="light"
              onPress={() => {
                selectedImages.forEach((_, i) => URL.revokeObjectURL(uploadedImageUrls[i]));
                setSelectedImages([]);
                setUploadedImageUrls([]);
                setModalOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              onPress={handleUpload}
              isLoading={isPending}
              isDisabled={selectedImages.length === 0}
            >
              Upload Images
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
