import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { HomeFeedResponse } from '@/libs/market/types';
import { generateMockHomeFeedResponse } from '@/libs/market/mocks';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const getMarketPage = async (): Promise<HomeFeedResponse> => {
  const response = await axios.get(`${API_BASE_URL}/market`);

  return response.data;
};

export function useMarketData() {
  return useQuery<HomeFeedResponse>({
    queryKey: ['marketPageData'],
    queryFn: generateMockHomeFeedResponse,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
