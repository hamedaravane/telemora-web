import { User, UserRole } from '@/libs/users/types';
import { faker } from '@faker-js/faker';
import { generateMockCity, generateMockCountry, generateMockState } from '@/libs/location/mocks';

export function generateMockUser(id: number = 0): User {
  return {
    id,
    telegramId: faker.number.octal(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.username(),
    languageCode: faker.string.alpha(),
    hasTelegramPremium: faker.datatype.boolean(),
    photoUrl: faker.image.urlPicsumPhotos(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(),
    role: faker.helpers.enumValue(UserRole),
    walletAddress: faker.finance.ethereumAddress(),
    country: generateMockCountry(),
    state: generateMockState(),
    city: generateMockCity(),
    orders: [],
    reviews: [],
    stores: [],
    payments: [],
    createdAt: faker.date.past(),
  };
}
