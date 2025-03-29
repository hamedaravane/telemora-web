'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select, SelectItem, Spinner } from '@heroui/react';
import { useStoreCreation } from '@/context/store-creation-context';
import { useCities, useCountries, useStates } from '@/libs/location/location-api';
import { locationManager, useSignal } from '@telegram-apps/sdk-react';
import AppLayout from '@/components/shared/app-layout';

export default function CreateStoreLocation() {
  const router = useRouter();
  const { storeData, updateStoreData } = useStoreCreation();

  const { data: countries, isLoading: loadingCountries } = useCountries();
  const { data: states, isLoading: loadingStates } = useStates(storeData.country);
  const { data: cities, isLoading: loadingCities } = useCities(storeData.state);

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

      if (!storeData.country && nearest.country?.id) {
        updateStoreData({ country: nearest.country.id });
      }

      if (!storeData.state && nearest.state?.id) {
        updateStoreData({ state: nearest.state.id });
      }

      if (!storeData.city && nearest.city?.id) {
        updateStoreData({ city: nearest.city.id });
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

  const handleNext = () => router.push('/store/create/category-selection');
  const handleBack = () => router.push('/store/create/basic-information');

  return (
    <AppLayout>
      <div className="text-sm text-gray-500 mb-4">Step 2 of 5</div>
      <h1 className="text-2xl font-bold mb-2">Step 2: Store Location</h1>
      <p className="text-gray-600 text-sm mb-6">
        Set your store’s country and city so customers can find you. You can skip this if you don’t
        sell physical products.
      </p>

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

      {/* Country Select */}
      {loadingCountries ? (
        <Spinner />
      ) : (
        <Select
          label="Country"
          selectedKeys={storeData.country ? new Set([storeData.country.toString()]) : undefined}
          onSelectionChange={(keys) => {
            const selectedId = Number(Array.from(keys)[0]);
            updateStoreData({ country: selectedId, state: undefined, city: undefined });
          }}
        >
          {countries!.map((country) => (
            <SelectItem key={country.id.toString()}>{country.name}</SelectItem>
          ))}
        </Select>
      )}

      {/* State Select */}
      {storeData.country &&
        (loadingStates ? (
          <Spinner />
        ) : (
          <Select
            label="State"
            selectedKeys={storeData.state ? new Set([storeData.state.toString()]) : undefined}
            onSelectionChange={(keys) => {
              const selectedId = Number(Array.from(keys)[0]);
              updateStoreData({ state: selectedId, city: undefined });
            }}
          >
            {states!.map((state) => (
              <SelectItem key={state.id.toString()}>{state.name}</SelectItem>
            ))}
          </Select>
        ))}

      {/* City Select */}
      {storeData.state &&
        (loadingCities ? (
          <Spinner />
        ) : (
          <Select
            label="City"
            selectedKeys={storeData.city ? new Set([storeData.city.toString()]) : undefined}
            onSelectionChange={(keys) => {
              const selectedId = Number(Array.from(keys)[0]);
              updateStoreData({ city: selectedId });
            }}
          >
            {cities!.map((city) => (
              <SelectItem key={city.id.toString()}>{city.name}</SelectItem>
            ))}
          </Select>
        ))}

      {/* Navigation */}
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
