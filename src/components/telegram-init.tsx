'use client';

import { useEffect } from 'react';
import { init } from '@telegram-apps/sdk-react';

export default function TelegramInit() {
  useEffect(() => {
    init();
  }, []);

  return null;
}
