'use client';

import { PropsWithChildren, useEffect } from 'react';
import { init } from '@telegram-apps/sdk';

export default function InitTelegram({ children }: PropsWithChildren) {
  useEffect(() => {
    try {
      init();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return <>{children}</>;
}
