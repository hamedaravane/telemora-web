import { HomeFeedResponse, HomeFeedSection } from './types';
import { generateMockCategoryTree, generateMockProductPreview } from '@/libs/products/mocks';
import { generateMockStorePreview } from '@/libs/stores/mocks';
import { ProductCategoryNode, ProductPreview } from '@/libs/products/types';
import { StorePreview } from '@/libs/stores/types';

export function generateMockHomeFeedResponse(): HomeFeedResponse {
  return {
    sections: [
      generateMockCategoryGridSection(),
      generateMockDealsOfDaySection(),
      generateMockEditorsPickSection(),
      generateMockLocalSellersSection(),
    ],
  };
}

function generateMockCategoryGridSection(): HomeFeedSection {
  const categories: ProductCategoryNode[] = generateMockCategoryTree(8);
  return {
    id: 'popular-categories',
    type: 'categoryGrid',
    title: 'Shop our most popular categories',
    data: categories,
  };
}

function generateMockDealsOfDaySection(): HomeFeedSection {
  const products: ProductPreview[] = Array.from({ length: 10 }, (_, i) =>
    generateMockProductPreview(i + 1),
  );
  const future = new Date();
  future.setHours(future.getHours() + 12);

  return {
    id: 'deals-of-the-day',
    type: 'productCarousel',
    title: "Today's Big Deals",
    subtitle: 'Fresh deals in 11:42:31',
    expiresAt: future.toISOString(),
    data: products,
  };
}

function generateMockEditorsPickSection(): HomeFeedSection {
  const picks: ProductPreview[] = Array.from({ length: 8 }, (_, i) =>
    generateMockProductPreview(i + 20),
  );

  return {
    id: 'editors-picks',
    type: 'productCarousel',
    title: "Editors' Picks",
    subtitle: 'Perfect gifts and unique pieces curated for you',
    data: picks,
  };
}

function generateMockLocalSellersSection(): HomeFeedSection {
  const stores: StorePreview[] = Array.from({ length: 6 }, () => generateMockStorePreview());

  return {
    id: 'local-sellers',
    type: 'storeCarousel',
    title: 'Explore items from local shops',
    data: stores,
  };
}
