'use client';

import { usePathname } from 'next/navigation';
import { FaClipboard, FaHome, FaStore, FaUser } from 'react-icons/fa';
import { Tab, Tabs } from '@heroui/react';

const TABS = [
  { key: 'market', href: '/market', label: 'Market', icon: <FaHome size={18} /> },
  { key: 'stores', href: '/stores', label: 'Stores', icon: <FaStore size={18} /> },
  { key: 'orders', href: '/orders', label: 'Orders', icon: <FaClipboard size={18} /> },
  { key: 'profile', href: '/profile', label: 'Profile', icon: <FaUser size={18} /> },
];

export default function BottomTabs() {
  const pathname = usePathname();

  return (
    <Tabs aria-label="Options" selectedKey={pathname}>
      {TABS.map(({ key, href, label, icon }) => (
        <Tab key={key} title={label} href={href}>
          {icon}
        </Tab>
      ))}
    </Tabs>
  );
}
