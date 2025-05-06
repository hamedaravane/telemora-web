import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/libs/common/api/query-keys';
import { createProduct, deleteProduct, getProductDetails, getStoreProducts, updateProduct } from '@/libs/products/api';
import { generateMockProductDetail, generateMockProductPreviews } from '@/libs/products/mocks';
import { CreateProductFormData, UpdateProductFormData } from '@/libs/products/schemas';
import { isDev } from '../../common/utils';

export function useStoreProducts(storeId: number) {
  return useQuery({
    queryKey: queryKeys.products.byStore(storeId),
    queryFn: () => (isDev ? generateMockProductPreviews() : getStoreProducts(storeId)),
    enabled: !!storeId,
  });
}

export function useProductDetails(storeId: number, productId: number) {
  return useQuery({
    queryKey: queryKeys.products.detail(storeId, productId),
    queryFn: () => (isDev ? generateMockProductDetail(1) : getProductDetails(storeId, productId)),
    enabled: !!storeId && !!productId,
  });
}

export function useCreateProductMutation(storeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductFormData) =>
      isDev ? generateMockProductDetail(storeId) : createProduct(storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byStore(storeId) });
    },
  });
}

export function useUpdateProductMutation(storeId: number, productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductFormData) =>
      isDev ? generateMockProductDetail(storeId) : updateProduct(storeId, productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(storeId, productId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byStore(storeId) });
    },
  });
}

export function useDeleteProductMutation(storeId: number, productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct(storeId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byStore(storeId) });
    },
  });
}
