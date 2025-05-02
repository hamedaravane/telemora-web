'use client';

import { Button, Input, Textarea } from '@heroui/react';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AppLayout from '@/components/shared/app-layout';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { ProductType } from '@/libs/products/types';
import { useCreateProductMutation } from '@/libs/products/hooks';
import { CreateProductFormData, createProductSchema } from '@/libs/products/schemas';
import { PageHeader } from '@/components/shared/page-header';
import { ProductTypeSelector } from '@/components/products/product-type-selector';
import { ProductVariantFields } from '@/components/products/product-variants-field';
import { ProductAttributeFields } from '@/components/products/product-attributes-field';

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
    },
  });

  const productType = watch('productType');
  const [previewUrl, setPreviewUrl] = useState<string>('');

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

  const { mutateAsync } = useCreateProductMutation(+storeId);
  const router = useRouter();

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      const result = await mutateAsync(data);
      toast.success('Product created successfully!');
      router.push(`/stores/${result.store.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create products');
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

        <Input
          label="Image URL"
          {...register('imageUrl')}
          onChange={(e) => {
            setPreviewUrl(e.target.value);
          }}
          isInvalid={!!errors.imageUrl}
          errorMessage={errors.imageUrl?.message}
        />

        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="w-full rounded-xl border mt-2" />
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
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Product'}
        </Button>
      </form>
    </AppLayout>
  );
}
