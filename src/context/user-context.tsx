'use client';

import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';
import { User } from '@/libs/users/types';

interface IUserContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to retrieve user from localStorage:', error);
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
