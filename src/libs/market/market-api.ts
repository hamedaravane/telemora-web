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
      price: 23.5542,
      imageUrl:
        'https://img.freepik.com/free-photo/woman-wearing-headphones-close-up_23-2148989874.jpg?t=st=1741525872~exp=1741529472~hmac=e12b039119edfbb5391c5bcb2524e356ecc9b9c2660556f7c7e6d6d9ab3db4f5&w=740',
      productType: ProductType.PHYSICAL,
      stock: 12,
    },
    {
      id: 2,
      name: 'E-Book: JavaScript Mastery',
      price: 4.221,
      imageUrl:
        'https://img.freepik.com/free-photo/man-with-glasses-working-laptop_23-2148372520.jpg?t=st=1741525963~exp=1741529563~hmac=8f281373f5fecb19df731f32dd2f4fd4f34529b64d55fc7375cf35522c697f37&w=740',
      productType: ProductType.DIGITAL,
    },
    {
      id: 3,
      name: 'Graphic Design Service',
      price: 16.4478,
      imageUrl:
        'https://img.freepik.com/free-photo/woman-looking-color-palettes-medium-shot_23-2148769756.jpg?t=st=1741526003~exp=1741529603~hmac=6585ff29ac673901a5522ca7acf861fce8afad463be07a0e364fe2e7977f1a05&w=740',
      productType: ProductType.SERVICE,
    },
    {
      id: 4,
      name: 'Smartwatch',
      price: 66.5447,
      imageUrl:
        'https://img.freepik.com/free-photo/close-up-elegant-businesswoman-with-smartwatch_23-2148788851.jpg?t=st=1741526051~exp=1741529651~hmac=35f0f0797cbdcea9e3a011641559d5654aed13403118f16f8499b571fd937cfa&w=740',
      productType: ProductType.PHYSICAL,
      stock: 5,
    },
    {
      id: 5,
      name: 'Online Marketing Consultation',
      price: 26.445,
      imageUrl:
        'https://img.freepik.com/free-photo/woman-using-digital-tablet-online-shopping_53876-71209.jpg?t=st=1741526090~exp=1741529690~hmac=beb4312dfad5bdbe2bae140cd0935b20e3e3bf27a0af62f308490ed9d806af17&w=740',
      productType: ProductType.SERVICE,
    },
    {
      id: 6,
      name: 'AI-Powered Video Editing Software',
      price: 65.447,
      imageUrl:
        'https://img.freepik.com/free-photo/person-clapping-clapperboard_23-2147699827.jpg?t=st=1741526117~exp=1741529717~hmac=235f39d7cd1ca88813665651b4daa39bd7b48d85c2af549371641aab303bef53&w=740',
      productType: ProductType.DIGITAL,
    },
  ];
}

function generateMockStores(): StorePreview[] {
  return [
    {
      id: 1,
      name: 'Tech Gear Store',
      logoUrl:
        'https://img.freepik.com/free-photo/top-view-virtual-reality-headset-white-headphones_23-2148912738.jpg?t=st=1741526151~exp=1741529751~hmac=2afc269e6466e629a5f4d1f488ebdf0d2cf0f138b858d4cfd29be2a84d7c799f&w=740',
      reputation: 4.8,
    },
    {
      id: 2,
      name: 'E-Book Universe',
      logoUrl:
        'https://img.freepik.com/free-photo/side-view-smiley-woman-using-tablet_23-2148793484.jpg?t=st=1741526219~exp=1741529819~hmac=d50887159c974c1f8af389f6bc85920b7718a8cb7f43faac69505e82bce9bccf&w=740',
      reputation: 4.5,
    },
    {
      id: 3,
      name: 'Creative Studio',
      logoUrl:
        'https://img.freepik.com/free-photo/female-artist-home_23-2147781627.jpg?t=st=1741526187~exp=1741529787~hmac=324249e4d98a6aad3da801704eb12a7ee70b9bab9569b1e41b8d22bcafd5ae4e&w=740',
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

async function getProductById(id: number): Promise<ProductPreview | undefined>{
  return generateMockProducts().find((product) => product.id === id);
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

export function useGetProductById(id: number){
  return useQuery<ProductPreview | undefined>({
    queryKey: ['getProductById', id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
