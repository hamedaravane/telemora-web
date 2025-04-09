import { UpdateContactLocationDto, UpdateProfileDto, UserPrivateProfile } from '@/libs/users/types';
import httpClient from '@/libs/common/http-client';
import { useMutation } from '@tanstack/react-query';

async function sendTelegramInitData(initData: string) {
  return httpClient.post<UserPrivateProfile>(`/users/init-data`, { initData });
}

async function updateProfile(telegramId: number | string, data: UpdateProfileDto) {
  return httpClient.patch<UserPrivateProfile>(`/users/profile/${telegramId}`, { data });
}

async function updateLanguage(telegramId: number | string, languageCode: string) {
  return httpClient.patch<UserPrivateProfile>(`/users/language/${telegramId}`, { languageCode });
}

async function updateContactLocation(telegramId: number | string, data: UpdateContactLocationDto) {
  return httpClient.patch<UserPrivateProfile>(`/users/contact-location/${telegramId}`, { data });
}

export function useSendTelegramInitData() {
  return useMutation({
    mutationFn: (initData: string) => sendTelegramInitData(initData),
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
    }) => updateLanguage(telegramId, languageCode),
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
    }) => updateContactLocation(telegramId, data),
  });
}
