import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/libs/api/query-keys';
import { StoreDetail, StoreSummary } from '@/libs/stores/types';
import {
  CreateAddressDto,
  CreateStoreBasicDto,
  CreateStoreLogoDto,
  CreateStoreTagsDto,
  CreateStoreWorkingHoursDto,
} from '@/libs/stores/schemas';
import {
  fetchDiscoverableStores,
  fetchFeaturedStores,
  fetchStoreDetails,
  fetchUserStores,
  submitStoreAddressUpdate,
  submitStoreBasicInfo,
  submitStoreLogoUpload,
  submitStoreTagsSelection,
  submitStoreWorkingHours,
} from '@/libs/stores/api';

export function useUserStoresQuery() {
  return useQuery<StoreSummary[]>({
    queryKey: queryKeys.stores.my,
    queryFn: fetchUserStores,
  });
}

export function useStoreDetailsQuery(storeId: string) {
  return useQuery<StoreDetail>({
    queryKey: queryKeys.stores.detail(storeId),
    queryFn: () => fetchStoreDetails(storeId),
  });
}

export function useDiscoverableStoresQuery() {
  return useQuery<StoreSummary[]>({
    queryKey: queryKeys.stores.discover,
    queryFn: fetchDiscoverableStores,
  });
}

export function useFeaturedStoresQuery() {
  return useQuery<StoreSummary[]>({
    queryKey: queryKeys.stores.featured,
    queryFn: fetchFeaturedStores,
  });
}

export function useSubmitStoreBasicInfoMutation() {
  return useMutation<StoreDetail, Error, CreateStoreBasicDto>({
    mutationFn: (data) => submitStoreBasicInfo(data),
  });
}

export function useSubmitStoreAddressMutation(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateAddressDto) => submitStoreAddressUpdate(storeId, data),
  });
}

export function useSubmitStoreTagsMutation(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateStoreTagsDto) => submitStoreTagsSelection(storeId, data),
  });
}

export function useSubmitStoreWorkingHoursMutation(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateStoreWorkingHoursDto) => submitStoreWorkingHours(storeId, data),
  });
}

export function useSubmitStoreLogoMutation(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateStoreLogoDto) => submitStoreLogoUpload(storeId, data),
  });
}
