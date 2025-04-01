import { useQuery } from '@tanstack/react-query';
import { CanonicalLocation, NearestLocationResponse } from './types';
import axios from 'axios';
import { generateMockCities, generateMockCountries, generateMockStates } from '@/libs/location/mocks';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCountries = async (): Promise<CanonicalLocation[]> => {
  const res = await axios.get(`${API_BASE_URL}/locations/countries`);
  return res.data;
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
  const res = await axios.get(`${API_BASE_URL}/locations/states?countryId=${countryId}`);
  return res.data;
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
  const res = await axios.get(`${API_BASE_URL}/locations/cities?stateId=${stateId}`);
  return res.data;
};

export function useCities(stateId?: number) {
  return useQuery<CanonicalLocation[]>({
    queryKey: ['cities', stateId],
    queryFn: () => generateMockCities(),
    enabled: !!stateId,
    staleTime: 1000 * 60 * 30,
  });
}

export async function getNearestLocation(lat: number, lng: number): Promise<NearestLocationResponse> {
  const res = await fetch(
    `${API_BASE_URL}/locations/nearest?lat=${lat}&lng=${lng}`,
  );

  if (!res.ok) {
    throw new Error('Unable to resolve location from coordinates.');
  }

  return res.json();
}
