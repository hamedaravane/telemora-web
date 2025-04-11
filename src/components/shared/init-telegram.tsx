'use client';

import { PropsWithChildren, useEffect } from 'react';
import { init, isTMA, mockTelegramEnv } from '@telegram-apps/sdk-react';

export default function InitTelegram({ children }: PropsWithChildren) {
  useEffect(() => {
    isTMA('complete').then((res) => {
      if (res) {
        init();
      } else {
        mockTelegramEnv();
        init();
      }
    });
  }, []);
  return <>{children}</>;
}
