import { useQuery } from '@tanstack/react-query';
import { CanonicalLocation, NearestLocationResponse } from '@/libs/location/types';
import {
  getCitiesByState,
  getCountries,
  getNearestLocation,
  getStatesByCountry,
} from '@/libs/location/api';

export function useCountries() {
  return useQuery<CanonicalLocation[]>({
    queryKey: ['countries'],
    queryFn: getCountries,
  });
}

export function useStatesByCountry(countryId?: number) {
  return useQuery<CanonicalLocation[]>({
    queryKey: ['states', countryId],
    queryFn: () => getStatesByCountry(countryId!),
    enabled: !!countryId,
  });
}

export function useCitiesByState(stateId?: number) {
  return useQuery<CanonicalLocation[]>({
    queryKey: ['cities', stateId],
    queryFn: () => getCitiesByState(stateId!),
    enabled: !!stateId,
  });
}

export function useNearestLocation(lat?: number, lng?: number) {
  return useQuery<NearestLocationResponse>({
    queryKey: ['nearest-location', lat, lng],
    queryFn: () => getNearestLocation(lat!, lng!),
    enabled: !!lat && !!lng,
  });
}
