'use client';

import React, { createContext, type PropsWithChildren, useContext } from 'react';
import { UserPrivateProfile } from '@/libs/users/types';
import { initDataRaw, useSignal } from '@telegram-apps/sdk-react';
import { useTelegramAuth } from '@/libs/users/users-api';
import { Spinner } from '@heroui/react';
import ErrorPage from '@/components/shared/errorPage';

const UserContext = createContext<UserPrivateProfile | null>(null);

export function UserProvider({ children }: PropsWithChildren) {
  const { data: user, isLoading, isError, refetch } = useTelegramAuth(useSignal(initDataRaw));

  if (isLoading) {
    return <Spinner label="Authorizing, please wait" />;
  }

  if (isError || !user) return <ErrorPage reset={refetch} />;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
