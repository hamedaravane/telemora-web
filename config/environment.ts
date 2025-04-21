const {
  NEXT_PUBLIC_TELEMORA_ADDRESS,
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SMART_CONTRACT_ADDRESS,
  NEXT_PUBLIC_COMMISSION_PERCENTAGE = '2.5',
} = process.env as Record<string, string | undefined>;

if (!NEXT_PUBLIC_TELEMORA_ADDRESS) throw new Error('Missing NEXT_PUBLIC_TELEMORA_ADDRESS env');

if (!NEXT_PUBLIC_API_URL) throw new Error('Missing NEXT_PUBLIC_API_URL env');

if (!NEXT_PUBLIC_SMART_CONTRACT_ADDRESS)
  throw new Error('Missing NEXT_PUBLIC_SMART_CONTRACT_ADDRESS env');

export const environment = {
  apiUrl: NEXT_PUBLIC_API_URL,
  marketplaceAddress: NEXT_PUBLIC_TELEMORA_ADDRESS,
  smartContractAddress: NEXT_PUBLIC_SMART_CONTRACT_ADDRESS,
  commissionPercent: parseFloat(NEXT_PUBLIC_COMMISSION_PERCENTAGE),
};
