'use client';
// import { useEffect, useState } from 'react';
// import WebApp from '@twa-dev/sdk';

import { Spinner } from '@heroui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const router = useRouter();
  /*const [userData, setUserData] = useState<unknown | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user);
    }
  }, []);*/
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/market');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen bg-neutral-800">
      <div className="w-24 h-3/5 mx-auto flex justify-center items-end">
        <Spinner size="sm" color="white" label="Authenticating..." />
      </div>
    </div>
  );
}
