'use client';

import { PropsWithChildren } from 'react';
import { UserProvider } from '@/context/userContext';
import { QueryContext } from '@/context/queryContext';
import TonConnectClientProvider from '@/providers/TonConnectClientProvider';
import dynamic from 'next/dynamic';

const InitTelegram = dynamic(() => import('@/libs/common/components/init-telegram'), {
  ssr: false,
});

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
