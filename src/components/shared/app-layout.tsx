'use client';

import React, { PropsWithChildren } from 'react';
import CustomNavbar from './navbar';
import BottomNavigation from './bottom-navigation';

export default function AppLayout({ children }: PropsWithChildren) {
  /* TODO: AppLayout double scroll – body has its own scroll and you add another .overflow-y-scroll;
      on iOS WebView this can trap the user.
      Consider letting the body scroll and reserve space for the fixed bottom bar. */
  return (
    <div className="min-h-screen">
      <CustomNavbar />
      <div className="overflow-y-scroll px-4">{children}</div>
      <div className="h-24"></div>
      <BottomNavigation />
    </div>
  );
}
