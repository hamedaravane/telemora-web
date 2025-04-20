import {
  CreateAddressDto,
  CreateStoreBasicDto,
  CreateStoreLogoDto,
  CreateStoreTagsDto,
  CreateStoreWorkingHoursDto,
  StoreDetail,
  StoreSummary,
} from '@/libs/stores/types';
import httpClient from '@/libs/common/http-client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isDev } from '@/utils';
import { generateMockStoreDetail, generateMockStoreSummaries } from '@/libs/stores/mocks';

async function getMyStores() {
  return httpClient.get<StoreSummary[]>('/stores/my');
}

async function getStoreDetails(storeId: string) {
  return httpClient.get<StoreDetail>(`/stores/${storeId}`);
}

async function discoverStores() {
  return httpClient.get<StoreSummary[]>('/stores/discover');
}

async function getFeaturedStores() {
  return httpClient.get<StoreSummary[]>('/stores/featured');
}

export async function createBasicInfo(data: CreateStoreBasicDto) {
  return httpClient.post<StoreDetail>('/stores/create/basic', data);
}

export async function updateStoreLocation(data: CreateAddressDto) {
  return httpClient.post<StoreDetail>('/stores/create/location', data);
}

export async function selectStoreTags(data: CreateStoreTagsDto) {
  return httpClient.post<StoreDetail>('/stores/create/tags', data);
}

export async function setStoreWorkingHours(data: CreateStoreWorkingHoursDto) {
  return httpClient.post<StoreDetail>('/stores/create/working_hour', data);
}

export async function uploadStoreLogo(data: CreateStoreLogoDto) {
  const formData = new FormData();
  if (data.logoFile) {
    const fileBlob = new Blob([data.logoFile], { type: 'image/*' });
    formData.append('logo', fileBlob);
    return httpClient.post<StoreDetail>('/stores/create/logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } else throw new Error('No file provided');
}

export function useMyStores() {
  return useQuery<StoreSummary[]>({
    queryKey: ['stores', 'my'],
    queryFn: isDev ? generateMockStoreSummaries : getMyStores,
  });
}

export function useStoreDetails(storeId: string) {
  return useQuery<StoreDetail>({
    queryKey: ['stores', storeId],
    queryFn: () => (isDev ? generateMockStoreDetail() : getStoreDetails(storeId)),
  });
}

export function useDiscoverStores() {
  return useQuery<StoreSummary[]>({
    queryKey: ['stores', 'discover'],
    queryFn: isDev ? generateMockStoreSummaries : discoverStores,
  });
}

export function useFeaturedStores() {
  return useQuery<StoreSummary[]>({
    queryKey: ['stores', 'featured'],
    queryFn: isDev ? generateMockStoreSummaries : getFeaturedStores,
  });
}

export function useCreateBasicInfo() {
  return useMutation({
    mutationFn: (data: CreateStoreBasicDto) =>
      isDev ? generateMockStoreDetail() : createBasicInfo(data),
  });
}

export function useUpdateStoreLocation() {
  return useMutation({
    mutationFn: (data: CreateAddressDto) =>
      isDev ? generateMockStoreDetail() : updateStoreLocation(data),
  });
}

export function useSelectStoreTags() {
  return useMutation({
    mutationFn: (data: CreateStoreTagsDto) =>
      isDev ? generateMockStoreDetail() : selectStoreTags(data),
  });
}

export function useSetStoreWorkingHours() {
  return useMutation({
    mutationFn: (data: CreateStoreWorkingHoursDto) =>
      isDev ? generateMockStoreDetail() : setStoreWorkingHours(data),
  });
}

export function useUploadStoreLogo() {
  return useMutation({
    mutationFn: (data: CreateStoreLogoDto) =>
      isDev ? generateMockStoreDetail() : uploadStoreLogo(data),
  });
}
