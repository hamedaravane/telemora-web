'use client';
import AppLayout from '@/components/app-layout';
import { Avatar, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { User } from '@/libs/users/types';

export default function Profile() {
  const user: User = {} as User;
  const version = process.env.NEXT_PUBLIC_VERSION;
  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen pb-16">
        <div className="p-4">
          <Card>
            <CardHeader>
              <Avatar src={user?.profilePictureUrl || '/default-profile.png'} size="lg" />
              <div className="ml-4">
                <h4>{user?.name}</h4>
                <span>@{user?.telegramId}</span>
              </div>
            </CardHeader>
            <CardBody>
              <div>Phone: {user?.phoneNumber || 'N/A'}</div>
              <div>Email: {user?.email || 'N/A'}</div>
              <div>Address: {user?.address || 'N/A'}</div>
              <div>Wallet Balance: {user?.walletBalance} TON</div>
              <div>Role: {user?.role}</div>
            </CardBody>
            <CardFooter>
              <p>version: {version}</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
