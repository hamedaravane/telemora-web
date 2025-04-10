'use client';

import Image from 'next/image';
import { Button } from '@heroui/react';
import { FaUndo } from 'react-icons/fa';

export default function ErrorPage(reload?: () => void) {
  return (
    <div className="flex flex-col gap-y-4 min-h-screen justify-center items-center text-center">
      <Image src="/server-error.webp" alt="failed to load" priority width={160} height={160} />
      <h3>Something went wrong!</h3>
      <Button variant="shadow" onPress={reload}>
        <FaUndo />
        Reload
      </Button>
    </div>
  );
}
