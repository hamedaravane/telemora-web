import {
  CreateProductDto,
  ProductDetail,
  ProductPreview,
  UpdateProductDto,
} from '@/libs/products/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpClient from '@/libs/common/http-client';
import { isDev } from '@/utils';
import { generateMockProductDetail, generateMockProductPreviews } from '@/libs/products/mocks';

async function getStoreProducts(storeId: number) {
  return httpClient.get<ProductPreview[]>(`/stores/${storeId}/products`);
}

async function getProductDetails(storeId: number, productId: number) {
  return httpClient.get<ProductDetail>(`/stores/${storeId}/products/${productId}`);
}

async function createProduct(storeId: number, data: CreateProductDto) {
  return httpClient.post<ProductDetail>(`/stores/${storeId}/products`, data);
}

async function updateProduct(storeId: number, productId: number, data: UpdateProductDto) {
  return httpClient.patch<ProductDetail>(`/stores/${storeId}/products/${productId}`, data);
}

async function deleteProduct(storeId: number, productId: number) {
  return httpClient.delete<void>(`/stores/${storeId}/products/${productId}`);
}

export function useStoreProducts(storeId: number) {
  return useQuery({
    queryKey: ['store-products', storeId],
    queryFn: () => (isDev ? generateMockProductPreviews() : getStoreProducts(storeId)),
    enabled: !!storeId,
  });
}

export function useProductDetails(storeId: number, productId: number) {
  return useQuery({
    queryKey: ['product-details', storeId, productId],
    queryFn: () => (isDev ? generateMockProductDetail(1) : getProductDetails(storeId, productId)),
    enabled: !!storeId && !!productId,
  });
}

export function useCreateProduct(storeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) =>
      isDev ? generateMockProductDetail(1) : createProduct(storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store-products', storeId] });
    },
  });
}

export function useUpdateProduct(storeId: number, productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductDto) =>
      isDev ? generateMockProductDetail(1) : updateProduct(storeId, productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-details', storeId, productId] });
      queryClient.invalidateQueries({ queryKey: ['store-products', storeId] });
    },
  });
}

export function useDeleteProduct(storeId: number, productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct(storeId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store-products', storeId] });
    },
  });
}
