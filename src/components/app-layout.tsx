"use client";

import { FC, ReactNode } from "react";

import CustomNavbar from "./navbar";
import BottomNavigation from "./bottom-navigation";

interface LayoutProps {
  children: ReactNode;
}

const AppLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen relative">
      <CustomNavbar />
      <div className="overflow-y-scroll">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
