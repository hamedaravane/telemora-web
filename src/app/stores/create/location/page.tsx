'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Select, SelectItem, Spinner } from '@heroui/react';
import { locationManager, useSignal } from '@telegram-apps/sdk-react';

import { useStoreCreation } from '@/context/store-creation-context';
import { getNearestLocation, useCities, useCountries, useStates } from '@/libs/location/location-api';

import AppLayout from '@/components/shared/app-layout';
import { PageHeader } from '@/components/shared/page-header';

export default function CreateStoreLocation() {
  const router = useRouter();
  const { storeData, updateStoreData } = useStoreCreation();

  const { countryId, stateId, cityId } = storeData;

  const { data: countries, isLoading: loadingCountries } = useCountries();
  const { data: states, isLoading: loadingStates } = useStates(countryId);
  const { data: cities, isLoading: loadingCities } = useCities(stateId);

  const isSupported = useSignal(locationManager.isSupported);
  const isAccessGranted = useSignal(locationManager.isAccessGranted);

  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = async () => {
    setIsDetecting(true);
    setError(null);

    try {
      await locationManager.mount();
      const location = await locationManager.requestLocation();

      const nearest = await getNearestLocation(location.latitude, location.longitude);

      updateStoreData({
        countryId: nearest.country?.id,
        stateId: nearest.state?.id,
        cityId: nearest.city?.id,
        postalCode: nearest.city?.postalCode,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } catch (err) {
      console.error('Location detection failed:', err);
      if (!isAccessGranted) {
        setError('Telegram denied location access. Please enable it in settings.');
      } else {
        setError('Location detection failed. Please select manually.');
      }
    } finally {
      setIsDetecting(false);
    }
  };

  const handleNext = () => router.push('/store/create/tags');
  const handleBack = () => router.push('/store/create/basic-information');

  return (
    <AppLayout>
      <div className="text-sm text-gray-500 mb-4">Step 2 of 5</div>
      <PageHeader
        title="Store Address"
        subtitle="Let customers know where your store is located. This helps local buyers discover you."
      />

      <div className="mb-4">
        <Button
          variant="bordered"
          size="sm"
          onPress={detectLocation}
          isDisabled={!isSupported || isDetecting}
        >
          {isDetecting ? 'Detecting…' : 'Use Telegram Location'}
        </Button>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        {!isAccessGranted && (
          <Button
            size="sm"
            variant="ghost"
            className="mt-2"
            onPress={() => locationManager.openSettings()}
          >
            Open Telegram Settings
          </Button>
        )}
      </div>

      {loadingCountries ? (
        <Spinner />
      ) : (
        <Select
          label="Country"
          selectedKeys={countryId ? new Set([countryId.toString()]) : undefined}
          onSelectionChange={(keys) => {
            const selectedId = Number(Array.from(keys)[0]);
            updateStoreData({
              countryId: selectedId,
              stateId: undefined,
              cityId: undefined,
            });
          }}
        >
          {countries!.map((country) => (
            <SelectItem key={country.id.toString()}>{country.name}</SelectItem>
          ))}
        </Select>
      )}

      {countryId &&
        (loadingStates ? (
          <Spinner />
        ) : (
          <Select
            label="State"
            selectedKeys={stateId ? new Set([stateId.toString()]) : undefined}
            onSelectionChange={(keys) => {
              const selectedId = Number(Array.from(keys)[0]);
              updateStoreData({
                stateId: selectedId,
                cityId: undefined,
              });
            }}
          >
            {states!.map((state) => (
              <SelectItem key={state.id.toString()}>{state.name}</SelectItem>
            ))}
          </Select>
        ))}

      {stateId &&
        (loadingCities ? (
          <Spinner />
        ) : (
          <Select
            label="City"
            selectedKeys={cityId ? new Set([cityId.toString()]) : undefined}
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

      <Input
        label="Street Line 1 (Optional)"
        placeholder="e.g. 123 Main Street"
        value={storeData.streetLine1 || ''}
        onChange={(e) => updateStoreData({ streetLine1: e.target.value })}
        className="mt-4"
      />

      <div className="mt-6 flex justify-between">
        <Button variant="bordered" onPress={handleBack}>
          Back
        </Button>
        <Button onPress={handleNext}>Next</Button>
      </div>

      <div className="text-center mt-4">
        <Button variant="ghost" size="sm" onPress={handleNext}>
          Skip
        </Button>
      </div>
    </AppLayout>
  );
}
