import { faker } from '@faker-js/faker';
import { StoreCategory, StoreDetail, StorePreview, StoreSummary } from './types';
import { generateMockAddress } from '@/libs/location/mocks';
import { generateMockUserSummary } from '@/libs/users/mocks';

export function generateMockStorePreview(): StorePreview {
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

export function generateMockStoreSummary(): StoreSummary {
  return {
    ...generateMockStorePreview(),
    category: faker.helpers.arrayElement(Object.values(StoreCategory)),
    address: generateMockAddress(),
  };
}

export function generateMockStoreDetail(): StoreDetail {
  return {
    ...generateMockStoreSummary(),
    description: faker.lorem.paragraph(),
    owner: generateMockUserSummary(),
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
