'use client';

import { PropsWithChildren } from 'react';
import { UserProvider } from '@/context/userContext';
import { QueryContext } from '@/context/queryContext';
import TonConnectClientProvider from '@/providers/TonConnectClientProvider';
import InitTelegram from '@/components/shared/init-telegram';

export function AppProvider({ children }: PropsWithChildren) {
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
