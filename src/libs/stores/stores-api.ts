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

async function fetchUserStores() {
  return httpClient.get<StoreSummary[]>('/stores/my');
}

async function fetchStoreDetails(storeId: string) {
  return httpClient.get<StoreDetail>(`/stores/${storeId}`);
}

async function fetchDiscoverableStores() {
  return httpClient.get<StoreSummary[]>('/stores/discover');
}

async function fetchFeaturedStores() {
  return httpClient.get<StoreSummary[]>('/stores/featured');
}

export async function submitStoreBasicInfo(data: CreateStoreBasicDto) {
  return httpClient.post<StoreDetail>('/stores/create/basic', data);
}

export async function submitStoreAddressUpdate(storeId: string, data: CreateAddressDto) {
  return httpClient.patch<StoreDetail>(`/stores/${storeId}/address`, data);
}

export async function submitStoreTagsSelection(storeId: string, data: CreateStoreTagsDto) {
  return httpClient.patch<StoreDetail>(`/stores/${storeId}/tags`, data);
}

export async function submitStoreWorkingHours(storeId: string, data: CreateStoreWorkingHoursDto) {
  return httpClient.patch<StoreDetail>(`/stores/${storeId}/working_hours`, data);
}

export async function submitStoreUpdate(
  storeId: string,
  data: UpdateStoreDto,
): Promise<StoreDetail> {
  return httpClient.patch<StoreDetail>(`/stores/${storeId}`, data);
}

export async function submitStoreLogoUpload(storeId: string, data: CreateStoreLogoDto) {
  const formData = new FormData();
  if (data.logoFile) {
    const fileBlob = new Blob([data.logoFile], { type: 'image/*' });
    formData.append('logo', fileBlob);
    return httpClient.post<StoreDetail>(`/stores/${storeId}/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } else throw new Error('No file provided');
}

export function useUserStoresQuery() {
  return useQuery<StoreSummary[]>({
    queryKey: ['stores', 'my'],
    queryFn: isDev ? generateMockStoreSummaries : fetchUserStores,
  });
}

export function useStoreDetailsQuery(storeId: string) {
  return useQuery<StoreDetail>({
    queryKey: ['stores', storeId],
    queryFn: () => (isDev ? generateMockStoreDetail() : fetchStoreDetails(storeId)),
  });
}

export function useDiscoverableStoresQuery() {
  return useQuery<StoreSummary[]>({
    queryKey: ['stores', 'discover'],
    queryFn: isDev ? generateMockStoreSummaries : fetchDiscoverableStores,
  });
}

export function useFeaturedStoresQuery() {
  return useQuery<StoreSummary[]>({
    queryKey: ['stores', 'featured'],
    queryFn: isDev ? generateMockStoreSummaries : fetchFeaturedStores,
  });
}

export function useSubmitStoreBasicInfoMutation() {
  return useMutation<StoreDetail, Error, CreateStoreBasicDto>({
    mutationFn: (data) => submitStoreBasicInfo(data),
  });
}

export function useSubmitStoreAddressMutation(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateAddressDto) =>
      isDev ? generateMockStoreDetail() : submitStoreAddressUpdate(storeId, data),
  });
}

export function useSubmitStoreTagsMutation(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateStoreTagsDto) =>
      isDev ? generateMockStoreDetail() : submitStoreTagsSelection(storeId, data),
  });
}

export function useSubmitStoreWorkingHoursMutation(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateStoreWorkingHoursDto) =>
      isDev ? generateMockStoreDetail() : submitStoreWorkingHours(storeId, data),
  });
}

export function useSubmitStoreLogoMutation(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateStoreLogoDto) =>
      isDev ? generateMockStoreDetail() : submitStoreLogoUpload(storeId, data),
  });
}
