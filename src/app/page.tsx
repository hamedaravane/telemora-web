'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import SplashScreen from '@/libs/common/components/splash-screen';

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/market');
  }, [router]);

  return <SplashScreen />;
}
