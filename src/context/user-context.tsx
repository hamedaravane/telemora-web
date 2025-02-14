'use client';

import { createContext, useEffect, useState } from 'react';
import { UserRole } from '@/types/common';
import type { User } from '@/libs/users/types';
import { useQuery } from '@tanstack/react-query';

interface IUserContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const { data } = useQuery<User | null>({
    queryKey: ['telegramUser'],
    queryFn: async () => {
      if (typeof window !== 'undefined') {
        const { default: WebApp } = await import('@twa-dev/sdk');
        if (WebApp?.initDataUnsafe?.user) {
          const tgUser = WebApp.initDataUnsafe.user;
          return {
            telegramId: tgUser.id.toString(),
            firstName: tgUser.first_name,
            lastName: tgUser.last_name,
            telegramUsername: tgUser.username,
            telegramLanguageCode: tgUser.language_code,
            isTelegramPremium: tgUser.is_premium,
            telegramPhotoUrl: tgUser.photo_url,
            phoneNumber: undefined,
            email: undefined,
            role: UserRole.BUYER,
            walletAddress: undefined,
            orders: [],
            reviews: [],
            stores: [],
            payments: [],
          } as User;
        }
      }
      return null;
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
