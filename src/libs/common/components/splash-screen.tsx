'use client';

import Image from 'next/image';

export default function SplashScreen() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-blue-300 to-blue-400">
      <Image
        src="/icon-logo.svg"
        alt="icon logo"
        priority
        className="aspect-square w-32 animate-pulse object-fill"
        width={236}
        height={379}
      />
    </main>
  );
}
