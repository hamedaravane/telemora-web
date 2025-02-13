import React, { createContext, useState, useEffect } from 'react';
import { WebAppUser } from '@twa-dev/types';
import WebApp from '@twa-dev/sdk';

interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

interface TelegramUserContext {
  user: TelegramUser | null;
  setUser: (user: TelegramUser | null) => void;
}

export const UserContext = createContext<TelegramUserContext>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe?.user) {
      const tgUser: WebAppUser = WebApp.initDataUnsafe.user;
      setUser({
        id: tgUser.id,
        is_bot: tgUser.is_bot,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        username: tgUser.username,
        language_code: tgUser.language_code,
        is_premium: tgUser.is_premium,
        photo_url: tgUser.photo_url,
      });
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
