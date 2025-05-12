import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/libs/common/api/query-keys';
import {
  createProduct,
  deleteProduct,
  getProductDetails,
  getStoreProducts,
  updateProduct,
  uploadProductPhotos,
} from '@/libs/products/api';
import { CreateProductFormData, UpdateProductFormData } from '@/libs/products/schemas';

export function useStoreProducts(storeId: number) {
  return useQuery({
    queryKey: queryKeys.products.byStore(storeId),
    queryFn: () => getStoreProducts(storeId),
    enabled: !!storeId,
  });
}

export function useProductDetails(storeId: number, productId: number) {
  return useQuery({
    queryKey: queryKeys.products.detail(storeId, productId),
    queryFn: () => getProductDetails(storeId, productId),
    enabled: !!storeId && !!productId,
  });
}

export function useUploadProductPhotosMutation(storeId: number, productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: File[]) => uploadProductPhotos(storeId, productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(storeId, productId) });
    },
  });
}

export function useCreateProductMutation(storeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductFormData) => createProduct(storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byStore(storeId) });
    },
  });
}

export function useUpdateProductMutation(storeId: number, productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductFormData) => updateProduct(storeId, productId, data),
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
