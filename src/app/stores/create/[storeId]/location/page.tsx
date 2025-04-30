'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form, Input, Progress, Select, SelectItem, Skeleton } from '@heroui/react';
import { locationManager, useSignal } from '@telegram-apps/sdk-react';
import { FaGear, FaLocationDot } from 'react-icons/fa6';
import AppLayout from '@/components/shared/app-layout';
import { PageHeader } from '@/components/shared/page-header';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateAddressDto, storeAddressFormSchema } from '@/libs/stores/schemas';
import { useSubmitStoreAddressMutation } from '@/libs/stores/hooks';
import toast from 'react-hot-toast';
import {
  useCitiesByState,
  useCountries,
  useNearestLocation,
  useStatesByCountry,
} from '@/libs/location/hooks';

export default function CreateStoreLocation() {
  const { storeId } = useParams<{ storeId: string }>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateAddressDto>({
    resolver: zodResolver(storeAddressFormSchema),
    defaultValues: {
      countryId: 0,
      stateId: undefined,
      cityId: undefined,
      streetLine1: '',
      streetLine2: '',
      postalCode: '',
      latitude: undefined,
      longitude: undefined,
    },
  });

  const countryId = watch('countryId');
  const stateId = watch('stateId');

  const { data: countries = [], isLoading: loadingCountries } = useCountries();
  const { data: states = [], isLoading: loadingStates } = useStatesByCountry(countryId);
  const { data: cities = [], isLoading: loadingCities } = useCitiesByState(stateId);

  const isSupported = useSignal(locationManager.isSupported);
  const isAccessGranted = useSignal(locationManager.isAccessGranted);

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectError, setDetectError] = useState<string | null>(null);

  const { data: nearest, isFetching: nearestLoading } = useNearestLocation(
    coords?.lat,
    coords?.lng,
  );

  const { mutateAsync: updateLocation, isPending } = useSubmitStoreAddressMutation(storeId);

  useEffect(() => {
    if (nearest && coords) {
      setValue('countryId', nearest.country.id);
      if (nearest.state?.id) setValue('stateId', nearest.state.id);
      if (nearest.city?.id) {
        setValue('cityId', nearest.city.id);
        setValue('postalCode', nearest.city.postalCode ?? '');
      }
      setValue('latitude', coords.lat);
      setValue('longitude', coords.lng);
    }
  }, [nearest, coords, setValue]);

  const detectLocation = async () => {
    setIsDetecting(true);
    setDetectError(null);

    try {
      await locationManager.mount();
      const location = await locationManager.requestLocation();
      setCoords({ lat: location.latitude, lng: location.longitude });
    } catch (err) {
      console.error(err);
      if (!isAccessGranted) {
        setDetectError('Telegram denied location access. Please enable it in settings.');
      } else {
        setDetectError('Location detection failed. Please try manually.');
      }
    } finally {
      setIsDetecting(false);
    }
  };

  const onSubmit = async (data: CreateAddressDto) => {
    try {
      await updateLocation(data);
      toast.success('Store location updated!');
      router.push(`/stores/create/${storeId}/tags`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save location');
    }
  };

  return (
    <AppLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Progress label="Step 2 of 5" maxValue={5} value={2} size="sm" />

        <PageHeader
          title="Store Location"
          subtitle="Help customers find you by setting your store address."
        />

        <div className="flex gap-4 mb-4">
          <Button
            fullWidth
            size="sm"
            variant="flat"
            onPress={detectLocation}
            isDisabled={!isSupported || isDetecting || nearestLoading}
          >
            <FaLocationDot />
            {isDetecting ? 'Detecting…' : 'Use Telegram Location'}
          </Button>

          {!isAccessGranted && (
            <Button
              fullWidth
              size="sm"
              variant="flat"
              onPress={() => locationManager.openSettings()}
            >
              <FaGear />
              Open Telegram Settings
            </Button>
          )}
        </div>

        {detectError && <p className="text-sm text-red-500">{detectError}</p>}

        {/* Country */}
        <Skeleton isLoaded={!loadingCountries}>
          <Select
            label="Country"
            selectedKeys={countryId ? new Set([countryId.toString()]) : undefined}
            onSelectionChange={(keys) => {
              const selectedId = Number(Array.from(keys)[0]);
              setValue('countryId', selectedId);
              setValue('stateId', undefined);
              setValue('cityId', undefined);
            }}
          >
            {countries.map((country) => (
              <SelectItem key={country.id.toString()}>{country.name}</SelectItem>
            ))}
          </Select>
        </Skeleton>

        {/* State */}
        {countryId && (
          <Skeleton isLoaded={!loadingStates}>
            <Select
              label="State"
              selectedKeys={stateId ? new Set([stateId.toString()]) : undefined}
              onSelectionChange={(keys) => {
                const selectedId = Number(Array.from(keys)[0]);
                setValue('stateId', selectedId);
                setValue('cityId', undefined);
              }}
            >
              {states.map((state) => (
                <SelectItem key={state.id.toString()}>{state.name}</SelectItem>
              ))}
            </Select>
          </Skeleton>
        )}

        {/* City */}
        {stateId && (
          <Skeleton isLoaded={!loadingCities}>
            <Select
              label="City"
              selectedKeys={watch('cityId') ? new Set([watch('cityId')!.toString()]) : undefined}
              onSelectionChange={(keys) => {
                const selectedId = Number(Array.from(keys)[0]);
                setValue('cityId', selectedId);
              }}
            >
              {cities.map((city) => (
                <SelectItem key={city.id.toString()}>{city.name}</SelectItem>
              ))}
            </Select>
          </Skeleton>
        )}

        {/* Street */}
        <Input
          label="Street Line 1"
          placeholder="e.g. 123 Main Street"
          {...register('streetLine1')}
          errorMessage={errors.streetLine1?.message}
          isInvalid={!!errors.streetLine1}
          className="mt-4"
        />

        <Input label="Street Line 2 (Optional)" {...register('streetLine2')} className="mt-2" />

        <Input label="Postal Code (Optional)" {...register('postalCode')} className="mt-2" />

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <Button type="button" variant="bordered" onPress={() => router.back()}>
            Back
          </Button>
          <Button type="submit" color="primary" isLoading={isPending}>
            Save & Continue
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
}
