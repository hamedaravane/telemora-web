'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Switch } from '@heroui/react';
import { useStoreCreation } from '@/context/storeCreationContext';
import AppLayout from '@/components/shared/app-layout';
import { WorkingHour } from '@/libs/stores/types';
import { PageHeader } from '@/components/shared/page-header';
import toast from 'react-hot-toast';

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

  const [enabledDays, setEnabledDays] = useState<Set<string>>(() => {
    return new Set(
      Object.entries(storeData.workingHours || {})
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, hours]) => hours.open && hours.close)
        .map(([day]) => day),
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
    setEnabledDays((prev) => {
      const next = new Set(prev);
      const isNowEnabled = !prev.has(day);

      if (isNowEnabled) {
        next.add(day);

        setWorkingHours((prevHours) => ({
          ...prevHours,
          [day]: {
            open: prevHours[day]?.open || '09:00',
            close: prevHours[day]?.close || '17:00',
          },
        }));
      } else {
        next.delete(day);
      }

      return next;
    });
  };

  const handleNext = () => {
    const hasInvalidRange = Array.from(enabledDays).some((day) => {
      const { open, close } = workingHours[day];
      return open && close && open >= close;
    });

    if (hasInvalidRange) {
      toast.error('Please correct invalid time ranges before continuing.');
      document.querySelector('#summary')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const cleanWorkingHours = Object.fromEntries(
      Array.from(enabledDays)
        .map((day) => [day, workingHours[day] as WorkingHour])
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => (value as WorkingHour).open && (value as WorkingHour).close),
    );
    updateStoreData({ workingHours: cleanWorkingHours });
    router.push('/stores/create/logo-upload');
  };

  const handleBack = () => router.push('/stores/create/tags');

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
          const isEnabled = enabledDays.has(day);
          const invalid = open && close && open >= close;

          return (
            <div key={day}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{day}</span>
                <Switch isSelected={isEnabled} onChange={() => toggleDay(day)} size="sm">
                  Open
                </Switch>
              </div>

              {isEnabled && (
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

      {/* Summary Section */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Weekly Summary</h2>
        <ul className="text-sm text-default-600 space-y-1">
          {DAYS.map((day) => {
            const isOpen = enabledDays.has(day);
            const { open, close } = workingHours[day];

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
        <Button variant="bordered" onPress={handleBack}>
          Back
        </Button>
        <Button variant="ghost" onPress={handleNext}>
          Skip
        </Button>
        <Button fullWidth onPress={handleNext}>
          Next
        </Button>
      </div>
    </AppLayout>
  );
}
