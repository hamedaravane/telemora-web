import { City, Country, State } from '@/libs/location/types';
import { faker } from '@faker-js/faker';

export function generateMockCountry(): Country {
  return {
    id: faker.number.int(100),
    code: faker.location.zipCode(),
    name: faker.location.country(),
    nameLocal: { fa: faker.location.country() },
    phoneCode: faker.string.numeric(2),
    currency: faker.finance.currencyName(),
    region: faker.location.continent(),
    capital: faker.location.city(),
  };
}

export function generateMockState(): State {
  return {
    id: faker.number.int(100),
    name: faker.location.state(),
    code: faker.location.zipCode(),
    nameLocal: { fa: faker.location.state() },
  };
}

export function generateMockCity(): City {
  return {
    id: faker.number.int(100),
    name: faker.location.city(),
    nameLocal: { fa: faker.location.city() },
    postalCode: faker.location.zipCode(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  };
}
