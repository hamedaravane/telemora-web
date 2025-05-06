'use client';

import { usePathname } from 'next/navigation';
import { FaClipboard, FaHome, FaStore, FaUser } from 'react-icons/fa';
import { Tab, Tabs } from '@heroui/react';

const TABS = [
  { key: 'market', href: '/market', label: 'Market', icon: <FaHome /> },
  { key: 'stores', href: '/stores', label: 'Stores', icon: <FaStore /> },
  { key: 'orders', href: '/orders', label: 'Orders', icon: <FaClipboard /> },
  { key: 'profile', href: '/profile', label: 'Profile', icon: <FaUser /> },
];

export default function BottomTabs() {
  const pathname = usePathname();

  return (
    <Tabs
      selectedKey={pathname}
      size="lg"
      fullWidth
      placement="bottom"
      classNames={{
        tabWrapper: 'px-4 mb-6 fixed bottom-0 z-50 w-full',
        base: '',
        tabList: '',
        tab: 'h-16',
        tabContent: 'flex flex-col items-center gap-1 text-sm',
      }}
    >
      {TABS.map(({ key, href, label, icon }) => (
        <Tab
          key={key}
          href={href}
          title={
            <>
              {icon} {label}
            </>
          }
          titleValue={label}
        />
      ))}
    </Tabs>
  );
}
