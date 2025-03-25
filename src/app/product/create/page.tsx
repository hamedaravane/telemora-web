'use client';

import React, { useState } from 'react';
import { Button, Chip, Divider, Input, Select, SelectItem, Textarea, Tooltip } from '@heroui/react';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { CreateProductDto, ProductType } from '@/libs/products/types';
import AppLayout from '@/components/app-layout';

export default function CreateProductPage() {
  const router = useRouter();

  const [form, setForm] = useState<CreateProductDto>({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    productType: ProductType.PHYSICAL,
    stock: undefined,
    downloadLink: '',
    attributes: [],
    variants: [],
  });

  const [newAttribute, setNewAttribute] = useState({ name: '', value: '' });
  const [newVariant, setNewVariant] = useState({ name: '', value: '', price: '' });

  const handleChange = <T extends keyof CreateProductDto>(key: T, value: CreateProductDto[T]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddAttribute = () => {
    if (!newAttribute.name || !newAttribute.value) return;
    handleChange('attributes', [
      ...(form.attributes || []),
      {
        attributeName: newAttribute.name,
        attributeValue: newAttribute.value,
      },
    ]);
    setNewAttribute({ name: '', value: '' });
  };

  const handleAddVariant = () => {
    if (!newVariant.name || !newVariant.value) return;
    handleChange('variants', [
      ...(form.variants || []),
      {
        variantName: newVariant.name,
        variantValue: newVariant.value,
        additionalPrice: parseFloat(newVariant.price) || 0,
      },
    ]);
    setNewVariant({ name: '', value: '', price: '' });
  };

  const handleRemoveAttribute = (index: number) => {
    const updated = [...(form.attributes || [])];
    updated.splice(index, 1);
    handleChange('attributes', updated);
  };

  const handleRemoveVariant = (index: number) => {
    const updated = [...(form.variants || [])];
    updated.splice(index, 1);
    handleChange('variants', updated);
  };

  const handleSubmit = async () => {
    // TODO: Replace with actual API integration
    console.log('Submitted Product:', form);
    router.push('/store/products'); // or confirmation page
  };

  return (
    <AppLayout>
      <div className="pb-16">
        <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

        {/* Name */}
        <Input
          label="Product Name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="mb-4"
          isRequired
        />

        {/* Price */}
        <Input
          label="Price (TON)"
          type="number"
          value={form.price.toString()}
          onChange={(e) => handleChange('price', parseFloat(e.target.value))}
          className="mb-4"
          isRequired
        />

        {/* Description */}
        <Textarea
          label="Description"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="mb-4"
        />

        {/* Image URL */}
        <Input
          label="Product Image URL"
          value={form.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          className="mb-4"
          isRequired
        />

        {/* Product Type */}
        <Select
          label="Product Type"
          selectedKeys={new Set([form.productType])}
          onSelectionChange={(keys) => {
            const type = Array.from(keys)[0] as ProductType;
            handleChange('productType', type);
          }}
          className="mb-4"
        >
          {Object.values(ProductType).map((type) => (
            <SelectItem key={type}>{type}</SelectItem>
          ))}
        </Select>

        {/* Conditional Fields */}
        {form.productType === ProductType.PHYSICAL && (
          <Input
            label="Stock"
            type="number"
            value={form.stock?.toString() || ''}
            onChange={(e) => handleChange('stock', parseInt(e.target.value))}
            className="mb-4"
          />
        )}

        {form.productType === ProductType.DIGITAL && (
          <Input
            label="Download Link"
            value={form.downloadLink || ''}
            onChange={(e) => handleChange('downloadLink', e.target.value)}
            className="mb-4"
          />
        )}

        <Divider className="my-6" />

        {/* Attributes */}
        <h2 className="text-lg font-semibold mb-2">Attributes</h2>
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="Attribute Name"
            value={newAttribute.name}
            onChange={(e) => setNewAttribute((p) => ({ ...p, name: e.target.value }))}
          />
          <Input
            placeholder="Value"
            value={newAttribute.value}
            onChange={(e) => setNewAttribute((p) => ({ ...p, value: e.target.value }))}
          />
          <Button size="sm" onPress={handleAddAttribute} variant="ghost">
            <FaPlus />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {form.attributes?.map((attr, i) => (
            <Chip
              key={i}
              color="primary"
              endContent={
                <Tooltip content="Remove">
                  <FaTrash className="cursor-pointer" onClick={() => handleRemoveAttribute(i)} />
                </Tooltip>
              }
            >
              {attr.attributeName}: {attr.attributeValue}
            </Chip>
          ))}
        </div>

        {/* Variants */}
        <h2 className="text-lg font-semibold mb-2">Variants</h2>
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex gap-2">
            <Input
              placeholder="Variant Name"
              value={newVariant.name}
              onChange={(e) => setNewVariant((p) => ({ ...p, name: e.target.value }))}
            />
            <Input
              placeholder="Value"
              value={newVariant.value}
              onChange={(e) => setNewVariant((p) => ({ ...p, value: e.target.value }))}
            />
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Additional Price"
              type="number"
              value={newVariant.price}
              onChange={(e) => setNewVariant((p) => ({ ...p, price: e.target.value }))}
            />
            <Button size="sm" onPress={handleAddVariant} variant="ghost">
              <FaPlus />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {form.variants?.map((variant, i) => (
            <Chip
              key={i}
              color="secondary"
              endContent={
                <FaTrash className="cursor-pointer" onClick={() => handleRemoveVariant(i)} />
              }
            >
              {variant.variantName} - {variant.variantValue} (+{variant.additionalPrice} TON)
            </Chip>
          ))}
        </div>

        {/* Submit */}
        <Button color="primary" onPress={handleSubmit} fullWidth>
          Create Product
        </Button>
      </div>
    </AppLayout>
  );
}
