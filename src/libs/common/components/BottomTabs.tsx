'use client';

import { Tab, Tabs } from '@heroui/react';
import { usePathname } from 'next/navigation';
import { FaClipboard, FaHome, FaStore, FaUser } from 'react-icons/fa';

const tabList = [
  { key: '/market', href: '/market', label: 'Market', icon: <FaHome size={15} /> },
  { key: '/stores', href: '/stores', label: 'Stores', icon: <FaStore size={15} /> },
  { key: '/orders', href: '/orders', label: 'Orders', icon: <FaClipboard size={15} /> },
  { key: '/profile', href: '/profile', label: 'Profile', icon: <FaUser size={15} /> },
];

export default function BottomTabs() {
  const pathname = usePathname();

  return (
    <Tabs
      aria-label="Bottom Navigation"
      selectedKey={pathname}
      size="lg"
      fullWidth
      placement="bottom"
      items={tabList}
      classNames={{
        tabWrapper: 'px-4 mb-6 fixed bottom-0 z-50 w-full',
        base: '',
        tabList: '',
        tab: 'h-16',
        cursor: 'bg-default-200',
      }}
    >
      {({ key, href, label, icon }) => (
        <Tab
          key={key}
          href={href}
          title={
            <div className="flex flex-col items-center gap-1 text-sm">
              {icon} <span>{label}</span>
            </div>
          }
        />
      )}
    </Tabs>
  );
}
