import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { UserProvider } from '@/context/user-context';
import { QueryContext } from '@/context/query-context';

export const metadata: Metadata = {
  title: 'Telemart',
  description: 'Telegram mini app',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryContext>
          <UserProvider>{children}</UserProvider>
        </QueryContext>
      </body>
    </html>
  );
}
