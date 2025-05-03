import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateProductFormData, UpdateProductFormData } from '@/libs/products/schemas';
import {
  createProduct,
  deleteProduct,
  getProductDetails,
  getStoreProducts,
  updateProduct,
} from '@/libs/products/api';
import { isDev } from '@/utils';
import { generateMockProductDetail, generateMockProductPreviews } from '@/libs/products/mocks';

export function useStoreProducts(storeId: number) {
  return useQuery({
    queryKey: ['store-components', storeId],
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

export function useCreateProductMutation(storeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductFormData) =>
      isDev ? generateMockProductDetail(storeId) : createProduct(storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store-components', storeId] });
    },
  });
}

export function useUpdateProductMutation(storeId: number, productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductFormData) =>
      isDev ? generateMockProductDetail(storeId) : updateProduct(storeId, productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-details', storeId, productId] });
      queryClient.invalidateQueries({ queryKey: ['store-components', storeId] });
    },
  });
}

export function useDeleteProductMutation(storeId: number, productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct(storeId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store-components', storeId] });
    },
  });
}
