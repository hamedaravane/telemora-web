import axios from 'axios';
import { CreateProductDto, Product, UpdateProductDto } from '@/libs/products/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createProducts = async (data: CreateProductDto): Promise<Product> => {
  const response = await axios.post(`${API_BASE_URL}/products`, data);

  return response.data;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_BASE_URL}/products`);

  return response.data;
};

export const getProductsById = async (id: string | number): Promise<Product> => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);

  return response.data;
};

export const updateProducts = async (
  id: string | number,
  data: UpdateProductDto,
): Promise<Product> => {
  const response = await axios.patch(`${API_BASE_URL}/products/${id}`, data);

  return response.data;
};

export const deleteProducts = async (id: string | number): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`);

  return response.data;
};
