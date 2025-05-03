'use client';

import BottomNavigation from './bottom-navigation';
import BackwardNavbar from '@/libs/common/components/backward-navbar';
import React, { PropsWithChildren } from 'react';

const InnerLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen relative">
      <BackwardNavbar />
      <div className="overflow-y-scroll">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default InnerLayout;
