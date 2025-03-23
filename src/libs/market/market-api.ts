import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MarketPageResponse } from '@/libs/market/types';
import { ProductPreview, ProductType } from '@/libs/products/types';
import { StoreCategory, StorePreview } from '@/libs/stores/types';
import { faker } from '@faker-js/faker';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const getMarketPage = async (): Promise<MarketPageResponse> => {
  const response = await axios.get(`${API_BASE_URL}/market`);

  return response.data;
};

function generateMockProducts(): ProductPreview[] {
  return [
    {
      id: 1,
      name: faker.commerce.productName(),
      price: +faker.finance.amount({ min: 5, max: 100 }),
      imageUrl: faker.image.urlPicsumPhotos(),
      productType: faker.helpers.enumValue(ProductType),
      stock: 12,
    },
    {
      id: 2,
      name: faker.commerce.productName(),
      price: +faker.finance.amount({ min: 5, max: 100 }),
      imageUrl: faker.image.urlPicsumPhotos(),
      productType: faker.helpers.enumValue(ProductType),
    },
    {
      id: 3,
      name: faker.commerce.productName(),
      price: +faker.finance.amount({ min: 5, max: 100 }),
      imageUrl: faker.image.urlPicsumPhotos(),
      productType: faker.helpers.enumValue(ProductType),
    },
    {
      id: 4,
      name: faker.commerce.productName(),
      price: +faker.finance.amount({ min: 5, max: 100 }),
      imageUrl: faker.image.urlPicsumPhotos(),
      productType: faker.helpers.enumValue(ProductType),
      stock: 5,
    },
    {
      id: 5,
      name: faker.commerce.productName(),
      price: +faker.finance.amount({ min: 5, max: 100 }),
      imageUrl: faker.image.urlPicsumPhotos(),
      productType: faker.helpers.enumValue(ProductType),
    },
    {
      id: 6,
      name: faker.commerce.productName(),
      price: +faker.finance.amount({ min: 5, max: 100 }),
      imageUrl: faker.image.urlPicsumPhotos(),
      productType: faker.helpers.enumValue(ProductType),
    },
  ];
}

function generateMockStores(): StorePreview[] {
  return [
    {
      id: 1,
      name: faker.commerce.productName(),
      logoUrl: faker.image.urlPicsumPhotos(),
      reputation: faker.number.int(5),
      category: faker.helpers.enumValue(StoreCategory),
    },
    {
      id: 2,
      name: faker.commerce.productName(),
      logoUrl: faker.image.urlPicsumPhotos(),
      reputation: faker.number.int(5),
      category: faker.helpers.enumValue(StoreCategory),
    },
    {
      id: 3,
      name: faker.commerce.productName(),
      logoUrl: faker.image.urlPicsumPhotos(),
      reputation: faker.number.int(5),
      category: faker.helpers.enumValue(StoreCategory),
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
