'use client';

import { type PropsWithChildren } from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useClientOnce } from '@/hooks/useClientOnce';
import { useDidMount } from '@/hooks/useDidMount';
import { init } from '@/core/init';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import ErrorPage from '@/components/shared/errorPage';
import { UseTelegramMock } from '@/hooks/useTelegramMock';
import SplashScreen from '@/components/shared/splash-screen';

export default function InitTelegram({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === 'development';

  UseTelegramMock(isDev);

  const didMount = useDidMount();

  const launchParams = useLaunchParams();

  const debug = isDev || launchParams?.startParam === 'debug';

  useClientOnce(() => {
    init(debug);
  });

  if (!didMount) {
    return <SplashScreen />;
  }

  return <ErrorBoundary fallback={ErrorPage}>{children}</ErrorBoundary>;
}
