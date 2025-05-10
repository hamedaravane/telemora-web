import { Button } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';

import { UserPrivateProfile } from '@/libs/users/types';

export default function ProfileCard({ user }: { user: UserPrivateProfile }) {
  const router = useRouter();
  return (
    <div className="space-y-2">
      <div className="text-center">
        <Image
          src={user.photo?.url ?? '/default-profile.png'}
          alt="user photo"
          width={128}
          height={128}
          className="inline-block aspect-square w-32 rounded-full object-cover"
        />
        <div className="mt-4">
          <h2 className="text-lg font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          {user.username && <p className="text-sm lowercase text-gray-500">@{user.username}</p>}
        </div>
      </div>
      <div className="flex gap-x-4">
        <Button fullWidth size="sm" variant="flat" onPress={() => router.push('/profile/edit')}>
          <FaPen aria-label="Edit Profile" />
          Edit Profile
        </Button>
        <Button
          fullWidth
          size="sm"
          variant="flat"
          onPress={() => router.push('/profile/preferences')}
        >
          <FaGear aria-label="Preferences" />
          Preferences
        </Button>
      </div>
    </div>
  );
}
