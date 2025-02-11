"use client";

import { FC, ReactNode } from "react";

import BottomNavigation from "./bottom-navigation";
import BackwardNavbar from "@/components/backward-navbar";

interface LayoutProps {
    children: ReactNode;
}

const InnerLayout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="h-screen relative">
            <BackwardNavbar />
            <div className="overflow-y-scroll">{children}</div>
            <BottomNavigation />
        </div>
    );
};

export default InnerLayout;
