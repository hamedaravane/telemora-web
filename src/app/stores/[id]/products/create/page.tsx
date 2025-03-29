'use client';

import { Button, Input, Select, SelectItem, Textarea } from '@heroui/react';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import AppLayout from '@/components/shared/app-layout';
import toast from 'react-hot-toast';
import { useCreateProductMutation } from '@/libs/products/products-api';
import { useRouter } from 'next/navigation';
import { ProductType } from '@/libs/products/types';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  price: z.number({ invalid_type_error: 'Price must be a number' }).positive(),
  description: z.string().optional(),
  imageUrl: z.string().url('Must be a valid URL'),
  productType: z.nativeEnum(ProductType),
  stock: z.number().optional(),
  downloadLink: z.string().url().optional(),
  attributes: z
    .array(
      z.object({
        attributeName: z.string().min(1),
        attributeValue: z.string().min(1),
      }),
    )
    .optional(),
  variants: z
    .array(
      z.object({
        variantName: z.string().min(1),
        variantValue: z.string().min(1),
        additionalPrice: z.number().optional(),
      }),
    )
    .optional(),
});

type FormSchema = z.infer<typeof schema>;

export default function CreateProductPage() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
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

  const { mutateAsync: createProduct } = useCreateProductMutation();
  const router = useRouter();

  const onSubmit = async (data: FormSchema) => {
    try {
      const result = await createProduct(data);
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
        <h1 className="text-2xl font-bold">Create New Product</h1>

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

        <Select label="Product Type" selectedKeys={new Set([productType])}>
          {Object.entries(ProductType).map(([key, value]) => (
            <SelectItem key={key}>{value}</SelectItem>
          ))}
        </Select>

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
          {isSubmitting ? 'Creating...' : 'Create Product'}
        </Button>
      </form>
    </AppLayout>
  );
}
