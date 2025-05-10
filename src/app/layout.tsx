import './globals.css';
import '@telegram-apps/telegram-ui/dist/styles.css';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { AppProvider } from '@/providers/AppProvider';

export const metadata: Metadata = {
  title: 'Telemora',
  description: 'Telegram mini app',
  applicationName: 'Telemora',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
