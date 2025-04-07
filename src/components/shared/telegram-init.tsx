'use client';

import { useEffect } from 'react';
import { init, initDataRaw } from '@telegram-apps/sdk-react';

export default function TelegramInit() {
  useEffect(() => {
    init();
    localStorage.setItem('telegram-init-data', initDataRaw() || 'unavailable');
  }, []);

  return null;
}
