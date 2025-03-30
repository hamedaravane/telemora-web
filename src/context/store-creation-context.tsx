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
  CreateAddressDto,
  CreateStoreBasicDto,
  CreateStoreLogoDto,
  CreateStoreTagsDto,
  CreateStoreWorkingHoursDto,
} from '@/libs/stores/types';

type StoreCreationState = CreateStoreBasicDto &
  CreateAddressDto &
  CreateStoreTagsDto &
  CreateStoreWorkingHoursDto &
  CreateStoreLogoDto;

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
    countryId: 0,
    stateId: 0,
    cityId: 0,
    postalCode: '',
    streetLine1: '',
    streetLine2: '',
    latitude: 0,
    longitude: 0,
    tags: [],
    workingHours: {},
    logoFile: undefined,
  });

  const updateStoreData = (newData: Partial<StoreCreationState>) => {
    setStoreData((prev) => ({ ...prev, ...newData }));
  };

  const submitStore = async () => {
    try {
      console.log('Submitting stores data:', storeData);

      await createBasicInfo(storeData);

      if (storeData.countryId) {
        await updateStoreLocation(storeData);
      }

      await selectStoreCategory(storeData);

      if (Object.keys(storeData.workingHours || {}).length > 0) {
        await setStoreWorkingHours(storeData);
      }

      if (storeData.logoFile) {
        await uploadStoreLogo({ logoFile: storeData.logoFile });
      }

      console.log('Store created successfully!');
    } catch (error) {
      console.error('Error submitting stores:', error);
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
