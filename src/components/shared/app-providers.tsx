'use client';

import { PropsWithChildren } from 'react';
import { UserProvider } from '@/context/user-context';
import { QueryContext } from '@/context/query-context';
import TonConnectClientProvider from '@/components/shared/TonConnectClientProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <TonConnectClientProvider>
        <QueryContext>
          <UserProvider>{children}</UserProvider>
        </QueryContext>
      </TonConnectClientProvider>
    </>
  );
}
