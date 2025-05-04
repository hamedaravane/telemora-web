'use client';

import { Tab, Tabs } from '@heroui/react';
import { FaClipboard, FaHome, FaStore, FaUser } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactElement } from 'react';

type RouteKey = 'market' | 'stores' | 'orders' | 'profile';

interface TabSpec {
  key: RouteKey;
  href: string;
  label: string;
  icon: ReactElement;
}

const TAB_DEFS: TabSpec[] = [
  { key: 'market', href: '/market', label: 'Market', icon: <FaHome size={18} /> },
  { key: 'stores', href: '/stores', label: 'Stores', icon: <FaStore size={18} /> },
  { key: 'orders', href: '/orders', label: 'Orders', icon: <FaClipboard size={18} /> },
  { key: 'profile', href: '/profile', label: 'Profile', icon: <FaUser size={18} /> },
];

export function BottomTabs() {
  const path = usePathname();
  const router = useRouter();

  const selectedKey: RouteKey = TAB_DEFS.find((t) => path.startsWith(t.href))?.key ?? 'market';

  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center w-full z-50">
      <Tabs
        placement="bottom"
        fullWidth
        radius="lg"
        variant="light"
        color="secondary"
        size="sm"
        selectedKey={selectedKey}
        onSelectionChange={(key) => {
          const route = TAB_DEFS.find((t) => t.key === key)?.href;
          if (route) router.push(route);
        }}
        destroyInactiveTabPanel
        classNames={{
          base: 'bg-zinc-800/70 backdrop-blur-md shadow-md w-full',
          tab: 'flex-1 flex flex-col gap-1 py-2 w-full',
          tabContent: 'flex flex-col items-center justify-center text-xs',
          cursor: 'bg-secondary/20',
        }}
      >
        {TAB_DEFS.map(({ key, label, icon }) => (
          <Tab
            key={key}
            title={
              <div className="flex flex-col items-center">
                {icon}
                <span>{label}</span>
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
}
