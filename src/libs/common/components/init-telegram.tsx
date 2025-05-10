'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';
import { type PropsWithChildren } from 'react';

import { init } from '@/core/init';
import { ErrorBoundary } from '@/libs/common/components/ErrorBoundary';
import SplashScreen from '@/libs/common/components/splash-screen';
import { useClientOnce } from '@/libs/common/hooks/useClientOnce';
import { useDidMount } from '@/libs/common/hooks/useDidMount';
import { UseTelegramMock } from '@/libs/common/hooks/useTelegramMock';

import { isDev } from '../utils';

export default function InitTelegram({ children }: PropsWithChildren) {
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

  return <ErrorBoundary fallback={TelegramErrorPage}>{children}</ErrorBoundary>;
}

function TelegramErrorPage({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  console.warn(error);
  return (
    <main>
      <pre>it seems you do not use telegram env</pre>
      <button onClick={reset}></button>
    </main>
  );
}
