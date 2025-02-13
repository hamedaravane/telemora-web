'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import InnerLayout from '@/components/inner-layout';
import { Button, Input, Textarea, Select, Spinner } from '@heroui/react';
import { getProductsById, updateProducts } from '@/libs/products/products-api';
import {
  UpdateProductDto,
  CreateProductAttributeDto,
  CreateProductVariantDto,
  Product,
} from '@/libs/products/types';
import { ProductType } from '@/types/common';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<UpdateProductDto>({
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
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getProductsById(id)
        .then((data) => {
          setProduct(data);
          setFormData({
            name: data.name,
            price: data.price,
            description: data.description || '',
            imageUrl: data.imageUrl,
            productType: data.productType,
            downloadLink: data.downloadLink || '',
            stock: data.stock || 0,
            attributes: [],
            variants: [],
          });
          setAttributes(
            data.attributes.map((attr) => ({
              attributeName: attr.attributeName,
              attributeValue: attr.attributeValue,
            })),
          );
          setVariants(
            data.variants.map((variant) => ({
              variantName: variant.variantName,
              variantValue: variant.variantValue,
              additionalPrice: variant.additionalPrice || 0,
            })),
          );
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load product details.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

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
    setAttributes((prev) => [...prev, { attributeName: '', attributeValue: '' }]);
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
    setVariants((prev) => [...prev, { variantName: '', variantValue: '', additionalPrice: 0 }]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);
    const updatedData: UpdateProductDto = {
      ...formData,
      attributes: attributes,
      variants: variants,
    };
    try {
      await updateProducts(id, updatedData);
      router.push(`/product/${id}`);
    } catch (err) {
      console.error(err);
      setSubmitError('Failed to update product.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <InnerLayout>
        <div className="flex justify-center items-center h-40">
          <Spinner label="Loading product details..." />
        </div>
      </InnerLayout>
    );
  }

  if (error) {
    return (
      <InnerLayout>
        <div className="text-danger">{error}</div>
      </InnerLayout>
    );
  }

  return (
    <InnerLayout>
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        {submitError && <div className="text-danger mb-4">{submitError}</div>}
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
              <option key={type} value={type}>
                {type}
              </option>
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
                  value={String(variant.additionalPrice) || '0'}
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

          <Button type="submit" fullWidth disabled={submitLoading}>
            {submitLoading ? 'Updating Product...' : 'Update Product'}
          </Button>
        </form>
      </main>
    </InnerLayout>
  );
}
