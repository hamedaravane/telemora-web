'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@heroui/react';
import { useStoreCreation } from '@/context/store-creation-context';
import AppLayout from '@/components/app-layout';

export default function CreateStoreWorkingHours() {
  const { storeData, updateStoreData } = useStoreCreation();
  const router = useRouter();
  const [workingHours, setWorkingHours] = useState(
    storeData.workingHours || {
      Monday: { open: '', close: '' },
      Tuesday: { open: '', close: '' },
      Wednesday: { open: '', close: '' },
      Thursday: { open: '', close: '' },
      Friday: { open: '', close: '' },
      Saturday: { open: '', close: '' },
      Sunday: { open: '', close: '' },
    },
  );

  const handleNext = () => {
    updateStoreData({ workingHours });
    router.push('/store/create/logo-upload');
  };

  const handleBack = () => router.push('/store/create/category-selection');

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Step 4: Store Working Hours</h1>
      <p className="text-gray-600 mb-4">Set your store&#39;s working hours (optional).</p>

      {Object.keys(workingHours).map((day) => (
        <div key={day} className="mb-4">
          <h3 className="font-semibold">{day}</h3>
          <div className="flex gap-2">
            <Input
              label="Open Time"
              type="time"
              value={workingHours[day].open}
              onChange={(e) =>
                setWorkingHours({
                  ...workingHours,
                  [day]: { ...workingHours[day], open: e.target.value },
                })
              }
            />
            <Input
              label="Close Time"
              type="time"
              value={workingHours[day].close}
              onChange={(e) =>
                setWorkingHours({
                  ...workingHours,
                  [day]: { ...workingHours[day], close: e.target.value },
                })
              }
            />
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-between">
        <Button onPress={handleBack}>Back</Button>
        <Button onPress={handleNext}>Next</Button>
      </div>
    </AppLayout>
  );
}
