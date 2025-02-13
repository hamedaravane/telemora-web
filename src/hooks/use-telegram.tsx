'use client';

import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

export function useTelegram() {
  const [initData, setInitData] = useState<typeof WebApp.initData | null>(null);

  useEffect(() => {
    if (WebApp && WebApp.initData) {
      setInitData(WebApp.initData);
    }
  }, []);

  return initData;
}
