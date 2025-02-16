'use client';

import { useContext, useEffect } from 'react';
import AppLayout from '@/components/app-layout';
import { Avatar, Card, CardBody, CardFooter, CardHeader, Input } from '@heroui/react';
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
          <CardHeader className="flex-col gap-y-2 items-center justify-center w-full">
            <Avatar src={user?.telegramPhotoUrl || '/default-profile.png'} size="lg" />
            <div className="text-center">
              <h1>{user?.firstName || 'Not Available'}</h1>
              <div className="text-xs font-mono">@{user?.telegramId || 'error'}</div>
            </div>
          </CardHeader>
          <CardBody className="gap-y-2">
            <Input
              isClearable
              label="Username"
              defaultValue={user?.telegramUsername || 'Not Available'}
            ></Input>
            <Input
              isClearable
              label="Phone"
              defaultValue={user?.phoneNumber || 'Not Available'}
            ></Input>
            <Input isClearable label="Mail" defaultValue={user?.email || 'Not Available'}></Input>
            <Input
              isClearable
              label="Wallet Address"
              defaultValue={user?.walletAddress || 'Not connected'}
            ></Input>
          </CardBody>
          <CardFooter>
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
