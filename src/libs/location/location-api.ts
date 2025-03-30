/*
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchCountries = async (): Promise<Country[]> => {
  const res = await axios.get(`${API_BASE_URL}/locations/countries`);
  return res.data;
};

const fetchStates = async (countryId: number): Promise<State[]> => {
  const res = await axios.get(`${API_BASE_URL}/locations/states`, {
    params: { countryId },
  });
  return res.data;
};

const fetchCities = async (stateId: number): Promise<City[]> => {
  const res = await axios.get(`${API_BASE_URL}/locations/cities`, {
    params: { stateId },
  });
  return res.data;
};

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useStates(countryId?: number) {
  return useQuery({
    queryKey: ['states', countryId],
    queryFn: () => fetchStates(countryId!),
    enabled: !!countryId,
    staleTime: 1000 * 60 * 30, // 30 min
  });
}

export function useCities(stateId?: number) {
  return useQuery({
    queryKey: ['cities', stateId],
    queryFn: () => fetchCities(stateId!),
    enabled: !!stateId,
    staleTime: 1000 * 60 * 30,
  });
}
*/
