import axios from 'axios';
import {
  CreateAddressDto,
  CreateStoreBasicDto,
  CreateStoreLogoDto,
  CreateStoreTagsDto,
  CreateStoreWorkingHoursDto,
  StoreDetail,
  StoreSummary,
} from '@/libs/stores/types';
import { useQuery } from '@tanstack/react-query';
import { generateMockStoreDetail, generateMockStoreSummary } from '@/libs/stores/mocks';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchStores = async (): Promise<StoreSummary[]> => {
  const response = await axios.get(`${API_BASE_URL}/stores`);
  return response.data;
};

export const fetchMockStores = async (): Promise<StoreSummary[]> => {
  return Array.from({ length: 2 }, () => generateMockStoreSummary());
};

export function useStoresData() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: fetchMockStores,
  });
}

export const fetchStoreById = async (id: number): Promise<StoreDetail> => {
  const response = await axios.get(`${API_BASE_URL}/stores/${id}`);
  return response.data;
};

export const fetchMockStoreById = async (): Promise<StoreDetail> => {
  return generateMockStoreDetail();
};

export function useSingleStoreDataById(id: number) {
  return useQuery({
    queryKey: ['store', id],
    queryFn: () => fetchMockStoreById(),
  });
}

export const createBasicInfo = async (data: CreateStoreBasicDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/basic`, data);
  return response.data;
};

export const updateStoreLocation = async (data: CreateAddressDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/location`, data);
  return response.data;
};

export const selectStoreCategory = async (data: CreateStoreTagsDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/category`, data);
  return response.data;
};

export const setStoreWorkingHours = async (data: CreateStoreWorkingHoursDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/working_hour`, data);
  return response.data;
};

export const uploadStoreLogo = async (data: CreateStoreLogoDto) => {
  const formData = new FormData();
  if (data.logoFile) {
    const fileBlob = new Blob([data.logoFile], { type: 'image/*' });
    formData.append('logo', fileBlob);
    const response = await axios.post(`${API_BASE_URL}/stores/create/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } else throw new Error('No file provided');
};
