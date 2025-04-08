import { CreateProductDto, ProductDetail } from '@/libs/products/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { generateMockProductDetail } from '@/libs/products/mocks';
import httpClient from '@/libs/common/http-client';

export function useGetProductById(id: number | null) {
  return useQuery<ProductDetail>({
    queryKey: ['getProductById', id],
    queryFn: () => generateMockProductDetail(id!),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: id !== null,
  });
}

export async function createProduct(form: CreateProductDto): Promise<ProductDetail> {
  return httpClient.post(`/products`, form);
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries({ queryKey: ['stores-products'] });
    },
  });
}
