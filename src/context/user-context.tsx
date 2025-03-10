'use client';

import { WebApp } from '@/types/telegram';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: WebApp;
    };
  }
}

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/libs/users/types';
import { sendTelegramInitData } from '@/libs/users/users-api';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [initData, setInitData] = useState<string | null>(null);

  useEffect(() => {
    if (window.Telegram?.WebApp?.initData) {
      setInitData(window.Telegram.WebApp.initData);
    } else {
      setInitData('development_environment');
    }
  }, []);

  const { data: user, isLoading } = useQuery({
    queryKey: ['userUser', initData],
    queryFn: async () => {
      if (!initData) throw new Error('Missing initData');
      return await sendTelegramInitData(initData);
    },
    enabled: !!initData,
  });

  return (
    <UserContext.Provider value={{ user: user ?? null, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  return useContext(UserContext);
}
