import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/libs/common/api/query-keys';
import { CanonicalLocation, NearestLocationResponse } from '@/libs/location/types';
import {
  getCitiesByState,
  getCountries,
  getNearestLocation,
  getStatesByCountry,
} from '@/libs/location/api';

export function useCountries() {
  return useQuery<CanonicalLocation[]>({
    queryKey: queryKeys.location.countries,
    queryFn: getCountries,
  });
}

export function useStatesByCountry(countryId?: number) {
  return useQuery<CanonicalLocation[]>({
    queryKey: queryKeys.location.statesByCountry(countryId!),
    queryFn: () => getStatesByCountry(countryId!),
    enabled: !!countryId,
  });
}

export function useCitiesByState(stateId?: number) {
  return useQuery<CanonicalLocation[]>({
    queryKey: queryKeys.location.citiesByState(stateId!),
    queryFn: () => getCitiesByState(stateId!),
    enabled: !!stateId,
  });
}

export function useNearestLocation(lat?: number, lng?: number) {
  return useQuery<NearestLocationResponse>({
    queryKey: queryKeys.location.nearest(lat!, lng!),
    queryFn: () => getNearestLocation(lat!, lng!),
    enabled: !!lat && !!lng,
  });
}
