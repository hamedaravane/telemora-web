'use client';

import React, { createContext, type PropsWithChildren, useContext } from 'react';

import { useTelegramLoginQuery } from '@/libs/users/hooks';
import { UserPrivateProfile } from '@/libs/users/types';

interface UserContext {
  data?: UserPrivateProfile;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  error: Error | null;
}

const defaultValue: UserContext = {
  data: undefined,
  isLoading: true,
  isError: false,
  refetch: () => {
  },
  error: new Error(),
};

const UserContext = createContext<UserContext>(defaultValue);

export function UserProvider({ children }: PropsWithChildren) {
  const { data, isLoading, isError, refetch, error } = useTelegramLoginQuery();

  const userContext: UserContext = {
    data,
    isLoading,
    isError,
    refetch,
    error,
  };

  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
