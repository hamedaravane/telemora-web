import { UpdateContactLocationDto, UpdateProfileDto, UserPrivateProfile } from '@/libs/users/types';
import httpClient from '@/libs/common/http-client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isDev } from '@/utils';
import { generateMockUserPrivateProfile } from '@/libs/users/mocks';

async function sendTelegramInitData() {
  return httpClient.get<UserPrivateProfile>('/users/login');
}

async function updateProfile(telegramId: number | string, data: UpdateProfileDto) {
  return httpClient.patch<UserPrivateProfile>(`/users/profile/${telegramId}`, data);
}

async function updateLanguage(telegramId: number | string, languageCode: string) {
  return httpClient.patch<UserPrivateProfile>(`/users/language/${telegramId}`, { languageCode });
}

async function updateContactLocation(telegramId: number | string, data: UpdateContactLocationDto) {
  return httpClient.patch<UserPrivateProfile>(`/users/contact-location/${telegramId}`, data);
}

export function useTelegramAuth() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => (isDev ? generateMockUserPrivateProfile() : sendTelegramInitData()),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: ({ telegramId, data }: { telegramId: number | string; data: UpdateProfileDto }) =>
      updateProfile(telegramId, data),
  });
}

export function useUpdateLanguage() {
  return useMutation({
    mutationFn: ({
      telegramId,
      languageCode,
    }: {
      telegramId: number | string;
      languageCode: string;
    }) => (isDev ? generateMockUserPrivateProfile() : updateLanguage(telegramId, languageCode)),
  });
}

export function useUpdateContactLocation() {
  return useMutation({
    mutationFn: ({
      telegramId,
      data,
    }: {
      telegramId: number | string;
      data: UpdateContactLocationDto;
    }) => (isDev ? generateMockUserPrivateProfile() : updateContactLocation(telegramId, data)),
  });
}
