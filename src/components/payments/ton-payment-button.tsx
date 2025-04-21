'use client';

import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Button } from '@heroui/react';
import toast from 'react-hot-toast';
import { useCreatePayment } from '@/libs/payments/payments-api';
import { buildMarketplaceTransaction } from '@/libs/payments/utils';
import { environment } from '@environments';
import { Cell } from '@ton/core';

interface TonPaymentButtonProps {
  amountTon: number;
  sellerAddress: string;
  orderId?: string;
}

export function TonPaymentButton({ amountTon, sellerAddress, orderId }: TonPaymentButtonProps) {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const userAddress = useTonAddress(false);
  const { mutateAsync: createPayment } = useCreatePayment();
  const marketplaceAddress = environment.apiUrl;
  const smartContractAddress = environment.smartContractAddress;
  const commissionPercent = environment.commissionPercent;

  const handlePay = async () => {
    if (!wallet) {
      toast.error('Please connect your wallet');
      await tonConnectUI.openModal();
      return;
    }

    try {
      const nanoAmount = (amountTon * 1e9).toFixed(0);

      const transactionRequest = buildMarketplaceTransaction({
        amountTon,
        sellerAddress,
        marketplaceAddress,
        smartContractAddress,
        commissionPercent: Number(commissionPercent),
      });
      const { boc } = await tonConnectUI.sendTransaction(transactionRequest);

      const hash = Cell.fromBoc(Buffer.from(boc, 'base64'))[0].hash().toString('hex');

      await createPayment({
        orderId,
        amount: nanoAmount,
        fromWalletAddress: userAddress,
        toWalletAddress: sellerAddress,
        transactionHash: hash,
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
