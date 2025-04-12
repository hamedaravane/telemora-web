'use client';

import Image from 'next/image';
import { Button } from '@heroui/react';
import { FaUndo } from 'react-icons/fa';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reload,
}: {
  error?: Error & { digest?: string };
  reload?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex flex-col gap-y-4 min-h-screen justify-center items-center text-center">
      <Image src="/server-error.webp" alt="failed to load" priority width={160} height={160} />
      <h3>Something went wrong!</h3>
      {reload && (
        <Button variant="shadow" onPress={reload}>
          <FaUndo />
          Reload
        </Button>
      )}
    </div>
  );
}
