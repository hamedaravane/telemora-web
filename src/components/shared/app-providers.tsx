'use client';

import { PropsWithChildren } from 'react';
import { UserProvider } from '@/context/user-context';
import { QueryContext } from '@/context/query-context';
import TonConnectClientProvider from '@/components/shared/TonConnectClientProvider';
import InitTelegram from '@/components/shared/init-telegram';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <InitTelegram>
        <TonConnectClientProvider>
          <QueryContext>
            <UserProvider>{children}</UserProvider>
          </QueryContext>
        </TonConnectClientProvider>
      </InitTelegram>
    </>
  );
}
