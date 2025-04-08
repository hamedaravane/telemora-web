import { useQuery } from '@tanstack/react-query';
import { CanonicalLocation, NearestLocationResponse } from './types';
import {
  generateMockCities,
  generateMockCountries,
  generateMockStates,
} from '@/libs/location/mocks';
import httpClient from '@/libs/common/http-client';

export const fetchCountries = async (): Promise<CanonicalLocation[]> => {
  return httpClient.get(`/locations/countries`);
};

export function useCountries() {
  return useQuery<CanonicalLocation[]>({
    queryKey: ['countries'],
    queryFn: generateMockCountries,
    staleTime: 1000 * 60 * 60,
  });
}

export const fetchStates = async (countryId?: number): Promise<CanonicalLocation[]> => {
  if (!countryId) return [];
  return httpClient.get(`/locations/states?countryId=${countryId}`);
};

export function useStates(countryId?: number) {
  return useQuery<CanonicalLocation[]>({
    queryKey: ['states', countryId],
    queryFn: () => generateMockStates(),
    enabled: !!countryId,
    staleTime: 1000 * 60 * 30,
  });
}

export const fetchCities = async (stateId?: number): Promise<CanonicalLocation[]> => {
  if (!stateId) return [];
  return httpClient.get(`/locations/cities?stateId=${stateId}`);
};

export function useCities(stateId?: number) {
  return useQuery<CanonicalLocation[]>({
    queryKey: ['cities', stateId],
    queryFn: () => generateMockCities(),
    enabled: !!stateId,
    staleTime: 1000 * 60 * 30,
  });
}

export async function getNearestLocation(lat: number, lng: number) {
  return httpClient
    .get<NearestLocationResponse>(`/locations/nearest?lat=${lat}&lng=${lng}`)
    .catch(() => {
      throw new Error('Unable to resolve location from coordinates.');
    });
}
