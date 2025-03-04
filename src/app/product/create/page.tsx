'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InnerLayout from '@/components/inner-layout';
import { Button, Input, Select, SelectItem, Textarea } from '@heroui/react';
import { createProducts } from '@/libs/products/products-api';
import {
  CreateProductAttributeDto,
  CreateProductDto,
  CreateProductVariantDto,
} from '@/libs/products/types';
import { ProductType } from '@/types/common';
import { useMutation } from '@tanstack/react-query';

const initialAttribute = { attributeName: '', attributeValue: '' };
const initialVariant = { variantName: '', variantValue: '', additionalPrice: 0 };

export default function CreateProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateProductDto>({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    productType: ProductType.PHYSICAL,
    downloadLink: '',
    stock: 0,
    attributes: [],
    variants: [],
  });
  const [attributes, setAttributes] = useState<CreateProductAttributeDto[]>([]);
  const [variants, setVariants] = useState<CreateProductVariantDto[]>([]);

  const mutation = useMutation({
    mutationFn: createProducts,
    onSuccess: (data) => {
      router.push(`/product/${data.id}`);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleAddAttribute = () => {
    setAttributes((prev) => [...prev, { ...initialAttribute }]);
  };

  const handleAttributeChange = (
    index: number,
    field: keyof CreateProductAttributeDto,
    value: string,
  ) => {
    const newAttributes = [...attributes];
    newAttributes[index] = { ...newAttributes[index], [field]: value };
    setAttributes(newAttributes);
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddVariant = () => {
    setVariants((prev) => [...prev, { ...initialVariant }]);
  };

  const handleVariantChange = (
    index: number,
    field: keyof CreateProductVariantDto,
    value: string | number,
  ) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: CreateProductDto = {
      ...formData,
      attributes,
      variants,
    };
    mutation.mutate(productData);
  };

  return (
    <InnerLayout>
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Create a New Product</h2>
        {mutation.isError && <div className="text-danger mb-4">Failed to create product.</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Price"
            name="price"
            type="number"
            value={String(formData.price)}
            onChange={handleChange}
            required
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
          <Select
            label="Product Type"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
          >
            {Object.values(ProductType).map((type) => (
              <SelectItem key={type}>{type}</SelectItem>
            ))}
          </Select>
          {formData.productType === ProductType.DIGITAL && (
            <Input
              label="Download Link"
              name="downloadLink"
              value={formData.downloadLink}
              onChange={handleChange}
            />
          )}
          <Input
            label="Stock"
            name="stock"
            type="number"
            value={String(formData.stock)}
            onChange={handleChange}
          />

          {/* Attributes Section */}
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">Attributes</h3>
            {attributes.map((attr, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <Input
                  placeholder="Name"
                  value={attr.attributeName}
                  onChange={(e) => handleAttributeChange(index, 'attributeName', e.target.value)}
                  required
                />
                <Input
                  placeholder="Value"
                  value={attr.attributeValue}
                  onChange={(e) => handleAttributeChange(index, 'attributeValue', e.target.value)}
                  required
                />
                <Button type="button" onPress={() => handleRemoveAttribute(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onPress={handleAddAttribute}>
              Add Attribute
            </Button>
          </div>

          {/* Variants Section */}
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">Variants</h3>
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <Input
                  placeholder="Variant Name"
                  value={variant.variantName}
                  onChange={(e) => handleVariantChange(index, 'variantName', e.target.value)}
                  required
                />
                <Input
                  placeholder="Variant Value"
                  value={variant.variantValue}
                  onChange={(e) => handleVariantChange(index, 'variantValue', e.target.value)}
                  required
                />
                <Input
                  placeholder="Additional Price"
                  type="number"
                  value={String(variant.additionalPrice)}
                  onChange={(e) =>
                    handleVariantChange(index, 'additionalPrice', Number(e.target.value))
                  }
                />
                <Button type="button" onPress={() => handleRemoveVariant(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onPress={handleAddVariant}>
              Add Variant
            </Button>
          </div>

          <Button type="submit" fullWidth disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating Product...' : 'Create Product'}
          </Button>
        </form>
      </main>
    </InnerLayout>
  );
}
