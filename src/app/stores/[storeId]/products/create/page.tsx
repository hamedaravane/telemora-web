'use client';

import { Button, Input, ScrollShadow, Textarea } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { hapticFeedback } from '@telegram-apps/sdk-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaPaperclip } from 'react-icons/fa';

import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/page-header';
import { ProductAttributeFields } from '@/libs/products/components/product-attributes-field';
import { ProductTypeSelector } from '@/libs/products/components/product-type-selector';
import { ProductVariantFields } from '@/libs/products/components/product-variants-field';
import { useCreateProductMutation, useUploadProductPhotosMutation } from '@/libs/products/hooks';
import { CreateProductFormData, createProductSchema } from '@/libs/products/schemas';
import { ProductType } from '@/libs/products/types';

const DEFAULT_ACCEPT = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heic-sequence',
];

export default function CreateProductPage() {
  const { storeId } = useParams();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      productType: ProductType.PHYSICAL,
      attributes: [],
      variants: [],
      imageUrls: [],
    },
  });

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const { mutateAsync: mutateAsyncProductPhotos, isPending } = useUploadProductPhotosMutation();

  const productType = watch('productType');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const result = await mutateAsyncProductPhotos(files);
    const urls = result.imageUrls;

    setPreviewUrls(urls);
  };

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({ control, name: 'attributes' });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({ control, name: 'variants' });

  const { mutateAsync } = useCreateProductMutation(parseInt(storeId as string, 10));
  const router = useRouter();

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      const result = await mutateAsync(data);
      toast.success('Product created successfully!');
      hapticFeedback.impactOccurred('light');
      router.push(`/stores/${result.store.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create components');
    }
  };

  return (
    <AppLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-20">
        <PageHeader title="Create New Product" />

        <Input
          label="Product Name"
          {...register('name')}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />

        <Input
          label="Price (TON)"
          type="number"
          {...register('price', { valueAsNumber: true })}
          isInvalid={!!errors.price}
          errorMessage={errors.price?.message}
        />

        <Textarea
          label="Description"
          {...register('description')}
          placeholder="Write a short product description..."
        />

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

        <ProductTypeSelector name="productType" control={control} errors={errors} />

        {productType === 'physical' && (
          <Input
            label="Stock Quantity"
            type="number"
            {...register('stock', { valueAsNumber: true })}
          />
        )}

        {productType === 'digital' && (
          <Input
            label="Download Link"
            {...register('downloadLink')}
            isInvalid={!!errors.downloadLink}
            errorMessage={errors.downloadLink?.message}
          />
        )}

        <ProductAttributeFields
          fields={attributeFields}
          register={register}
          append={appendAttribute}
          remove={removeAttribute}
          name="attributes"
        />

        <ProductVariantFields
          fields={variantFields}
          register={register}
          append={appendVariant}
          remove={removeVariant}
          name="variants"
        />

        <Button
          type="submit"
          color="primary"
          fullWidth
          isDisabled={isSubmitting || isPending}
          isLoading={isSubmitting || isPending}
        >
          {isSubmitting ? 'Creating...' : 'Create Product'}
        </Button>
      </form>
    </AppLayout>
  );
}
