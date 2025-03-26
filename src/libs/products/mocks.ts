import { faker } from '@faker-js/faker';
import {
  ProductAttribute,
  ProductDetail,
  ProductPreview,
  ProductSummary,
  ProductType,
  ProductVariant,
} from './types';
import { generateMockStorePreview } from '@/libs/stores/mocks';
import { generateMockReviewPreview } from '@/libs/reviews/mocks';

export function generateMockProductPreview(id: number): ProductPreview {
  return {
    id,
    name: faker.commerce.productName(),
    slug: faker.helpers.slugify(faker.commerce.productName()),
    price: Number(faker.commerce.price({ min: 10, max: 500 })),
    image: {
      url: faker.image.url(),
      alt: faker.commerce.productAdjective(),
      width: 600,
      height: 400,
    },
  };
}

export function generateMockProductSummary(id: number): ProductSummary {
  return {
    ...generateMockProductPreview(id),
    productType: faker.helpers.arrayElement(Object.values(ProductType)),
    store: generateMockStorePreview(),
  };
}

export function generateMockProductDetail(id: number): ProductDetail {
  const productType = faker.helpers.arrayElement(Object.values(ProductType));
  return {
    ...generateMockProductSummary(id),
    description: faker.commerce.productDescription(),
    attributes: Array.from(
      { length: 3 },
      (_, i): ProductAttribute => ({
        id: i + 1,
        attributeName: faker.commerce.productAdjective(),
        attributeValue: faker.commerce.productMaterial(),
      }),
    ),
    variants: Array.from(
      { length: 2 },
      (_, i): ProductVariant => ({
        id: i + 1,
        variantName: faker.color.human(),
        variantValue: faker.commerce.product(),
        additionalPrice: Number(faker.commerce.price({ min: 1, max: 20 })),
      }),
    ),
    stock: faker.number.int({ min: 0, max: 100 }),
    downloadLink: productType === 'digital' ? faker.internet.url() : undefined,
    reviews: [generateMockReviewPreview(id), generateMockReviewPreview(id + 1)],
    createdAt: faker.date.past(),
  };
}
