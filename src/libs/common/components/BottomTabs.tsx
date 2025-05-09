'use client';

import { Tab, Tabs } from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';
import { FaClipboard, FaHome, FaStore, FaUser } from 'react-icons/fa';

const tabList = [
  { key: '/market', label: 'Market', icon: <FaHome size={15} aria-label="Market" /> },
  { key: '/stores', label: 'Stores', icon: <FaStore size={15} aria-label="Stores" /> },
  { key: '/orders', label: 'Orders', icon: <FaClipboard size={15} aria-label="Orders" /> },
  { key: '/profile', label: 'Profile', icon: <FaUser size={15} aria-label="Profile" /> },
];

export default function BottomTabs() {
  const pathname = usePathname();
  const route = useRouter();

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
        base: 'backdrop-blur-sm',
        tabList: '',
        tab: 'h-16',
        cursor: 'bg-default-200 text-primary',
      }}
      onSelectionChange={(key) => route.push(key as string)}
    >
      {({ key, label, icon }) => (
        <Tab
          key={key}
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
