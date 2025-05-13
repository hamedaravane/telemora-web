import { faker } from '@faker-js/faker';

import { generateMockReviewPreviews } from '@/libs/reviews/mocks';
import { generateMockStorePreview } from '@/libs/stores/mocks';

import {
  ProductAttribute,
  ProductCategoryNode,
  ProductDetail,
  ProductPreview,
  ProductSummary,
  ProductType,
  ProductVariant,
} from '../types';

export async function generateMockProductPreview(): Promise<ProductPreview> {
  return {
    id: faker.number.int(),
    name: faker.commerce.productName(),
    slug: faker.helpers.slugify(faker.commerce.productName()),
    price: Number(faker.commerce.price({ min: 10, max: 500 })),
    image: Array.from({ length: 4 }, () => ({
      url: faker.image.urlPicsumPhotos(),
      alt: faker.commerce.productAdjective(),
      width: 600,
      height: 400,
    })),
    storeId: faker.number.int({ min: 10, max: 300 }),
  };
}

export async function generateMockProductPhotos(): Promise<{imageUrls: string[]}> {
  const imageUrls = Array.from(
    { length: 4 },
    () => faker.image.url()
  );

  return { imageUrls };
}

export async function generateMockProductSummary(): Promise<ProductSummary> {
  return {
    ...(await generateMockProductPreview()),
    productType: faker.helpers.arrayElement(Object.values(ProductType)),
    store: await generateMockStorePreview(),
  };
}

export async function generateMockProductDetail(): Promise<ProductDetail> {
  const productType = faker.helpers.arrayElement(Object.values(ProductType));
  return {
    ...(await generateMockProductSummary()),
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
    categoryId: faker.number.int(),
    categoryPath: [
      {
        id: faker.number.int(),
        name: faker.commerce.department(),
        slug: faker.helpers.slugify(faker.commerce.department()),
      },
      {
        id: faker.number.int(),
        name: faker.commerce.productAdjective(),
        slug: faker.helpers.slugify(faker.commerce.productAdjective()),
      },
    ],
    stock: faker.number.int({ min: 0, max: 100 }),
    downloadLink: productType === 'digital' ? faker.internet.url() : undefined,
    reviews: await generateMockReviewPreviews(),
    createdAt: faker.date.past(),
  };
}

let categoryIdCounter = 1;

export async function generateMockCategoryTree(count: number = 8): Promise<ProductCategoryNode[]> {
  const tree: ProductCategoryNode[] = [];

  for (let i = 0; i < count; i++) {
    const parentId = categoryIdCounter++;
    const parent: ProductCategoryNode = {
      id: parentId,
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department()).toLowerCase(),
      level: 0,
      children: [],
    };

    const subcategoryCount = faker.number.int({ min: 2, max: 4 });
    for (let j = 0; j < subcategoryCount; j++) {
      const childId = categoryIdCounter++;
      const child: ProductCategoryNode = {
        id: childId,
        name: faker.commerce.product(),
        slug: faker.helpers.slugify(faker.commerce.product()).toLowerCase(),
        level: 1,
        parentId: parent.id,
        children: [],
      };

      const subSubCount = faker.number.int({ min: 1, max: 3 });
      for (let k = 0; k < subSubCount; k++) {
        const subChildId = categoryIdCounter++;
        const subChild: ProductCategoryNode = {
          id: subChildId,
          name: faker.commerce.productAdjective(),
          slug: faker.helpers.slugify(faker.commerce.productAdjective()).toLowerCase(),
          level: 2,
          parentId: child.id,
        };
        child.children?.push(subChild);
      }

      parent.children?.push(child);
    }

    tree.push(parent);
  }

  return tree;
}

export async function generateMockProductPreviews(): Promise<ProductPreview[]> {
  return Promise.all(Array.from({ length: 10 }, () => generateMockProductPreview()));
}
