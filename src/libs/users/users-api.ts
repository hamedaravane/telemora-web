import { UpdateContactLocationDto, UpdateProfileDto, UserPrivateProfile } from '@/libs/users/types';
import httpClient from '@/libs/common/http-client';

export async function sendTelegramInitData(initData: string) {
  return httpClient.post<UserPrivateProfile>(`/users/init-data`, { initData });
}

export async function updateProfile(telegramId: number | string, data: UpdateProfileDto) {
  return httpClient.patch<UserPrivateProfile>(`/users/profile/${telegramId}`, { data });
}

export async function updateLanguage(telegramId: number | string, languageCode: string) {
  return httpClient.patch<UserPrivateProfile>(`/users/language/${telegramId}`, { languageCode });
}

export async function updateContactLocation(
  telegramId: number | string,
  data: UpdateContactLocationDto,
) {
  return httpClient.patch<UserPrivateProfile>(`/users/contact-location/${telegramId}`, { data });
}
