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
  storeId: number | string;
}

export interface ProductSummary extends ProductPreview {
  productType: ProductType;
  store: StorePreview;
}

export interface ProductDetail extends ProductSummary {
  description?: string;
  attributes?: ProductAttribute[];
  variants?: ProductVariant[];
  categoryId: number;
  categoryPath?: ProductCategoryPath;
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

export interface ProductCategoryNode {
  id: number;
  name: string;
  slug: string;
  level: number;
  parentId?: number;
  children?: ProductCategoryNode[];
}

export type ProductCategoryTree = ProductCategoryNode[];
export type ProductCategoryFlat = Omit<ProductCategoryNode, 'children'>;
export type ProductCategoryMap = Record<number, ProductCategoryNode>;

export type ProductCategoryPath = {
  id: number;
  name: string;
  slug: string;
}[];

export interface ProductCategoryFilter {
  categoryId?: number;
  includeDescendants?: boolean;
}
