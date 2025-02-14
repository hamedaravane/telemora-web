'use client';

import { useContext, useEffect } from 'react';
import AppLayout from '@/components/app-layout';
import { Avatar, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { UserContext } from '@/context/user-context';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const wallet = useTonWallet();

  useEffect(() => {
    if (wallet && wallet.account?.address && user) {
      setUser({ ...user, walletAddress: wallet.account.address });
    }
  }, [wallet, user, setUser]);

  return (
    <AppLayout>
      <div className="p-4">
        <Card>
          <CardHeader>
            <Avatar src={user?.telegramPhotoUrl || '/default-profile.png'} size="lg" />
            <div className="ml-4">
              <h4>{user?.firstName}</h4>
              <span>@{user?.telegramId}</span>
            </div>
          </CardHeader>
          <CardBody>
            <div>Phone: {user?.phoneNumber || 'N/A'}</div>
            <div>Email: {user?.email || 'N/A'}</div>
            <div>Role: {user?.role}</div>
            <div>
              Wallet Address:{' '}
              {user?.walletAddress ? (
                <span className="font-mono">{user.walletAddress}</span>
              ) : (
                'Not connected'
              )}
            </div>
          </CardBody>
          <CardFooter>
            {/* Use the TonConnectButton provided by @tonconnect/ui-react */}
            {!user?.walletAddress ? (
              <TonConnectButton />
            ) : (
              <div className="text-success">Wallet Connected</div>
            )}
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
