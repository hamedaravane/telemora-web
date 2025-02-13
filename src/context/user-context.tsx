'use client';

import { createContext, useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { UserRole } from '@/types/common';
import type { User } from '@/libs/users/types';

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

  useEffect(() => {
    if (WebApp && WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
      const tgUser = WebApp.initDataUnsafe.user;

      const mappedUser: User = {
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
      };

      setUser(mappedUser);
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
