'use client';

import React, { createContext, type PropsWithChildren, useContext } from 'react';

import { useTelegramLoginQuery } from '@/libs/users/hooks';
import { UserPrivateProfile } from '@/libs/users/types';

interface UserContext {
  data: UserPrivateProfile;
  isLoading: boolean;
}

const UserContext = createContext<UserContext | undefined>(undefined);

export function UserProvider({ children }: PropsWithChildren) {
  const { data, isLoading, error } = useTelegramLoginQuery();

  if (error || !data) {
    return;
  }

  return (
    <UserContext.Provider value={{ data, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserState = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within <UserProvider>');
  return context;
};
