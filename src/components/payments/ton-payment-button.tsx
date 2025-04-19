'use client';

import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Button } from '@heroui/react';
import toast from 'react-hot-toast';
import { useCreatePayment } from '@/libs/payments/payments-api';

interface TonPaymentButtonProps {
  amountTon: number;
  toAddress: string;
  orderId?: string;
}

export function TonPaymentButton({ amountTon, toAddress, orderId }: TonPaymentButtonProps) {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const userAddress = useTonAddress(false);
  const { mutateAsync: createPayment } = useCreatePayment();

  const handlePay = async () => {
    if (!wallet) {
      toast.error('Please connect your wallet');
      await tonConnectUI.openModal();
      return;
    }

    try {
      const validUntil = Math.floor(Date.now() / 1000) + 60;
      const nanoAmount = (amountTon * 1e9).toFixed(0);

      const { boc } = await tonConnectUI.sendTransaction({
        validUntil,
        messages: [
          {
            address: toAddress,
            amount: nanoAmount,
          },
        ],
      });

      await createPayment({
        orderId,
        amount: nanoAmount,
        fromWalletAddress: userAddress,
        toWalletAddress: toAddress,
        boc,
      });

      toast.success('Payment sent & saved!');
    } catch (error) {
      console.error('TON payment failed:', error);
      toast.error('Payment failed or cancelled');
    }
  };

  return (
    <Button color="primary" fullWidth onPress={handlePay}>
      {wallet ? `Pay ${amountTon} TON` : 'Connect Wallet to Pay'}
    </Button>
  );
}
