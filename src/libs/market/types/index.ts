import { ProductCategoryNode, ProductPreview } from '@/libs/products/types';
import { StorePreview } from '@/libs/stores/types';

export interface HomeFeedResponse {
  sections: HomeFeedSection[];
}

export type HomeSectionType =
  | 'categoryGrid'
  | 'productCarousel'
  | 'storeCarousel'
  | 'featuredCollection';

export interface HomeFeedSection {
  id: string;
  type: HomeSectionType;
  title: string;
  subtitle?: string;
  expiresAt?: string;
  data: HomeSectionData[];
}

export type HomeSectionData = ProductPreview | StorePreview | ProductCategoryNode;
