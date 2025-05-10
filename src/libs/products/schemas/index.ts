import { z } from 'zod';

import { ProductType } from '@/libs/products/types';

export const productAttributeSchema = z.object({
  attributeName: z.string().min(1, 'Attribute name is required'),
  attributeValue: z.string().min(1, 'Attribute value is required'),
});

export const productVariantSchema = z.object({
  variantName: z.string().min(1, 'Variant name is required'),
  variantValue: z.string().min(1, 'Variant value is required'),
  additionalPrice: z.number().optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.number().positive('Price must be greater than zero'),
  description: z.string().optional(),
  imageUrl: z.string().url('Image URL must be valid'),
  productType: z.nativeEnum(ProductType),
  downloadLink: z.string().url('Download link must be a valid URL').optional(),
  stock: z.number().int().nonnegative().optional(),
  attributes: z.array(productAttributeSchema).optional(),
  variants: z.array(productVariantSchema).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductFormData = z.infer<typeof createProductSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
export type CreateProductAttributeFormData = z.infer<typeof productAttributeSchema>;
export type CreateProductVariantFormData = z.infer<typeof productVariantSchema>;
