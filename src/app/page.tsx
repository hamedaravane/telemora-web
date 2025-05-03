'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/libs/common/components/splash-screen';

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/market');
  }, [router]);

  return <SplashScreen />;
}
