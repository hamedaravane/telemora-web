import { isTMA, mockTelegramEnv, retrieveRawLaunchParams } from '@telegram-apps/sdk-react';
import { useClientOnce } from '@/hooks/useClientOnce';
import { mockLaunchParams } from '@/libs/common/mocks';

export function UseTelegramMock(enable: boolean): void {
  useClientOnce(() => {
    if (!enable || typeof window === 'undefined') return;
    if (sessionStorage.getItem('env-mocked') || isTMA()) return;

    try {
      mockTelegramEnv({ launchParams: retrieveRawLaunchParams() });
    } catch (e) {
      console.log('Failed to retrieve launch params', e);

      mockTelegramEnv({
        launchParams: mockLaunchParams,
      });
    }
  });

  sessionStorage.setItem('env-mocked', '1');
  console.warn('🧪 Telegram environment mocked');
}
