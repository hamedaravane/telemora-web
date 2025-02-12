'use client';

import { useContext } from 'react';
import AppLayout from '@/components/app-layout';
import { Avatar, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { UserContext } from '@/context/user-context';

export default function Profile() {
  const { user } = useContext(UserContext);
  const version = process.env.NEXT_PUBLIC_VERSION || '1.0.0';

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen pb-16">
        <div className="p-4">
          {user ? (
            <Card>
              <CardHeader>
                <Avatar src={user.profilePictureUrl || '/default-profile.png'} size="lg" />
                <div className="ml-4">
                  <h4>{user.name}</h4>
                  <span>@{user.telegramId}</span>
                </div>
              </CardHeader>
              <CardBody>
                <div>Phone: {user.phoneNumber || 'N/A'}</div>
                <div>Email: {user.email || 'N/A'}</div>
                <div>Address: {user.address || 'N/A'}</div>
                <div>
                  Wallet Balance:{' '}
                  {user.walletBalance !== undefined ? `${user.walletBalance} TON` : 'N/A'}
                </div>
                <div>Role: {user.role}</div>
              </CardBody>
              <CardFooter>
                <p>Version: {version}</p>
              </CardFooter>
            </Card>
          ) : (
            <div className="p-4">No user data available.</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
