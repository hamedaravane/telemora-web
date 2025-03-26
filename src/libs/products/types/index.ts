import { StorePreview } from '@/libs/stores/types';
import { ReviewPreview } from '@/libs/reviews/types';
import { Media } from '@/types';

export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SERVICE = 'service',
}

export interface ProductPreview {
  id: number | string;
  name: string;
  slug?: string;
  price: number;
  image: Media;
}

export interface ProductSummary extends ProductPreview {
  productType: ProductType;
  store: StorePreview;
}

export interface ProductDetail extends ProductSummary {
  description?: string;
  attributes?: ProductAttribute[];
  variants?: ProductVariant[];
  stock?: number;
  downloadLink?: string;
  reviews?: ReviewPreview[];
  createdAt: Date;
}

export interface ProductAttribute {
  id: number;
  attributeName: string;
  attributeValue: string;
}

export interface ProductVariant {
  id: number;
  variantName: string;
  variantValue: string;
  additionalPrice?: number;
}

export interface CreateProductDto {
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
  productType: ProductType;
  downloadLink?: string;
  stock?: number;
  attributes?: CreateProductAttributeDto[];
  variants?: CreateProductVariantDto[];
}

export interface CreateProductAttributeDto {
  attributeName: string;
  attributeValue: string;
}

export interface CreateProductVariantDto {
  variantName: string;
  variantValue: string;
  additionalPrice?: number;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  downloadLink?: string;
  stock?: number;
  attributes?: CreateProductAttributeDto[];
  variants?: CreateProductVariantDto[];
}
