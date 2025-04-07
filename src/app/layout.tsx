import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { UserProvider } from '@/context/user-context';
import { QueryContext } from '@/context/query-context';
import TonConnectClientProvider from '@/components/shared/TonConnectClientProvider';
import TelegramInit from '@/components/shared/telegram-init';

export const metadata: Metadata = {
  title: 'Telemora',
  description: 'Telegram mini app',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
      <TelegramInit />
        <TonConnectClientProvider>
          <QueryContext>
            <UserProvider>{children}</UserProvider>
          </QueryContext>
        </TonConnectClientProvider>
      </body>
    </html>
  );
}
