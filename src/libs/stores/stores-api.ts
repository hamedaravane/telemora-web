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

async function getMyStores() {
  return httpClient.get<StoreSummary[]>('/stores/my');
}

async function discoverStores() {
  return httpClient.get<StoreSummary[]>('/stores/discover');
}

async function getFeaturedStores() {
  return httpClient.get<StoreSummary[]>('/stores/featured');
}

async function createBasicInfo(data: CreateStoreBasicDto) {
  return httpClient.post<StoreDetail>('/stores/create/basic', data);
}

async function updateStoreLocation(data: CreateAddressDto) {
  return httpClient.post<StoreDetail>('/stores/create/location', data);
}

async function selectStoreTags(data: CreateStoreTagsDto) {
  return httpClient.post<StoreDetail>('/stores/create/tags', data);
}

async function setStoreWorkingHours(data: CreateStoreWorkingHoursDto) {
  return httpClient.post<StoreDetail>('/stores/create/working_hour', data);
}

async function uploadStoreLogo(data: CreateStoreLogoDto) {
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
    queryFn: getMyStores,
  });
}

export function useDiscoverStores() {
  return useQuery<StoreSummary[]>({
    queryKey: ['stores', 'discover'],
    queryFn: discoverStores,
  });
}

export function useFeaturedStores() {
  return useQuery<StoreSummary[]>({
    queryKey: ['stores', 'featured'],
    queryFn: getFeaturedStores,
  });
}

export function useCreateBasicInfo() {
  return useMutation({
    mutationFn: (data: CreateStoreBasicDto) => createBasicInfo(data),
  });
}

export function useUpdateStoreLocation() {
  return useMutation({
    mutationFn: (data: CreateAddressDto) => updateStoreLocation(data),
  });
}

export function useSelectStoreTags() {
  return useMutation({
    mutationFn: (data: CreateStoreTagsDto) => selectStoreTags(data),
  });
}

export function useSetStoreWorkingHours() {
  return useMutation({
    mutationFn: (data: CreateStoreWorkingHoursDto) => setStoreWorkingHours(data),
  });
}

export function useUploadStoreLogo() {
  return useMutation({
    mutationFn: (data: CreateStoreLogoDto) => uploadStoreLogo(data),
  });
}
