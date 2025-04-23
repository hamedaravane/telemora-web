import {
  CreateAddressDto,
  CreateStoreBasicDto,
  CreateStoreLogoDto,
  CreateStoreTagsDto,
  CreateStoreWorkingHoursDto,
  StoreDetail,
  StoreSummary,
  UpdateStoreDto,
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

export async function updateStoreAddress(storeId: string, data: CreateAddressDto) {
  return httpClient.patch<StoreDetail>(`/stores/${storeId}/address`, data);
}

export async function selectStoreTags(storeId: string, data: CreateStoreTagsDto) {
  return httpClient.patch<StoreDetail>(`/stores/${storeId}/tags`, data);
}

export async function setStoreWorkingHours(storeId: string, data: CreateStoreWorkingHoursDto) {
  return httpClient.patch<StoreDetail>(`/stores/${storeId}/working_hours`, data);
}

export async function updateStore(storeId: string, data: UpdateStoreDto): Promise<StoreDetail> {
  return httpClient.patch<StoreDetail>(`/stores/${storeId}`, data);
}

export async function uploadStoreLogo(storeId: string, data: CreateStoreLogoDto) {
  const formData = new FormData();
  if (data.logoFile) {
    const fileBlob = new Blob([data.logoFile], { type: 'image/*' });
    formData.append('logo', fileBlob);
    return httpClient.post<StoreDetail>(`/stores/${storeId}/logo`, formData, {
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

export function useUpdateStoreLocation(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateAddressDto) =>
      isDev ? generateMockStoreDetail() : updateStoreAddress(storeId, data),
  });
}

export function useSelectStoreTags(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateStoreTagsDto) =>
      isDev ? generateMockStoreDetail() : selectStoreTags(storeId, data),
  });
}

export function useSetStoreWorkingHours(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateStoreWorkingHoursDto) =>
      isDev ? generateMockStoreDetail() : setStoreWorkingHours(storeId, data),
  });
}

export function useUploadStoreLogo(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateStoreLogoDto) =>
      isDev ? generateMockStoreDetail() : uploadStoreLogo(storeId, data),
  });
}
