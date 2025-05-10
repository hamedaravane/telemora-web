'use client';

import React, { PropsWithChildren } from 'react';

import BackwardNavbar from '@/libs/common/components/backward-navbar';

import BottomNavigation from './BottomTabs';

const InnerLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative h-screen">
      <BackwardNavbar />
      <div className="overflow-y-scroll">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default InnerLayout;
