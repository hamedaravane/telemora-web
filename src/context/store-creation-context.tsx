'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  createBasicInfo,
  selectStoreCategory,
  setStoreWorkingHours,
  updateStoreLocation,
  uploadStoreLogo,
} from '@/libs/stores/stores-api';
import {
  CreateStoreBasicDto,
  CreateStoreCategoryDto,
  CreateStoreLocationDto,
  CreateStoreWorkingHoursDto,
  StoreCategory,
} from '@/libs/stores/types';

interface StoreCreationState extends CreateStoreBasicDto, CreateStoreLocationDto, CreateStoreCategoryDto, CreateStoreWorkingHoursDto {
  logoUrl?: File | null;
}

interface StoreCreationContextType {
  storeData: StoreCreationState;
  updateStoreData: (newData: Partial<StoreCreationState>) => void;
  submitStore: () => Promise<void>;
}

const StoreCreationContext = createContext<StoreCreationContextType | undefined>(undefined);

export function StoreCreationProvider({ children }: { children: React.ReactNode }) {
  const [storeData, setStoreData] = useState<StoreCreationState>({
    name: '',
    description: '',
    contactNumber: '',
    email: '',
    country: undefined,
    state: undefined,
    city: undefined,
    category: StoreCategory.OTHER,
    workingHours: {},
    logoUrl: null,
  });

  const updateStoreData = (newData: Partial<StoreCreationState>) => {
    setStoreData((prev) => ({ ...prev, ...newData }));
  };

  const submitStore = async () => {
    try {
      console.log('Submitting store data:', storeData);

      await createBasicInfo(storeData);

      if (storeData.country) {
        await updateStoreLocation(storeData);
      }

      await selectStoreCategory(storeData);

      if (Object.keys(storeData.workingHours || {}).length > 0) {
        await setStoreWorkingHours(storeData);
      }

      if (storeData.logoUrl) {
        await uploadStoreLogo({ logoUrl: storeData.logoUrl });
      }

      console.log('Store created successfully!');
    } catch (error) {
      console.error('Error submitting store:', error);
    }
  };

  return (
    <StoreCreationContext.Provider value={{ storeData, updateStoreData, submitStore }}>
      {children}
    </StoreCreationContext.Provider>
  );
}

export function useStoreCreation() {
  const context = useContext(StoreCreationContext);
  if (!context) {
    throw new Error('useStoreCreation must be used within a StoreCreationProvider');
  }
  return context;
}
