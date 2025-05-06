import { useMutation, useQuery } from '@tanstack/react-query';

import {
  telegramLogin,
  updateContactLocation,
  updateLanguage,
  updateProfile,
} from '@/libs/users/api';
import {
  UpdateContactLocationFormData,
  UpdateLanguageFormData,
  UpdateProfileFormData,
} from '@/libs/users/schemas';

export function useTelegramLoginQuery() {
  return useQuery({
    queryKey: ['me'],
    queryFn: telegramLogin,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: ({
      telegramId,
      data,
    }: {
      telegramId: number | string;
      data: UpdateProfileFormData;
    }) => updateProfile(telegramId, data),
  });
}

export function useUpdateLanguageMutation() {
  return useMutation({
    mutationFn: ({
      telegramId,
      data,
    }: {
      telegramId: number | string;
      data: UpdateLanguageFormData;
    }) => updateLanguage(telegramId, data),
  });
}

export function useUpdateContactLocationMutation() {
  return useMutation({
    mutationFn: ({
      telegramId,
      data,
    }: {
      telegramId: number | string;
      data: UpdateContactLocationFormData;
    }) => updateContactLocation(telegramId, data),
  });
}
