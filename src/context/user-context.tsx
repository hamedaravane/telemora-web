'use client';

import React, { createContext, useContext } from 'react';
import { UserPrivateProfile } from '@/libs/users/types';
import { initData, useSignal } from '@telegram-apps/sdk-react';
import { useTelegramAuth } from '@/libs/users/users-api';
import { Spinner } from '@heroui/react';
import Error from '@/components/shared/error';

const UserContext = createContext<UserPrivateProfile | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const initDataStr = useSignal(initData.raw);

  const { data: user, isLoading, isError } = useTelegramAuth(initDataStr);

  if (isLoading) {
    return <Spinner variant="gradient" label="Authorizing, please wait" />;
  }

  if (isError || !user) return <Error />;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
