import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { UserProvider } from '@/context/user-context';
import { QueryContext } from '@/context/query-context';
import TonConnectClientProvider from '@/components/TonConnectClientProvider';
import TelegramInit from '@/components/telegram-init';

export const metadata: Metadata = {
  title: 'Telemart',
  description: 'Telegram mini app',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=400, initial-scale=1.0, user-scalable=no" />
        <title></title>
      </head>
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
