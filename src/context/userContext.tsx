'use client';

import React, { createContext, type PropsWithChildren, useContext } from 'react';
import { UserPrivateProfile } from '@/libs/users/types';
import { useTelegramLogin } from '@/libs/users/users-api';
import ErrorPage from '@/components/shared/errorPage';
import SplashScreen from '@/components/shared/splash-screen';

const UserContext = createContext<UserPrivateProfile | null>(null);

export function UserProvider({ children }: PropsWithChildren) {
  const { data: user, isLoading, isError, refetch } = useTelegramLogin();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isError || !user) return <ErrorPage reset={refetch} />;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
