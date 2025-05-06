'use client';

import { mockTelegramEnv, retrieveRawLaunchParams } from '@telegram-apps/sdk-react';

import { useClientOnce } from '@/libs/common/hooks/useClientOnce';
import { mockLaunchParams } from '@/libs/common/mocks';

export function UseTelegramMock(enable: boolean): void {
  useClientOnce(() => {
    if (typeof window === 'undefined') return;
    if (!enable) return;

    try {
      mockTelegramEnv({ launchParams: retrieveRawLaunchParams() });
    } catch (e) {
      mockTelegramEnv({
        launchParams: mockLaunchParams,
      });
    }

    console.warn('🧪 Telegram environment mocked');
  });
}
