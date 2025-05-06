import httpClient from '@/libs/common/http-client';
import { generateMockStoreDetail, generateMockStoreSummaries } from '@/libs/stores/mocks';
import {
  CreateAddressDto,
  CreateStoreBasicDto,
  CreateStoreLogoDto,
  CreateStoreTagsDto,
  CreateStoreWorkingHoursDto,
  UpdateStoreDto,
} from '@/libs/stores/schemas';
import { StoreDetail, StoreSummary } from '@/libs/stores/types';
import { isDev } from '@/utils';

export async function fetchUserStores() {
  return isDev ? generateMockStoreSummaries() : httpClient.get<StoreSummary[]>('/stores/my');
}

export async function fetchStoreDetails(storeId: string) {
  return isDev ? generateMockStoreDetail() : httpClient.get<StoreDetail>(`/stores/${storeId}`);
}

export async function fetchDiscoverableStores() {
  return isDev ? generateMockStoreSummaries() : httpClient.get<StoreSummary[]>('/stores/discover');
}

export async function fetchFeaturedStores() {
  return isDev ? generateMockStoreSummaries() : httpClient.get<StoreSummary[]>('/stores/featured');
}

export async function submitStoreBasicInfo(data: CreateStoreBasicDto) {
  return isDev
    ? generateMockStoreDetail()
    : httpClient.post<StoreDetail>('/stores/create/basic', data);
}

export async function submitStoreAddressUpdate(storeId: string, data: CreateAddressDto) {
  return isDev
    ? generateMockStoreDetail()
    : httpClient.patch<StoreDetail>(`/stores/${storeId}/address`, data);
}

export async function submitStoreTagsSelection(storeId: string, data: CreateStoreTagsDto) {
  return isDev
    ? generateMockStoreDetail()
    : httpClient.patch<StoreDetail>(`/stores/${storeId}/tags`, data);
}

export async function submitStoreWorkingHours(storeId: string, data: CreateStoreWorkingHoursDto) {
  return isDev
    ? generateMockStoreDetail()
    : httpClient.patch<StoreDetail>(`/stores/${storeId}/working_hours`, data);
}

export async function submitStoreUpdate(storeId: string, data: UpdateStoreDto) {
  return isDev
    ? generateMockStoreDetail()
    : httpClient.patch<StoreDetail>(`/stores/${storeId}`, data);
}

export async function submitStoreLogoUpload(storeId: string, data: CreateStoreLogoDto) {
  const formData = new FormData();
  if (data.logoFile) {
    const fileBlob = new Blob([data.logoFile], { type: 'image/*' });
    formData.append('logo', fileBlob);
    return isDev
      ? generateMockStoreDetail()
      : httpClient.post<StoreDetail>(`/stores/${storeId}/logo`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  } else throw new Error('No file provided');
}
