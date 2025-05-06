import httpClient from '@/libs/common/utils/http-client';
import { generateMockCities, generateMockCountries, generateMockStates } from '@/libs/location/mocks';
import { isDev } from '../../common/utils';

import { CanonicalLocation, NearestLocationResponse } from '../types';

export async function getCountries() {
  return isDev
    ? generateMockCountries()
    : httpClient.get<CanonicalLocation[]>(`/locations/countries`);
}

export async function getStatesByCountry(countryId: number) {
  return isDev
    ? generateMockStates()
    : httpClient.get<CanonicalLocation[]>(`countries/${countryId}/states`);
}

export async function getCitiesByState(stateId: number) {
  return isDev
    ? generateMockCities()
    : httpClient.get<CanonicalLocation[]>(`states/${stateId}/cities`);
}

export async function getNearestLocation(lat: number, lng: number) {
  return httpClient.get<NearestLocationResponse>(`/locations/nearest?lat=${lat}&lng=${lng}`);
}
