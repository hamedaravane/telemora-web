import { useQuery } from '@tanstack/react-query';
import { CanonicalLocation, NearestLocationResponse } from './types';
import {
  generateMockCities,
  generateMockCountries,
  generateMockStates,
} from '@/libs/location/mocks';
import httpClient from '@/libs/common/http-client';

export async function getCountries() {
  return httpClient.get<CanonicalLocation[]>(`/locations/countries`);
}

export async function getStatesByCountry(countryId: number) {
  return httpClient.get<CanonicalLocation[]>(`countries/${countryId}/states`);
}

export async function getCitiesByState(stateId: number) {
  return httpClient.get<CanonicalLocation[]>(`states/${stateId}/cities`);
}

export async function getNearestLocation(lat: number, lng: number) {
  return httpClient
    .get<NearestLocationResponse>(`/locations/nearest?lat=${lat}&lng=${lng}`)
    .catch((e) => {
      throw new Error(e);
    });
}

export function useCountries() {
  return useQuery<CanonicalLocation[]>({
    queryKey: ['countries'],
    queryFn: generateMockCountries,
    staleTime: 1000 * 60 * 60,
  });
}

export function useStates(countryId?: number) {
  return useQuery<CanonicalLocation[]>({
    queryKey: ['states', countryId],
    queryFn: () => generateMockStates(),
    enabled: !!countryId,
    staleTime: 1000 * 60 * 30,
  });
}

export function useCities(stateId?: number) {
  return useQuery<CanonicalLocation[]>({
    queryKey: ['cities', stateId],
    queryFn: () => generateMockCities(),
    enabled: !!stateId,
    staleTime: 1000 * 60 * 30,
  });
}
