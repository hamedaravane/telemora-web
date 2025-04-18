'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Select, SelectItem, Skeleton } from '@heroui/react';
import { locationManager, useSignal } from '@telegram-apps/sdk-react';

import { useStoreCreation } from '@/context/storeCreationContext';

import AppLayout from '@/components/shared/app-layout';
import { PageHeader } from '@/components/shared/page-header';
import { FaGear, FaLocationDot } from 'react-icons/fa6';
import {
  useCitiesByState,
  useCountries,
  useNearestLocation,
  useStatesByCountry,
} from '@/libs/location/location-api';

export default function CreateStoreLocation() {
  const router = useRouter();
  const { storeData, updateStoreData } = useStoreCreation();

  const { countryId, stateId, cityId } = storeData;

  const { data: countries, isLoading: loadingCountries } = useCountries();
  const { data: states, isLoading: loadingStates } = useStatesByCountry(countryId);
  const { data: cities, isLoading: loadingCities } = useCitiesByState(stateId);

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

      /* TODO: The event‑handler detectLocation calls useNearestLocation inside an async function.
          useNearestLocation itself wraps useQuery,
          so calling it conditionally / after user interaction throws “Invalid hook call” */
      const { data: nearest } = useNearestLocation(location.latitude, location.longitude);

      updateStoreData({
        countryId: nearest?.country.id,
        stateId: nearest?.state?.id,
        cityId: nearest?.city?.id,
        postalCode: nearest?.city?.postalCode,
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

  const handleNext = () => router.push('/stores/create/tags');
  const handleBack = () => router.push('/stores/create/basic-information');

  return (
    <AppLayout>
      <div className="text-sm text-gray-500 mb-4">Step 2 of 5</div>
      <PageHeader
        title="Store Address"
        subtitle="Let customers know where your store is located. This helps local buyers discover you."
      />

      <div className="flex gap-4 mb-4">
        <Button
          fullWidth
          size="sm"
          variant="flat"
          onPress={detectLocation}
          isDisabled={!isSupported || isDetecting}
        >
          <FaLocationDot />
          {isDetecting ? 'Detecting…' : 'Use Telegram Location'}
        </Button>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        {!isAccessGranted && (
          <Button fullWidth size="sm" variant="flat" onPress={() => locationManager.openSettings()}>
            <FaGear />
            Open Telegram Settings
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Country */}
        <Skeleton className="rounded-md" isLoaded={!loadingCountries}>
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
            {countries ? (
              countries.map((country) => (
                <SelectItem key={country.id.toString()}>{country.name}</SelectItem>
              ))
            ) : (
              <SelectItem key="0">Loading…</SelectItem>
            )}
          </Select>
        </Skeleton>

        {/* State */}
        {countryId && (
          <Skeleton className="rounded-md" isLoaded={!loadingStates}>
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
              {states ? (
                states.map((state) => (
                  <SelectItem key={state.id.toString()}>{state.name}</SelectItem>
                ))
              ) : (
                <SelectItem key="0">Loading…</SelectItem>
              )}
            </Select>
          </Skeleton>
        )}

        {/* City */}
        {stateId && (
          <Skeleton className="rounded-md" isLoaded={!loadingCities}>
            <Select
              label="City"
              selectedKeys={cityId ? new Set([cityId.toString()]) : undefined}
              onSelectionChange={(keys) => {
                const selectedId = Number(Array.from(keys)[0]);
                updateStoreData({ cityId: selectedId });
              }}
            >
              {cities ? (
                cities.map((city) => <SelectItem key={city.id.toString()}>{city.name}</SelectItem>)
              ) : (
                <SelectItem key="0">Loading…</SelectItem>
              )}
            </Select>
          </Skeleton>
        )}
      </div>

      <Input
        label="Street Line 1 (Optional)"
        placeholder="e.g. 123 Main Street"
        value={storeData.streetLine1 || ''}
        onChange={(e) => updateStoreData({ streetLine1: e.target.value })}
        className="mt-4"
      />

      <div className="mt-6 flex gap-4">
        <Button variant="bordered" onPress={handleBack}>
          Back
        </Button>
        <Button variant="flat" onPress={handleNext}>
          Skip
        </Button>
        <Button fullWidth onPress={handleNext}>
          Next
        </Button>
      </div>
    </AppLayout>
  );
}
