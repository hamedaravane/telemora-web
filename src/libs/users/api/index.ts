import {
  UpdateContactLocationDto,
  UpdateLanguageDto,
  UpdateProfileDto,
  UserPrivateProfile,
} from '@/libs/users/types';
import httpClient from '@/libs/common/http-client';

export async function telegramLogin() {
  return httpClient.get<UserPrivateProfile>('/users/login');
}

export async function updateProfile(telegramId: number | string, data: UpdateProfileDto) {
  return httpClient.patch<UserPrivateProfile>(`/users/profile/${telegramId}`, data);
}

export async function updateLanguage(telegramId: number | string, data: UpdateLanguageDto) {
  return httpClient.patch<UserPrivateProfile>(`/users/language/${telegramId}`, data);
}

export async function updateContactLocation(
  telegramId: number | string,
  data: UpdateContactLocationDto,
) {
  return httpClient.patch<UserPrivateProfile>(`/users/contact-location/${telegramId}`, data);
}
