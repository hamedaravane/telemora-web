'use client';

import React, { createContext, useContext, useState } from 'react';

import {
  CreateAddressDto,
  CreateStoreBasicDto,
  CreateStoreLogoDto,
  CreateStoreTagsDto,
  CreateStoreWorkingHoursDto,
  WorkingHour,
} from '@/libs/stores/types';
import {
  createBasicInfo,
  selectStoreTags,
  setStoreWorkingHours,
  updateStoreLocation,
  uploadStoreLogo,
} from '@/libs/stores/stores-api';

type StoreCreationState = CreateStoreBasicDto &
  CreateAddressDto &
  CreateStoreTagsDto &
  CreateStoreWorkingHoursDto &
  CreateStoreLogoDto;

interface StoreCreationContextType {
  storeData: StoreCreationState;
  updateStoreData: (data: Partial<StoreCreationState>) => void;
  submitStore: () => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

const defaultStoreData: StoreCreationState = {
  name: '',
  description: '',
  contactNumber: '',
  email: '',
  walletAddress: '',
  countryId: 0,
  stateId: undefined,
  cityId: undefined,
  streetLine1: '',
  streetLine2: '',
  postalCode: '',
  latitude: undefined,
  longitude: undefined,
  tags: [],
  workingHours: {} as Record<string, WorkingHour>,
  logoFile: undefined,
};

const StoreCreationContext = createContext<StoreCreationContextType | undefined>(undefined);

export const StoreCreationProvider = ({ children }: { children: React.ReactNode }) => {
  const [storeData, setStoreData] = useState<StoreCreationState>(defaultStoreData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStoreData = (data: Partial<StoreCreationState>) => {
    setStoreData((prev) => ({ ...prev, ...data }));
  };

  const submitStore = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('[CREATE STORE] Submitting data:', storeData);

      await createBasicInfo({
        name: storeData.name,
        description: storeData.description,
        contactNumber: storeData.contactNumber,
        email: storeData.email,
        walletAddress: storeData.walletAddress,
      });

      if (storeData.countryId && storeData.streetLine1) {
        await updateStoreLocation({
          countryId: storeData.countryId,
          stateId: storeData.stateId,
          cityId: storeData.cityId,
          streetLine1: storeData.streetLine1,
          streetLine2: storeData.streetLine2,
          postalCode: storeData.postalCode,
          latitude: storeData.latitude,
          longitude: storeData.longitude,
        });
      }

      if (storeData.tags && storeData.tags.length > 0) {
        await selectStoreTags({ tags: storeData.tags });
      }

      if (storeData.workingHours && Object.keys(storeData.workingHours).length > 0) {
        await setStoreWorkingHours({ workingHours: storeData.workingHours });
      }

      if (storeData.logoFile) {
        await uploadStoreLogo({ logoFile: storeData.logoFile });
      }

      console.log('[CREATE STORE] ✅ Submission completed!');
    } catch (err) {
      console.error('[CREATE STORE] ❌ Error during submission:', err);
      setError('Failed to create store. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StoreCreationContext.Provider
      value={{
        storeData,
        updateStoreData,
        submitStore,
        isSubmitting,
        error,
      }}
    >
      {children}
    </StoreCreationContext.Provider>
  );
};

export const useStoreCreation = () => {
  const context = useContext(StoreCreationContext);
  if (!context) {
    throw new Error('useStoreCreation must be used within a StoreCreationProvider');
  }
  return context;
};
