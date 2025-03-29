'use client';

import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserPrivateProfile } from '@/libs/users/types';
import { initData, useSignal } from '@telegram-apps/sdk-react';
import { generateMockUserPrivateProfile } from '@/libs/users/mocks';

interface UserContextType {
  user: UserPrivateProfile | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const initDataStr = useSignal(initData.raw);
  const hasInitData = !!initDataStr && initDataStr !== '';

  const { data: user, isLoading } = useQuery({
    queryKey: ['userUser', initDataStr],
    // queryFn: () => sendTelegramInitData(initDataStr!),
    queryFn: () => generateMockUserPrivateProfile(),
    // enabled: hasInitData,
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
