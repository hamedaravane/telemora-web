import { Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';

import { UserPrivateProfile } from '@/libs/users/types';

export default function ProfileCard({ user }: { user: UserPrivateProfile }) {
  return (
    <div className="space-y-2">
      <div className="text-center">
        <Image
          src={user.photo?.url ?? '/default-profile.png'}
          alt="user photo"
          width={128}
          height={128}
          className="rounded-full object-cover w-32 aspect-square inline-block"
        />
        <div className="mt-4">
          <h2 className="font-semibold text-lg">
            {user.firstName} {user.lastName}
          </h2>
          {user.username && <p className="text-gray-500 lowercase text-sm">@{user.username}</p>}
        </div>
      </div>
      <div className="flex space-x-2">
        <Button fullWidth size="sm" variant="flat">
          <FaPen />
          Edit Profile
        </Button>
        <Button fullWidth size="sm" variant="flat">
          <FaGear />
          Preferences
        </Button>
      </div>
    </div>
  );
}
