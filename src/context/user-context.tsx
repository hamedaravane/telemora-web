'use client';

import React, { createContext, useContext } from 'react';
import { UserPrivateProfile } from '@/libs/users/types';
import { initDataRaw, useSignal } from '@telegram-apps/sdk-react';
import { useTelegramAuth } from '@/libs/users/users-api';
import { Spinner } from '@heroui/react';
import ErrorPage from '@/components/shared/errorPage';

const UserContext = createContext<UserPrivateProfile | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const initDataStr = useSignal(initDataRaw);
  console.log('initDataStr', initDataStr);

  const { data: user, isLoading, isError, refetch } = useTelegramAuth(initDataStr);

  if (isLoading) {
    return <Spinner label="Authorizing, please wait" />;
  }

  if (isError || !user) return <ErrorPage reload={refetch} />;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
