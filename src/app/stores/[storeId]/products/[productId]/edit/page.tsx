'use client';

import { useParams, useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { UpdateProductFormData, updateProductSchema } from '@/libs/products/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import AppLayout from '@/components/shared/app-layout';
import { Button, Form, Input, Textarea } from '@heroui/react';
import { useProductDetails, useUpdateProductMutation } from '@/libs/products/hooks';
import { PageHeader } from '@/components/shared/page-header';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ProductTypeSelector } from '@/components/products/product-type-selector';

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
      router.push(`/stores/${result.store.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create products');
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

        {/* Attributes */}
        <section>
          <h2 className="font-semibold mb-2">Attributes</h2>
          {attributeFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <Input {...register(`attributes.${index}.attributeName`)} placeholder="Name" />
              <Input {...register(`attributes.${index}.attributeValue`)} placeholder="Value" />
              <Button variant="light" size="sm" onPress={() => removeAttribute(index)}>
                <FaTrash />
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            startContent={<FaPlus />}
            onPress={() => appendAttribute({ attributeName: '', attributeValue: '' })}
          >
            Add Attribute
          </Button>
        </section>

        {/* Variants */}
        <section>
          <h2 className="font-semibold mb-2">Variants</h2>
          {variantFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <Input {...register(`variants.${index}.variantName`)} placeholder="Name" />
              <Input {...register(`variants.${index}.variantValue`)} placeholder="Value" />
              <Input
                {...register(`variants.${index}.additionalPrice`, {
                  valueAsNumber: true,
                })}
                placeholder="Extra Price"
                type="number"
              />
              <Button variant="light" size="sm" onPress={() => removeVariant(index)}>
                <FaTrash />
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            startContent={<FaPlus />}
            onPress={() =>
              appendVariant({
                variantName: '',
                variantValue: '',
                additionalPrice: 0,
              })
            }
          >
            Add Variant
          </Button>
        </section>

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
