import { Store, StoreCategory } from '@/libs/stores/types';
import { faker } from '@faker-js/faker';
import { ProductType } from '@/libs/products/types';
import { generateMockUser } from '@/libs/users/mocks';
import { generateMockCity, generateMockCountry, generateMockState } from '@/libs/location/mocks';

export function generateMockStores(count: number) {
  return Array.from({ length: count }, (_, index): Store => generateMockStore(index));
}

export function generateMockStore(id: number = 0): Store {
  return {
    id,
    name: faker.company.buzzNoun(),
    logoUrl: faker.image.urlPicsumPhotos(),
    description: faker.lorem.paragraph(),
    category: faker.helpers.enumValue(StoreCategory),
    owner: generateMockUser(),
    admins: [],
    products: [
      {
        id: faker.number.int(100),
        name: faker.commerce.productName(),
        price: +faker.finance.amount(),
        imageUrl: faker.image.urlPicsumPhotos(),
        productType: faker.helpers.enumValue(ProductType),
      },
    ],
    orders: [],
    contactNumber: faker.phone.number(),
    email: faker.internet.email(),
    country: generateMockCountry(),
    state: generateMockState(),
    city: generateMockCity(),
    socialMediaLinks: { Instagram: faker.internet.username() },
    reputation: faker.number.float({ min: 0, max: 5 }),
    workingHours: {},
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    deletedAt: faker.date.past(),
  };
}
