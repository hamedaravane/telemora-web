'use client';

import { PropsWithChildren, useMemo } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { useClientOnce } from '@/hooks/useClientOnce';
import { useDidMount } from '@/hooks/useDidMount';
import { init } from '@/core/init';
import { Spinner } from '@heroui/react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import ErrorPage from '@/components/shared/errorPage';
import { ensureTelegramMock } from '@/hooks/ensureTelegramMock';

export default function InitTelegram({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === 'development';

  ensureTelegramMock(isDev);

  const didMount = useDidMount();

  const launchParams = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    try {
      return retrieveLaunchParams();
    } catch {
      return undefined;
    }
  }, []);

  const debug = isDev || launchParams?.startParam === 'debug';

  useClientOnce(() => {
    init(debug);
  });

  if (!didMount) {
    return <Spinner label="Initializing..." />;
  }

  return <ErrorBoundary fallback={ErrorPage}>{children}</ErrorBoundary>;
}
