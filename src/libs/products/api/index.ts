import {
  CreateProductDto,
  ProductDetail,
  ProductPreview,
  UpdateProductDto,
} from '@/libs/products/types';
import httpClient from '@/libs/common/http-client';

export async function getStoreProducts(storeId: number) {
  return httpClient.get<ProductPreview[]>(`/stores/${storeId}/products`);
}

export async function getProductDetails(storeId: number, productId: number) {
  return httpClient.get<ProductDetail>(`/stores/${storeId}/products/${productId}`);
}

export async function createProduct(storeId: number, data: CreateProductDto) {
  return httpClient.post<ProductDetail>(`/stores/${storeId}/products`, data);
}

export async function updateProduct(storeId: number, productId: number, data: UpdateProductDto) {
  return httpClient.patch<ProductDetail>(`/stores/${storeId}/products/${productId}`, data);
}

export async function deleteProduct(storeId: number, productId: number) {
  return httpClient.delete<void>(`/stores/${storeId}/products/${productId}`);
}
