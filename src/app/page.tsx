'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/shared/splash-screen';

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/market');
  }, [router]);

  return <SplashScreen />;
}
