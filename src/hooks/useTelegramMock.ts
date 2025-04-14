'use client';

import { isTMA, mockTelegramEnv, retrieveRawLaunchParams } from '@telegram-apps/sdk-react';
import { useClientOnce } from '@/hooks/useClientOnce';
import { mockLaunchParams } from '@/libs/common/mocks';

export function UseTelegramMock(enable: boolean): void {
  useClientOnce(() => {
    if (!enable) return;
    if (isTMA()) return;
    const isSsr = typeof window === 'undefined';
    if (isSsr) return;

    try {
      mockTelegramEnv({ launchParams: retrieveRawLaunchParams() });
    } catch (e) {
      console.log('Failed to retrieve launch params', e);

      mockTelegramEnv({
        launchParams: mockLaunchParams,
      });
    }
  });

  console.warn('🧪 Telegram environment mocked');
}
