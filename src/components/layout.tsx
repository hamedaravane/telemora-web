"use client";

import { FC, ReactNode } from "react";

import CustomNavbar from "./navbar";
import BottomNavigation from "./bottom-navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <CustomNavbar />
      <div className="pt-16 pb-20">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
