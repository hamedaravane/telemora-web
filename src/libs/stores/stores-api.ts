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
import httpClient from '@/libs/common/http-client';

export const fetchStores = async () => {
  return httpClient.get<StoreSummary[]>('/stores');
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

export const fetchStoreById = async (id: number) => {
  return httpClient.get<StoreDetail>(`/stores/${id}`);
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
  return httpClient.post<StoreDetail>('/stores/create/basic', data);
};

export const updateStoreLocation = async (data: CreateAddressDto) => {
  return httpClient.post<StoreDetail>('/stores/create/location', data);
};

export const selectStoreTags = async (data: CreateStoreTagsDto) => {
  return httpClient.post<StoreDetail>('/stores/create/tags', data);
};

export const setStoreWorkingHours = async (data: CreateStoreWorkingHoursDto) => {
  return httpClient.post<StoreDetail>('/stores/create/working_hour', data);
};

export const uploadStoreLogo = async (data: CreateStoreLogoDto) => {
  const formData = new FormData();
  if (data.logoFile) {
    const fileBlob = new Blob([data.logoFile], { type: 'image/*' });
    formData.append('logo', fileBlob);
    return httpClient.post('/stores/create/logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } else throw new Error('No file provided');
};
