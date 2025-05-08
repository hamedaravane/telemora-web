'use client';

import React, { PropsWithChildren } from 'react';

import BottomTabs from '@/libs/common/components/BottomTabs';

import CustomNavbar from './navbar';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <CustomNavbar />
      <main className="mb-12 flex-1 px-4">{children}</main>
      <BottomTabs />
    </div>
  );
}
