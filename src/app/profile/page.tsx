'use client';

import { useContext, useState } from 'react';
import AppLayout from '@/components/app-layout';
import { Avatar, Card, CardHeader, CardBody, CardFooter, Button } from '@heroui/react';
import { UserContext } from '@/context/user-context';
import TonConnect from '@tonconnect/sdk';

// Create a TonConnect instance with your manifest URL (update with your actual manifest URL)
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
      // For an injected wallet (e.g., Tonkeeper), pass the jsBridgeKey.
      tonConnect.connect({ jsBridgeKey: 'tonkeeper' });

      // After connecting, get the account from tonConnect
      if (tonConnect.account) {
        const walletAddress = tonConnect.account.address;
        // Simulate fetching wallet balance (replace this with your actual balance retrieval)
        const walletBalance = '1.23 TON';
        // Update the user context with wallet details.
        setUser({
          ...user,
          walletAddress,
          // Extend your User type to optionally include walletBalance if needed.
          walletBalance,
        });
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
            <Avatar src={user?.profilePictureUrl || '/default-profile.png'} size="lg" />
            <div className="ml-4">
              <h4>{user?.name}</h4>
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
            {user?.walletAddress && <div>Wallet Balance: {user?.walletBalance || 'N/A'}</div>}
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </CardBody>
          <CardFooter>
            {!user?.walletAddress ? (
              <Button onPress={handleConnectWallet} disabled={walletConnecting}>
                {walletConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            ) : (
              <div className="text-green-500">Wallet Connected</div>
            )}
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
