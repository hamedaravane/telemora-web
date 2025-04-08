import { useQuery } from '@tanstack/react-query';
import { HomeFeedResponse } from '@/libs/market/types';
import { generateMockHomeFeedResponse } from '@/libs/market/mocks';
import httpClient from '@/libs/common/http-client';

export const getMarketPage = async (): Promise<HomeFeedResponse> => {
  return httpClient.get(`/market`);
};

export function useMarketData() {
  return useQuery<HomeFeedResponse>({
    queryKey: ['marketPageData'],
    queryFn: generateMockHomeFeedResponse,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
