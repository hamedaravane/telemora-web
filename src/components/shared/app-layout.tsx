'use client';

import React from 'react';
import CustomNavbar from './navbar';
import BottomNavigation from './bottom-navigation';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen px-4">
      <CustomNavbar />
      <div className="overflow-y-scroll">{children}</div>
      <div className="h-24"></div>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
