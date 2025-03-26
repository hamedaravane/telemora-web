import axios from 'axios';
import {
  CreateStoreBasicDto,
  CreateStoreCategoryDto,
  CreateStoreLocationDto,
  CreateStoreLogoDto,
  CreateStoreWorkingHoursDto,
  Store,
} from '@/libs/stores/types';
import { useQuery } from '@tanstack/react-query';
import { generateMockStore, generateMockStores } from '@/libs/stores/mocks';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchStores = async (): Promise<Store[]> => {
  const response = await axios.get(`${API_BASE_URL}/stores`);
  return response.data;
};

export const fetchMockStores = async (): Promise<Store[]> => {
  return generateMockStores(2);
};

export function useStoresData() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: fetchMockStores,
  });
}

export const fetchStoreById = async (id: number): Promise<Store> => {
  const response = await axios.get(`${API_BASE_URL}/stores/${id}`);
  return response.data;
};

export const fetchMockStoreById = async (id: number): Promise<Store> => {
  return generateMockStore(id);
};

export function useSingleStoreDataById(id: number) {
  return useQuery({
    queryKey: ['store', id],
    queryFn: () => fetchMockStoreById(id),
  });
}

export const createBasicInfo = async (data: CreateStoreBasicDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/basic`, data);
  return response.data;
};

export const updateStoreLocation = async (data: CreateStoreLocationDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/location`, data);
  return response.data;
};

export const selectStoreCategory = async (data: CreateStoreCategoryDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/category`, data);
  return response.data;
};

export const setStoreWorkingHours = async (data: CreateStoreWorkingHoursDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/working_hour`, data);
  return response.data;
};

export const uploadStoreLogo = async (data: CreateStoreLogoDto) => {
  const formData = new FormData();
  if (data.logoUrl) {
    const fileBlob = new Blob([data.logoUrl], { type: 'image/*' });
    formData.append('logo', fileBlob);
    const response = await axios.post(`${API_BASE_URL}/stores/create/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } else throw new Error('No file provided');
};
