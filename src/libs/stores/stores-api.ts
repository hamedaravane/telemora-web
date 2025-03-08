import axios from 'axios';
import { Store } from '@/libs/stores/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getStores(): Promise<Store[]> {
  const response = await axios.get(`${API_BASE_URL}/stores`);

  return response.data;
}
