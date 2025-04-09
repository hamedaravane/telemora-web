'use client';

import Image from 'next/image';
import AppLayout from '@/components/shared/app-layout';

export default function Error() {
  return (
    <main>
      <AppLayout>
        <Image src="/server-error.webp" alt="failed to load" width={200} height={200} />
        <h1 className="text-2xl font-bold">Something went wrong</h1>
      </AppLayout>
    </main>
  );
}
