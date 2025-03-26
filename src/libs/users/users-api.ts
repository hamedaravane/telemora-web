import axios from 'axios';
import { UserPrivateProfile } from '@/libs/users/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function sendTelegramInitData(initData: string): Promise<UserPrivateProfile> {
  const res = await axios.post(`${API_BASE_URL}/users/init-data`, { initData });
  return res.data;
}
