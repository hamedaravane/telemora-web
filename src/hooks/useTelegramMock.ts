import { useClientOnce } from './useClientOnce';
import { isTMA, mockTelegramEnv } from '@telegram-apps/sdk-react';

export function useTelegramMock(enable: boolean): void {
  useClientOnce(() => {
    if (!enable) return;
    if (sessionStorage.getItem('env-mocked')) return;
    if (isTMA()) return;

    const tgWebAppData = new URLSearchParams([
      [
        'user',
        JSON.stringify({
          id: 99281932,
          first_name: 'Andrew',
          last_name: 'Rogue',
          username: 'rogue',
          language_code: 'en',
          is_premium: true,
          allows_write_to_pm: true,
        }),
      ],
      ['hash', 'mocked'],
      ['auth_date', `${Math.floor(Date.now() / 1000)}`],
      ['start_param', 'debug'],
      ['chat_type', 'sender'],
      ['chat_instance', '8428209589180549439'],
      ['signature', 'mocked'],
    ]).toString();

    const launchParams = {
      tgWebAppData,
      tgWebAppVersion: '8',
      tgWebAppPlatform: 'tdesktop',
      tgWebAppThemeParams: {
        accent_text_color: '#6ab2f2',
        bg_color: '#17212b',
        button_color: '#5288c1',
        button_text_color: '#ffffff',
        destructive_text_color: '#ec3942',
        header_bg_color: '#17212b',
        hint_color: '#708499',
        link_color: '#6ab3f3',
        secondary_bg_color: '#232e3c',
        section_bg_color: '#17212b',
        section_header_text_color: '#6ab3f3',
        subtitle_text_color: '#708499',
        text_color: '#f5f5f5',
      } as const,
    };

    mockTelegramEnv({
      launchParams,
      resetPostMessage: true,
      onEvent: ([event, payload], next) => {
        console.info('🧪 Mock Telegram Event:', event, payload);
        next();
      },
    });

    sessionStorage.setItem('env-mocked', '1');

    console.warn(
      '⚠️ Telegram environment has been mocked for development. This mock will not be applied in production or real Telegram environments.',
    );
  });
}
