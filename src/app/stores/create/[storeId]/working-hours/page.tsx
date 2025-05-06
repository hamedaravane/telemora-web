'use client';

import { Button, Form, Input, Progress, Switch } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { hapticFeedback } from '@telegram-apps/sdk-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import AppLayout from '@/libs/common/components/app-layout';
import { PageHeader } from '@/libs/common/components/page-header';
import { useSubmitStoreWorkingHoursMutation } from '@/libs/stores/hooks';
import { CreateStoreWorkingHoursDto, storeWorkingHoursFormSchema } from '@/libs/stores/schemas';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function CreateStoreWorkingHours() {
  const router = useRouter();
  const { storeId } = useParams<{ storeId: string }>();
  const { mutateAsync, isPending } = useSubmitStoreWorkingHoursMutation(storeId);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateStoreWorkingHoursDto>({
    resolver: zodResolver(storeWorkingHoursFormSchema),
    defaultValues: {
      workingHours: {},
    },
  });

  const workingHours = watch('workingHours');

  const enabledDays = useMemo(
    () =>
      new Set(
        Object.entries(workingHours || {})
          .filter(([_, val]) => val.open && val.close)
          .map(([day]) => day),
      ),
    [workingHours],
  );

  const toggleDay = (day: string) => {
    if (enabledDays.has(day)) {
      const updated = { ...workingHours };
      delete updated[day];
      setValue('workingHours', updated, { shouldValidate: true });
    } else {
      setValue(
        'workingHours',
        {
          ...workingHours,
          [day]: { open: '09:00', close: '17:00' },
        },
        { shouldValidate: true },
      );
    }
  };

  const handleNext = async (data: CreateStoreWorkingHoursDto) => {
    const hasInvalidRange = Object.entries(data.workingHours || {}).some(
      ([_, { open, close }]) => open >= close,
    );

    if (hasInvalidRange) {
      toast.error('Fix time ranges (open < close)');
      return;
    }

    try {
      await mutateAsync(data);
      toast.success('Working hours saved');
      hapticFeedback.impactOccurred('light');
      router.push(`/stores/create/${storeId}/logo-upload`);
    } catch {
      toast.error('Failed to save working hours');
    }
  };

  return (
    <AppLayout>
      <Form onSubmit={handleSubmit(handleNext)}>
        <Progress label="Step 4 of 5" maxValue={5} value={4} size="sm" />

        <PageHeader
          title="Working Hours"
          subtitle="Optionally set your store’s weekly availability"
        />

        <div className="mt-6 space-y-5">
          {DAYS.map((day) => {
            const isEnabled = enabledDays.has(day);
            const open = workingHours?.[day]?.open ?? '';
            const close = workingHours?.[day]?.close ?? '';
            const invalid = isEnabled && open && close && open >= close;

            return (
              <div key={day}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">{day}</span>
                  <Switch isSelected={isEnabled} onChange={() => toggleDay(day)} size="sm">
                    Open
                  </Switch>
                </div>

                {isEnabled && (
                  <>
                    <div className="flex gap-4">
                      <Controller
                        control={control}
                        name={`workingHours.${day}.open`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="time"
                            label="Open"
                            size="sm"
                            isInvalid={!!invalid}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`workingHours.${day}.close`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="time"
                            label="Close"
                            size="sm"
                            isInvalid={!!invalid}
                          />
                        )}
                      />
                    </div>
                    {invalid && (
                      <p className="mt-1 text-xs text-red-500">
                        Opening time must be earlier than closing time.
                      </p>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-10" id="summary">
          <h2 className="mb-2 text-lg font-semibold">Weekly Summary</h2>
          <ul className="space-y-1 text-sm text-default-600">
            {DAYS.map((day) => {
              const isOpen = enabledDays.has(day);
              const { open, close } = workingHours?.[day] || {};
              return (
                <li key={day} className="flex justify-between">
                  <span>{day}</span>
                  <span className={isOpen ? 'text-green-600' : 'text-gray-400'}>
                    {isOpen ? `${open} – ${close}` : 'Closed'}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 flex gap-x-2">
          <Button variant="bordered" type="button" onPress={() => router.back()}>
            Back
          </Button>
          <Button
            variant="ghost"
            type="button"
            onPress={() => router.push(`/stores/create/${storeId}/logo-upload`)}
          >
            Skip
          </Button>
          <Button fullWidth type="submit" isLoading={isPending}>
            Next
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
}
