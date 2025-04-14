'use client';

import { mockTelegramEnv, retrieveRawLaunchParams } from '@telegram-apps/sdk-react';
import { useClientOnce } from '@/hooks/useClientOnce';
import { mockLaunchParams } from '@/libs/common/mocks';

export function UseTelegramMock(enable: boolean): void {
  useClientOnce(() => {
    if (!enable) return;

    try {
      mockTelegramEnv({ launchParams: retrieveRawLaunchParams() });
    } catch (e) {
      console.warn('Failed to retrieve launch params', e);

      mockTelegramEnv({
        launchParams: mockLaunchParams,
      });
    }

    console.warn('🧪 Telegram environment mocked');
  });
}
