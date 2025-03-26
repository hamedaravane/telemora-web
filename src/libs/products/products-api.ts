import { CreateProductDto, ProductDetail } from '@/libs/products/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { generateMockProductDetail } from '@/libs/products/mocks';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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
  const response = await axios.post(`${API_BASE_URL}/products`, form);
  return response.data;
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
