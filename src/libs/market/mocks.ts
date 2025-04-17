import { HomeFeedResponse, HomeFeedSection } from './types';
import { generateMockCategoryTree, generateMockProductPreviews } from '@/libs/products/mocks';
import { generateMockStorePreviews } from '@/libs/stores/mocks';

export async function generateMockHomeFeedResponse(): Promise<HomeFeedResponse> {
  return {
    sections: [
      await generateMockCategoryGridSection(),
      await generateMockDealsOfDaySection(),
      await generateMockEditorsPickSection(),
      await generateMockLocalSellersSection(),
    ],
  };
}

async function generateMockCategoryGridSection(): Promise<HomeFeedSection> {
  const categories = generateMockCategoryTree(8);
  return {
    id: 'popular-categories',
    type: 'categoryGrid',
    title: 'Shop our most popular categories',
    data: await categories,
  };
}

async function generateMockDealsOfDaySection(): Promise<HomeFeedSection> {
  const future = new Date();
  future.setHours(future.getHours() + 12);

  return {
    id: 'deals-of-the-day',
    type: 'productCarousel',
    title: "Today's Big Deals",
    subtitle: 'Fresh deals in 11:42:31',
    expiresAt: future.toISOString(),
    data: await generateMockProductPreviews(),
  };
}

async function generateMockEditorsPickSection(): Promise<HomeFeedSection> {
  return {
    id: 'editors-picks',
    type: 'productCarousel',
    title: "Editors' Picks",
    subtitle: 'Perfect gifts and unique pieces curated for you',
    data: await generateMockProductPreviews(),
  };
}

async function generateMockLocalSellersSection(): Promise<HomeFeedSection> {
  return {
    id: 'local-sellers',
    type: 'storeCarousel',
    title: 'Explore items from local shops',
    data: await generateMockStorePreviews(),
  };
}
