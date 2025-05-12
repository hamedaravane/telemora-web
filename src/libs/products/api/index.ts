import { isDev } from '@/libs/common/utils';
import httpClient from '@/libs/common/utils/http-client';
import {
  generateMockProductDetail,
  generateMockProductPhotos,
  generateMockProductPreviews,
} from '@/libs/products/mocks';
import {
  CreateProductDto,
  ProductDetail,
  ProductPreview,
  UpdateProductDto,
} from '@/libs/products/types';

export async function getStoreProducts(storeId: number) {
  return isDev
    ? generateMockProductPreviews()
    : httpClient.get<ProductPreview[]>(`/stores/${storeId}/products`);
}

export async function getProductDetails(storeId: number, productId: number) {
  return isDev
    ? generateMockProductDetail()
    : httpClient.get<ProductDetail>(`/stores/${storeId}/products/${productId}`);
}

export async function uploadProductPhotos(data: File[]) {
  const formData = new FormData();
  data.forEach((file) => {
    formData.append('photos', file);
  });

  return isDev
    ? generateMockProductPhotos()
    : httpClient.post<{ imageUrls: string[] }>(`/products/photo`);
}

export async function createProduct(storeId: number, data: CreateProductDto) {
  return isDev
    ? generateMockProductDetail()
    : httpClient.post<ProductDetail>(`/stores/${storeId}/products`, data);
}

export async function updateProduct(storeId: number, productId: number, data: UpdateProductDto) {
  return isDev
    ? generateMockProductDetail()
    : httpClient.patch<ProductDetail>(`/stores/${storeId}/products/${productId}`, data);
}

export async function deleteProduct(storeId: number, productId: number) {
  return httpClient.delete<void>(`/stores/${storeId}/products/${productId}`);
}
