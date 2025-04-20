'use client';

import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Button } from '@heroui/react';
import toast from 'react-hot-toast';
import { useCreatePayment } from '@/libs/payments/payments-api';
import { buildMarketplaceTransaction } from '@/libs/payments/utils';

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
  const marketplaceAddress = process.env.TELEMORA_ADDRESS || 'EQyyyy...';
  const smartContractAddress = process.env.SMART_CONTRACT_ADDRESS || 'EQzzzz...';
  const commissionPercent = process.env.COMMISSION_PERCENTAGE || '2.5';

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

      await createPayment({
        orderId,
        amount: nanoAmount,
        fromWalletAddress: userAddress,
        toWalletAddress: sellerAddress,
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
