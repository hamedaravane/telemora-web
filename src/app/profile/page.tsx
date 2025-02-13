'use client';

import { useContext, useState } from 'react';
import AppLayout from '@/components/app-layout';
import { Avatar, Card, CardHeader, CardBody, CardFooter, Button } from '@heroui/react';
import { UserContext } from '@/context/user-context';
import TonConnect from '@tonconnect/sdk';

const tonConnect = new TonConnect({
  manifestUrl: 'https://your-app.com/manifest.json',
});

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    setWalletConnecting(true);
    setError(null);
    try {
      tonConnect.connect({ jsBridgeKey: 'tonkeeper' });

      if (tonConnect.account && user) {
        const walletAddress = tonConnect.account.address;
        setUser({ ...user, walletAddress });
      }
    } catch (err) {
      console.error('Wallet connection failed', err);
      setError('Wallet connection failed. Please try again.');
    } finally {
      setWalletConnecting(false);
    }
  };

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
            {user?.walletAddress && <div>Wallet Balance: {'N/A'}</div>}
            {error && <div className="text-danger mt-2">{error}</div>}
          </CardBody>
          <CardFooter>
            {!user?.walletAddress ? (
              <Button onPress={handleConnectWallet} disabled={walletConnecting}>
                {walletConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            ) : (
              <div className="text-success">Wallet Connected</div>
            )}
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
