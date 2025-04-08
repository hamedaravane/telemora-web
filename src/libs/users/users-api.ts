import { UserPrivateProfile } from '@/libs/users/types';
import httpClient from '@/libs/common/http-client';

export async function sendTelegramInitData(initData: string): Promise<UserPrivateProfile> {
  return httpClient.post(`/users/init-data`, { initData });
}
