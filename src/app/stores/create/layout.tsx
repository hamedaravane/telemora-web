import { StoreCreationProvider } from '@/context/storeCreationContext';
import type { PropsWithChildren } from 'react';

export default function StoreCreationLayout({ children }: PropsWithChildren) {
  return <StoreCreationProvider>{children}</StoreCreationProvider>;
}
