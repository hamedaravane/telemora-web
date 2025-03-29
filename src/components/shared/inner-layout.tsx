'use client';

import BottomNavigation from './bottom-navigation';
import BackwardNavbar from '@/components/shared/backward-navbar';

const InnerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen relative">
      <BackwardNavbar />
      <div className="overflow-y-scroll">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default InnerLayout;
