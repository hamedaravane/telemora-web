'use client';

import { PropsWithChildren, useMemo } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { useClientOnce } from '@/hooks/useClientOnce';
import { useDidMount } from '@/hooks/useDidMount';
import { init } from '@/core/init';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import ErrorPage from '@/components/shared/errorPage';
import { ensureTelegramMock } from '@/hooks/ensureTelegramMock';
import SplashScreen from '@/components/shared/splash-screen';

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
    return <SplashScreen />;
  }

  return <ErrorBoundary fallback={ErrorPage}>{children}</ErrorBoundary>;
}
