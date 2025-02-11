'use client';
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

export default function SplashScreen() {
  const [userData, setUserData] = useState<unknown | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user);
    }
  }, []);

  return (
    <div>
      <p>
        this page supposed to role as splash screen which automatically redirects to marketplace
        page after auth user
      </p>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}
