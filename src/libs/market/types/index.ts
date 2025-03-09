import { StorePreview } from '@/libs/stores/types';
import { ProductPreview, ProductType } from '@/libs/products/types';

export interface MarketPageResponse {
  featuredProducts: ProductPreview[];
  categoryProducts: {
    [ProductType.SERVICE]: ProductPreview[];
    [ProductType.PHYSICAL]: ProductPreview[];
    [ProductType.DIGITAL]: ProductPreview[];
  };
  topRatedStores: StorePreview[];
  recentProducts: ProductPreview[];
}
