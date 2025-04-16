import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { AppProvider } from '@/providers/AppProvider';

export const metadata: Metadata = {
  title: 'Telemora',
  description: 'Telegram mini app',
  applicationName: 'Telemora',
  appleWebApp: {
    title: 'Telemora',
  },
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
