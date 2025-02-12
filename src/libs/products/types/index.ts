import { ProductType } from '@/types/common';
import { Store } from '@/libs/stores/types';
import { Review } from '@/libs/reviews/types';

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
  store: Store;
  productType: ProductType;
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  reviews: Review[];
  downloadLink?: string;
  stock?: number;
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

export interface UpdateProductDto {
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  productType?: ProductType;
  downloadLink?: string;
  stock?: number;
  attributes?: CreateProductAttributeDto[];
  variants?: CreateProductVariantDto[];
}

export interface CreateProductVariantDto {
  variantName: string;
  variantValue: string;
  additionalPrice?: number;
}

export interface CreateProductAttributeDto {
  attributeName: string;
  attributeValue: string;
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
