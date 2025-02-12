import axios from 'axios';
import { CreateStoreDto, Store, UpdateStoreDto } from '@/libs/stores/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createStores = async (data: CreateStoreDto): Promise<Store> => {
  const response = await axios.post(`${API_BASE_URL}/stores`, data);

  return response.data;
};

export const getAllStores: () => Promise<CreateStoreDto[]> = async (): Promise<Store[]> => {
  const response = await axios.get(`${API_BASE_URL}/stores`);

  return response.data;
};

export const getStoresById = async (id: string | number): Promise<Store> => {
  const response = await axios.get(`${API_BASE_URL}/stores/${id}`);

  return response.data;
};

export const updateStores = async (id: string | number, data: UpdateStoreDto): Promise<Store> => {
  const response = await axios.patch(`${API_BASE_URL}/stores/${id}`, data);

  return response.data;
};

export const deleteStores = async (id: string | number): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/stores/${id}`);

  return response.data;
};
