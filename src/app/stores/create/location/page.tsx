/*
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select, SelectItem, Spinner } from '@heroui/react';
import { useStoreCreation } from '@/context/store-creation-context';
import { useCities, useCountries, useStates } from '@/libs/location/location-api';
import { locationManager, useSignal } from '@telegram-apps/sdk-react';
import AppLayout from '@/components/shared/app-layout';
import { PageHeader } from '@/components/shared/page-header';

export default function CreateStoreLocation() {
  const router = useRouter();
  const { storeData, updateStoreData } = useStoreCreation();

  const { data: countries, isLoading: loadingCountries } = useCountries();
  const { data: states, isLoading: loadingStates } = useStates(storeData.countryId);
  const { data: cities, isLoading: loadingCities } = useCities(storeData.stateId);

  const isSupported = useSignal(locationManager.isSupported);
  const isAccessGranted = useSignal(locationManager.isAccessGranted);

  const [error, setError] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const detectLocation = async () => {
    setError(null);
    setIsDetecting(true);

    try {
      await locationManager.mount();

      const location = await locationManager.requestLocation();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/locations/nearest?lat=${location.latitude}&lng=${location.longitude}`,
      );

      if (!res.ok) {
        throw new Error('Failed to resolve location data from coordinates.');
      }

      const nearest = await res.json();

      if (!storeData.countryId && nearest.country?.id) {
        updateStoreData({ countryId: nearest.country.id });
      }

      if (!storeData.stateId && nearest.state?.id) {
        updateStoreData({ stateId: nearest.state.id });
      }

      if (!storeData.cityId && nearest.city?.id) {
        updateStoreData({ cityId: nearest.city.id });
      }
    } catch (e) {
      const error = e as Error;
      console.error('Location detection failed:', error);

      if (!isAccessGranted) {
        setError('Location access denied. Please enable it in Telegram settings.');
      } else {
        setError(error.message || 'Unable to detect location. Try selecting manually.');
      }
    } finally {
      setIsDetecting(false);
    }
  };

  const handleOpenSettings = () => {
    if (locationManager.openSettings.isAvailable()) {
      locationManager.openSettings();
    }
  };

  const handleNext = () => router.push('/store/create/tags');
  const handleBack = () => router.push('/store/create/basic-information');

  return (
    <AppLayout>
      <div className="text-sm text-gray-500 mb-4">Step 2 of 5</div>
      <PageHeader
        title="Store Address"
        subtitle="Set your store’s country and city so customers can find you. You can skip this if you don’t
        sell physical products."
      />

      <div className="mb-4">
        <Button
          variant="bordered"
          onPress={detectLocation}
          isDisabled={isDetecting || !isSupported}
          size="sm"
        >
          {isDetecting ? 'Detecting…' : 'Use Telegram Location'}
        </Button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {!isAccessGranted && (
          <div className="mt-2">
            <Button variant="ghost" size="sm" onPress={handleOpenSettings}>
              Open Telegram Location Settings
            </Button>
          </div>
        )}
      </div>

      {loadingCountries ? (
        <Spinner />
      ) : (
        <Select
          label="Country"
          selectedKeys={storeData.countryId ? new Set([storeData.countryId.toString()]) : undefined}
          onSelectionChange={(keys) => {
            const selectedId = Number(Array.from(keys)[0]);
            updateStoreData({ countryId: selectedId, stateId: undefined, cityId: undefined });
          }}
        >
          {countries!.map((country) => (
            <SelectItem key={country.id.toString()}>{country.name}</SelectItem>
          ))}
        </Select>
      )}

      {storeData.countryId &&
        (loadingStates ? (
          <Spinner />
        ) : (
          <Select
            label="State"
            selectedKeys={storeData.stateId ? new Set([storeData.stateId.toString()]) : undefined}
            onSelectionChange={(keys) => {
              const selectedId = Number(Array.from(keys)[0]);
              updateStoreData({ stateId: selectedId, cityId: undefined });
            }}
          >
            {states!.map((state) => (
              <SelectItem key={state.id.toString()}>{state.name}</SelectItem>
            ))}
          </Select>
        ))}

      {storeData.stateId &&
        (loadingCities ? (
          <Spinner />
        ) : (
          <Select
            label="City"
            selectedKeys={storeData.cityId ? new Set([storeData.cityId.toString()]) : undefined}
            onSelectionChange={(keys) => {
              const selectedId = Number(Array.from(keys)[0]);
              updateStoreData({ cityId: selectedId });
            }}
          >
            {cities!.map((city) => (
              <SelectItem key={city.id.toString()}>{city.name}</SelectItem>
            ))}
          </Select>
        ))}

      <div className="mt-6 flex justify-between">
        <Button variant="bordered" onPress={handleBack}>
          Back
        </Button>
        <Button onPress={handleNext}>Next</Button>
      </div>

      <div className="text-center mt-4">
        <Button variant="ghost" size="sm" onPress={handleNext}>
          Skip Location
        </Button>
      </div>
    </AppLayout>
  );
}
*/
export default function StoreLocationPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Store Location</h1>
      <p className="text-lg text-gray-600 mb-8">
        This page is currently under development. Please check back later.
      </p>
    </div>
  );
}
