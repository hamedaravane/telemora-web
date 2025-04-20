import { Address, beginCell, toNano } from '@ton/core';
import { SendTransactionRequest } from '@tonconnect/ui';

function encodeMarketplacePayload({
  seller,
  marketplace,
  amountTon,
  commissionPercent,
}: {
  seller: string;
  marketplace: string;
  amountTon: number;
  commissionPercent: number;
}) {
  const cell = beginCell()
    .storeAddress(Address.parse(seller))
    .storeAddress(Address.parse(marketplace))
    .storeCoins(toNano(amountTon))
    .storeUint(commissionPercent, 16)
    .endCell();

  return cell.toBoc().toString('base64');
}

export function buildMarketplaceTransaction({
  amountTon,
  sellerAddress,
  marketplaceAddress,
  smartContractAddress,
  commissionPercent,
}: {
  amountTon: number;
  sellerAddress: string;
  marketplaceAddress: string;
  smartContractAddress: string;
  commissionPercent: number;
}): SendTransactionRequest {
  const payload = encodeMarketplacePayload({
    seller: sellerAddress,
    marketplace: marketplaceAddress,
    amountTon,
    commissionPercent,
  });

  return {
    validUntil: Math.floor(Date.now() / 1000) + 300,
    messages: [
      {
        address: smartContractAddress,
        amount: (amountTon * 1e9).toFixed(0),
        payload,
      },
    ],
  };
}
