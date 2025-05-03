'use client';

import { useParams, useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { UpdateProductFormData, updateProductSchema } from '@/libs/products/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import AppLayout from '@/libs/common/components/app-layout';
import { Button, Form, Input, Textarea } from '@heroui/react';
import { useProductDetails, useUpdateProductMutation } from '@/libs/products/hooks';
import { PageHeader } from '@/libs/common/components/page-header';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ProductTypeSelector } from '@/libs/products/components/product-type-selector';
import { ProductAttributeFields } from '@/libs/products/components/product-attributes-field';
import { ProductVariantFields } from '@/libs/products/components/product-variants-field';
import { hapticFeedback } from '@telegram-apps/sdk';

export default function EditProductPage() {
  const { storeId, productId } = useParams<{ storeId: string; productId: string }>();
  const { data: product } = useProductDetails(+storeId, +productId);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product?.name,
      price: product?.price,
      description: product?.description,
      imageUrl: product?.image[0].url,
      productType: product?.productType,
      downloadLink: product?.downloadLink,
      stock: product?.stock,
      attributes: product?.attributes,
      variants: product?.variants,
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

  const { mutateAsync } = useUpdateProductMutation(+storeId, +productId);
  const router = useRouter();

  const onSubmit = async (data: UpdateProductFormData) => {
    try {
      const result = await mutateAsync(data);
      toast.success('Product updated successfully!');
      hapticFeedback.impactOccurred('light');
      router.push(`/stores/${result.store.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create components');
    }
  };

  return (
    <AppLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <PageHeader title="Edit Product" />

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
          {isSubmitting ? 'Updating...' : 'Edit Product'}
        </Button>
      </Form>
    </AppLayout>
  );
}
