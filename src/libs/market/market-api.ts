import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MarketPageResponse } from '@/libs/market/types';
import { ProductPreview, ProductType } from '@/libs/products/types';
import { StorePreview } from '@/libs/stores/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const getMarketPage = async (): Promise<MarketPageResponse> => {
  const response = await axios.get(`${API_BASE_URL}/market`);

  return response.data;
};

function generateMockProducts(): ProductPreview[] {
  return [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      imageUrl: 'https://picsum.photos/seed/headphones/200/200',
      productType: ProductType.PHYSICAL,
      stock: 12,
    },
    {
      id: 2,
      name: 'E-Book: JavaScript Mastery',
      price: 19.99,
      imageUrl: 'https://picsum.photos/seed/ebook/200/200',
      productType: ProductType.DIGITAL,
    },
    {
      id: 3,
      name: 'Graphic Design Service',
      price: 49.99,
      imageUrl: 'https://picsum.photos/seed/design-service/200/200',
      productType: ProductType.SERVICE,
    },
    {
      id: 4,
      name: 'Smartwatch',
      price: 199.99,
      imageUrl: 'https://picsum.photos/seed/smartwatch/200/200',
      productType: ProductType.PHYSICAL,
      stock: 5,
    },
    {
      id: 5,
      name: 'Online Marketing Consultation',
      price: 79.99,
      imageUrl: 'https://picsum.photos/seed/marketing-consult/200/200',
      productType: ProductType.SERVICE,
    },
    {
      id: 6,
      name: 'AI-Powered Video Editing Software',
      price: 129.99,
      imageUrl: 'https://picsum.photos/seed/video-editing-software/200/200',
      productType: ProductType.DIGITAL,
    },
  ];
}

function generateMockStores(): StorePreview[] {
  return [
    {
      id: 1,
      name: 'Tech Gear Store',
      logoUrl: 'https://picsum.photos/seed/tech-gear-store/100/100',
      reputation: 4.8,
    },
    {
      id: 2,
      name: 'E-Book Universe',
      logoUrl: 'https://picsum.photos/seed/ebook-universe/100/100',
      reputation: 4.5,
    },
    {
      id: 3,
      name: 'Creative Studio',
      logoUrl: 'https://picsum.photos/seed/creative-studio/100/100',
      reputation: 4.7,
    },
  ];
}

export async function getMockMarketPageData(): Promise<MarketPageResponse> {
  const allProducts = generateMockProducts();
  const topStores = generateMockStores();

  const featuredProducts = allProducts.slice(0, 4);

  const categoryProducts = {
    [ProductType.PHYSICAL]: allProducts.filter((p) => p.productType === ProductType.PHYSICAL),
    [ProductType.DIGITAL]: allProducts.filter((p) => p.productType === ProductType.DIGITAL),
    [ProductType.SERVICE]: allProducts.filter((p) => p.productType === ProductType.SERVICE),
  };

  const recentProducts = [...allProducts].reverse().slice(0, 4);

  return {
    featuredProducts,
    categoryProducts,
    topRatedStores: topStores,
    recentProducts,
  };
}

/**
 * Custom hook to fetch market page data using React Query.
 */
export function useMarketData() {
  return useQuery<MarketPageResponse>({
    queryKey: ['marketPageData'], 
    queryFn: getMockMarketPageData, 
    staleTime: 1000 * 60 * 5, 
    retry: 2, 
  });
}
