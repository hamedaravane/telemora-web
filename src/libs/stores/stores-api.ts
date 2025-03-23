import axios from 'axios';
import {
  CreateStoreBasicDto,
  CreateStoreCategoryDto,
  CreateStoreLocationDto,
  CreateStoreLogoDto,
  CreateStoreWorkingHoursDto,
  Store,
  StoreCategory,
} from '@/libs/stores/types';
import { useQuery } from '@tanstack/react-query';
import { faker, fakerFA } from '@faker-js/faker';
import { UserRole } from '@/libs/users/types';
import { ProductType } from '@/libs/products/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchStores = async (): Promise<Store[]> => {
  const response = await axios.get(`${API_BASE_URL}/stores`);
  return response.data;
};

export const fetchMockStores = async (): Promise<Store[]> => {
  return [];
};

export function useStoresData() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: fetchMockStores,
  });
}

export const fetchStoreById = async (id: number): Promise<Store> => {
  const response = await axios.get(`${API_BASE_URL}/stores/${id}`);
  return response.data;
};

export const fetchMockStoreById = async (id: number): Promise<Store> => {
  return {
    id: id,
    name: faker.company.buzzNoun(),
    logoUrl: faker.image.urlPicsumPhotos(),
    description: faker.lorem.paragraph(),
    category: faker.helpers.enumValue(StoreCategory),
    owner: {
      id: faker.number.int(100),
      telegramId: faker.number.int().toString(),
      firstName: faker.person.firstName(),
      role: UserRole.BOTH,
      orders: [],
      reviews: [],
      stores: [],
      payments: [],
      createdAt: faker.date.past(),
    },
    admins: [],
    products: [{
      id: faker.number.int(100),
      name: faker.commerce.productName(),
      price: +faker.finance.amount(),
      imageUrl: faker.image.urlPicsumPhotos(),
      productType: faker.helpers.enumValue(ProductType),
    }],
    orders: [],
    contactNumber: faker.phone.number(),
    email: faker.internet.email(),
    country: {
      id: faker.number.int(100),
      code: faker.location.zipCode(),
      name: faker.location.country(),
      nameLocal: { 'fa': fakerFA.location.country() },
      phoneCode: faker.location.zipCode(),
      currency: faker.finance.currencyName(),
      region: faker.location.continent(),
      capital: faker.location.city(),
    },
    state: {
      id: faker.number.int(100),
      name: faker.location.state(),
      code: faker.location.zipCode(),
      nameLocal: { 'fa': fakerFA.location.state() },
    },
    city: {
      id: faker.number.int(100),
      name: faker.location.city(),
      nameLocal: { 'fa': fakerFA.location.city() },
      postalCode: faker.location.zipCode(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    },
    socialMediaLinks: { 'Instagram': faker.internet.username() },
    reputation: faker.number.int(5),
    workingHours: {},
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    deletedAt: faker.date.past(),
  };
};

export function useSingleStoreDataById(id: number) {
  return useQuery({
    queryKey: ['store', id],
    queryFn: () => fetchMockStoreById(id),
  });
}

export const createBasicInfo = async (data: CreateStoreBasicDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/basic`, data);
  return response.data;
};

export const updateStoreLocation = async (data: CreateStoreLocationDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/location`, data);
  return response.data;
};

export const selectStoreCategory = async (data: CreateStoreCategoryDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/category`, data);
  return response.data;
};

export const setStoreWorkingHours = async (data: CreateStoreWorkingHoursDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/working_hour`, data);
  return response.data;
};

export const uploadStoreLogo = async (data: CreateStoreLogoDto) => {
  const formData = new FormData();
  if (data.logoUrl) {
    const fileBlob = new Blob([data.logoUrl], { type: 'image/*' });
    formData.append('logo', fileBlob);
    const response = await axios.post(`${API_BASE_URL}/stores/create/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } else throw new Error('No file provided');
};
