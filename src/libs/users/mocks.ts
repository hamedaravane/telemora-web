import { faker } from '@faker-js/faker';
import { UserPublicPreview, UserRole, UserSummary } from './types';
import { generateMockAddress } from '@/libs/location/mocks';

export function generateMockUserPublicPreview(): UserPublicPreview {
  return {
    id: faker.number.int(),
    username: faker.internet.username(),
    handle: faker.helpers.slugify(faker.internet.username()),
    photo: {
      url: faker.image.url(),
    },
  };
}

export function generateMockUserSummary(): UserSummary {
  return {
    ...generateMockUserPublicPreview(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    role: faker.helpers.arrayElement(Object.values(UserRole)),
    address: generateMockAddress(),
  };
}
