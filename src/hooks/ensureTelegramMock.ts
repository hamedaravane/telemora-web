import { isTMA, mockTelegramEnv } from '@telegram-apps/sdk-react';

let isMocked = false;

export function ensureTelegramMock(enable: boolean): void {
  if (!enable || typeof window === 'undefined' || isMocked) return;
  if (sessionStorage.getItem('env-mocked') || isTMA()) return;

  isMocked = true;

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

  mockTelegramEnv({
    launchParams: {
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
    },
    resetPostMessage: true,
    onEvent: ([event, payload], next) => {
      console.info('🧪 Mock Telegram Event:', event, payload);
      next();
    },
  });

  sessionStorage.setItem('env-mocked', '1');

  console.warn('🧪 Telegram environment mocked');
}
