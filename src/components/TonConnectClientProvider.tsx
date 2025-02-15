'use client';

import { type PropsWithChildren, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicTonConnectUIProvider = dynamic(
  () => import('@tonconnect/ui-react').then((mod) => mod.TonConnectUIProvider),
  { ssr: false },
);

export default function TonConnectClientProvider({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <DynamicTonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      {children}
    </DynamicTonConnectUIProvider>
  );
}
