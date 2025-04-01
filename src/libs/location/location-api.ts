import { useQuery } from '@tanstack/react-query';
import { CanonicalLocation } from './types';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCountries = async (): Promise<CanonicalLocation[]> => {
  const res = await axios.get(`${API_BASE_URL}/locations/countries`);
  return res.data;
};

export function useCountries() {
  return useQuery<CanonicalLocation[]>({
    queryKey: ['countries'],
    queryFn: fetchCountries,
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
    queryFn: () => fetchStates(countryId),
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
    queryFn: () => fetchCities(stateId),
    enabled: !!stateId,
    staleTime: 1000 * 60 * 30, 
  });
}
