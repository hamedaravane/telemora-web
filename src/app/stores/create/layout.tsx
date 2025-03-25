import { StoreCreationProvider } from '@/context/store-creation-context';
import type { PropsWithChildren } from 'react';

export default function StoreCreationLayout({ children }: PropsWithChildren) {
  return <StoreCreationProvider>{children}</StoreCreationProvider>;
}