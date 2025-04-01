'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Switch } from '@heroui/react';
import { useStoreCreation } from '@/context/store-creation-context';
import AppLayout from '@/components/shared/app-layout';
import { WorkingHour } from '@/libs/stores/types';
import { PageHeader } from '@/components/shared/page-header';

const DAYS: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function CreateStoreWorkingHours() {
  const router = useRouter();
  const { storeData, updateStoreData } = useStoreCreation();

  const [workingHours, setWorkingHours] = useState<Record<string, WorkingHour>>(() => {
    const initial = storeData.workingHours ?? {};
    return DAYS.reduce(
      (acc, day) => {
        acc[day] = initial[day] || { open: '', close: '' };
        return acc;
      },
      {} as Record<string, WorkingHour>,
    );
  });

  const handleChange = (day: string, field: 'open' | 'close', value: string) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const toggleDay = (day: string) => {
    setWorkingHours((prev) => {
      const isClosed = !prev[day].open && !prev[day].close;
      return {
        ...prev,
        [day]: isClosed ? { open: '', close: '' } : { open: '', close: '' },
      };
    });
  };

  const handleNext = () => {
    const cleanWorkingHours = Object.fromEntries(
      Object.entries(workingHours).filter(([_, { open, close }]) => open && close),
    );
    updateStoreData({ workingHours: cleanWorkingHours });
    router.push('/stores/create/logo-upload');
  };

  const handleBack = () => {
    router.push('/stores/create/category-selection');
  };

  return (
    <AppLayout>
      <div className="text-sm text-gray-500 mb-4">Step 4 of 5</div>
      <PageHeader
        title="Store Working Hours"
        subtitle="Optionally set when your store is open. Customers will see this info on your store page."
      />

      <div className="space-y-5">
        {DAYS.map((day) => {
          const { open, close } = workingHours[day];
          const isClosed = !open && !close;
          const invalid = open && close && open >= close;

          return (
            <div key={day}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{day}</span>
                <Switch isSelected={!isClosed} onChange={() => toggleDay(day)} size="sm">
                  Open
                </Switch>
              </div>

              {!isClosed && (
                <>
                  <div className="flex gap-4">
                    <Input
                      type="time"
                      label="Open"
                      size="sm"
                      value={open}
                      onChange={(e) => handleChange(day, 'open', e.target.value)}
                      isInvalid={invalid || undefined}
                    />
                    <Input
                      type="time"
                      label="Close"
                      size="sm"
                      value={close}
                      onChange={(e) => handleChange(day, 'close', e.target.value)}
                      isInvalid={invalid || undefined}
                    />
                  </div>
                  {invalid && (
                    <p className="text-red-500 text-xs mt-1">
                      Opening time must be earlier than closing time.
                    </p>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex gap-x-2">
        <Button variant="bordered" onPress={handleBack}>
          Back
        </Button>
        <Button variant="ghost" onPress={handleNext}>
          Skip
        </Button>
        <Button fullWidth onPress={handleNext}>Next</Button>
      </div>
    </AppLayout>
  );
}
