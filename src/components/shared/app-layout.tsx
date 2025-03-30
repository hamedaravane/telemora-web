'use client';

import React, { PropsWithChildren } from 'react';
import CustomNavbar from './navbar';
import BottomNavigation from './bottom-navigation';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <CustomNavbar />
      <div className="overflow-y-scroll px-4">{children}</div>
      <div className="h-24"></div>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
