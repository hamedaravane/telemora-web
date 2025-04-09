'use client';

import { Spinner } from '@heroui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/market');
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner size="sm" color="white" label="Redirecting..." />
    </div>
  );
}
