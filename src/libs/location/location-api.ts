import { useQuery } from '@tanstack/react-query';
import { CanonicalLocation, NearestLocationResponse } from './types';
import httpClient from '@/libs/common/http-client';

async function getCountries() {
  return httpClient.get<CanonicalLocation[]>(`/locations/countries`);
}

async function getStatesByCountry(countryId: number) {
  return httpClient.get<CanonicalLocation[]>(`countries/${countryId}/states`);
}

async function getCitiesByState(stateId: number) {
  return httpClient.get<CanonicalLocation[]>(`states/${stateId}/cities`);
}

async function getNearestLocation(lat: number, lng: number) {
  return httpClient
    .get<NearestLocationResponse>(`/locations/nearest?lat=${lat}&lng=${lng}`)
    .catch((e) => {
      throw new Error(e);
    });
}

export function useCountries() {
  return useQuery<CanonicalLocation[]>({
    queryKey: ['countries'],
    queryFn: getCountries,
  });
}

/* TODO: Hooks like useStatesByCountry(countryId) pass undefined to the query key, which still fires a request */
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
