import { faker } from '@faker-js/faker';
import { StoreDetail, StorePreview, StoreSummary } from './types';
import { generateMockAddress } from '@/libs/location/mocks';
import { generateMockUserSummary } from '@/libs/users/mocks';
import { generateMockProductPreviews } from '@/libs/products/mocks';

export async function generateMockStorePreview(): Promise<StorePreview> {
  return {
    id: faker.number.int(),
    name: faker.company.name(),
    slug: faker.helpers.slugify(faker.company.name()),
    logo: {
      url: faker.image.url(),
      alt: faker.company.name(),
    },
    reputation: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    isActive: true,
  };
}

export async function generateMockStoreSummary(): Promise<StoreSummary> {
  return {
    ...(await generateMockStorePreview()),
    address: generateMockAddress(),
    description: faker.lorem.paragraph(),
    tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.lorem.word()),
  };
}

export async function generateMockStoreDetail(): Promise<StoreDetail> {
  return {
    ...(await generateMockStoreSummary()),
    owner: await generateMockUserSummary(),
    products: await generateMockProductPreviews(),
    contactNumber: faker.phone.number(),
    email: faker.internet.email(),
    socialMediaLinks: {
      instagram: faker.internet.url(),
      twitter: faker.internet.url(),
    },
    workingHours: {
      mon: { open: '09:00', close: '17:00' },
      tue: { open: '09:00', close: '17:00' },
    },
    createdAt: faker.date.past(),
  };
}

export async function generateMockStoreSummaries(): Promise<StoreSummary[]> {
  return Promise.all(Array.from({ length: 5 }, () => generateMockStoreSummary()));
}

export async function generateMockStorePreviews(): Promise<StorePreview[]> {
  return Promise.all(Array.from({ length: 5 }, () => generateMockStorePreview()));
}
