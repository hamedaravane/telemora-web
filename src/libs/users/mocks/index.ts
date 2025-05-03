import { faker } from '@faker-js/faker';
import { CurrencyInfo, UserPrivateProfile, UserPublicPreview, UserRole, UserSummary } from '../types';
import { generateMockAddress } from '@/libs/location/mocks';
import { generateMockStorePreviews } from '@/libs/stores/mocks';
import { generateMockOrderSummary } from '@/libs/orders/mocks';

export async function generateMockUserPublicPreview(): Promise<UserPublicPreview> {
  return {
    id: faker.number.int(),
    username: faker.internet.username(),
    handle: faker.helpers.slugify(faker.internet.username()),
    photo: {
      url: faker.image.personPortrait(),
    },
  };
}

export async function generateMockUserSummary(): Promise<UserSummary> {
  return {
    ...(await generateMockUserPublicPreview()),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    role: faker.helpers.arrayElement(Object.values(UserRole)),
    address: generateMockAddress(),
  };
}

export async function generateMockCurrencyInfo(): Promise<CurrencyInfo>{
  return {
    tonToUsdRate: faker.finance.amount({min:0.1,max:10,dec:2}),
    localCurrencyToUsdRate: faker.finance.amount({min:0.1, max:100, dec:2}),
    localCurrencyCode: faker.finance.currencyCode(),
  }
}

export async function generateMockUserPrivateProfile(): Promise<UserPrivateProfile> {
  return {
    ...(await generateMockUserSummary()),
    telegramId: faker.string.alphanumeric(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(),
    walletAddress: faker.finance.ethereumAddress(),
    stores: await generateMockStorePreviews(),
    orders: await Promise.all(Array.from({ length: 5 }, generateMockOrderSummary)),
    currencyInfo: await generateMockCurrencyInfo()
  };
}

