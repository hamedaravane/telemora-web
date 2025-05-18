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
    : httpClient.get<ProductPreview[]>(`/products/${storeId}`);
}

export async function getProductDetails(storeId: number, productId: number) {
  return isDev
    ? generateMockProductDetail()
    : httpClient.get<ProductDetail>(`/products/store/${storeId}/${productId}`);
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
    : httpClient.post<ProductDetail>(`/products/store/${storeId}/create`, data);
}

export async function updateProduct(storeId: number, productId: number, data: UpdateProductDto) {
  return isDev
    ? generateMockProductDetail()
    : httpClient.patch<ProductDetail>(`/products/store/${storeId}/${productId}/update`, data);
}

export async function deleteProduct(storeId: number, productId: number) {
  return httpClient.delete<void>(`/products/store/${storeId}/${productId}/delete`);
}
