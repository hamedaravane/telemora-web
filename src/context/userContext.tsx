'use client';

import React, { createContext, type PropsWithChildren, useContext } from 'react';
import { UserPrivateProfile } from '@/libs/users/types';
import { retrieveRawInitData } from '@telegram-apps/sdk-react';
import { useTelegramAuth } from '@/libs/users/users-api';
import ErrorPage from '@/components/shared/errorPage';
import SplashScreen from '@/components/shared/splash-screen';

const UserContext = createContext<UserPrivateProfile | null>(null);

export function UserProvider({ children }: PropsWithChildren) {
  const initData = retrieveRawInitData();
  localStorage.setItem('telegram-init-data', initData!);
  const { data: user, isLoading, isError, refetch } = useTelegramAuth(initData);

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isError || !user) return <ErrorPage reset={refetch} />;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
