'use client';

import React, { PropsWithChildren } from 'react';
import CustomNavbar from './navbar';
import BottomNavigation from './bottom-navigation';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <CustomNavbar />
      <main className="flex-1 px-4 pb-24">{children}</main>
      <BottomNavigation />
    </div>
  );
}
