import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/shared/app-providers';

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
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
