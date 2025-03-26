import { ProductPreview, ProductType } from '@/libs/products/types';
import { faker } from '@faker-js/faker';

export function generateMockProduct(): ProductPreview {
  return {
    id: faker.number.int(),
    name: faker.commerce.productName(),
    price: +faker.commerce.price(),
    description: faker.lorem.paragraph(),
    imageUrl: faker.image.urlPicsumPhotos(),
    store:,
    productType: faker.helpers.enumValue(ProductType),
    attributes:,
    variants:,
    reviews:,
    downloadLink: undefined,
    stock: undefined,
    isApproved: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
}
