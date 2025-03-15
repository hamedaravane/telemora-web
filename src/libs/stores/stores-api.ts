import axios from 'axios';
import {
  CreateStoreBasicDto,
  CreateStoreCategoryDto,
  CreateStoreLocationDto,
  CreateStoreLogoDto,
  CreateStoreWorkingHoursDto,
  Store,
} from '@/libs/stores/types';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchStores = async (): Promise<Store[]> => {
  const response = await axios.get(`${API_BASE_URL}/stores`);
  return response.data;
};

export function useStoresData() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: fetchStores,
  });
}

const createBasicInfo = async (data: CreateStoreBasicDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/basic`, data);
  return response.data;
};

const updateStoreLocation = async (data: CreateStoreLocationDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/location`, data);
  return response.data;
};

const selectStoreCategory = async (data: CreateStoreCategoryDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/category`, data);
  return response.data;
};

const setStoreWorkingHours = async (data: CreateStoreWorkingHoursDto) => {
  const response = await axios.post(`${API_BASE_URL}/stores/create/working_hour`, data);
  return response.data;
};

const uploadStoreLogo = async (data: CreateStoreLogoDto) => {
  const formData = new FormData();
  formData.append('logo', data.logoUrl);
  const response = await axios.post(`${API_BASE_URL}/stores/create/logo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

interface CreateStoreState {
  storeData: CreateStoreBasicDto &
    CreateStoreLocationDto &
    CreateStoreCategoryDto &
    CreateStoreWorkingHoursDto &
    CreateStoreLogoDto;
  updateStoreData: (newData: Partial<CreateStoreState['storeData']>) => void;
  resetStoreData: () => void;
}

export const useCreateStore = create<CreateStoreState>((set) => ({
  storeData: {
    name: '',
    description: '',
    contactNumber: '',
    email: '',
    country: undefined,
    state: undefined,
    city: undefined,
    category: undefined,
    workingHours: {},
    logoUrl: '',
  },
  updateStoreData: (newData) => set((state) => ({ storeData: { ...state.storeData, ...newData } })),
  resetStoreData: () =>
    set(() => ({
      storeData: {
        name: '',
        description: '',
        contactNumber: '',
        email: '',
        country: undefined,
        state: undefined,
        city: undefined,
        category: undefined,
        workingHours: {},
        logoUrl: '',
      },
    })),
}));
