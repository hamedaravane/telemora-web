import { Button } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';

import { UserPrivateProfile } from '@/libs/users/types';

/**
 * UserProfileCard displays user information with photo and action buttons
 *
 * @param {Object} props - Component props
 * @param {UserPrivateProfile} props.user - User profile data
 * @param {Object} [props.routes] - Optional custom routes for navigation
 * @param {string} [props.routes.edit] - Path for edit profile action
 * @param {string} [props.routes.preferences] - Path for preferences action
 * @returns {JSX.Element} The user profile card component
 */
export default function UserProfileCard({
  user,
  routes = {
    edit: '/profile/edit',
    preferences: '/profile/preferences',
  },
}: {
  user: UserPrivateProfile;
  routes?: {
    edit?: string;
    preferences?: string;
  };
}) {
  const router = useRouter();

  // Fallbacks for name display
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const displayName = firstName || lastName ? `${firstName} ${lastName}`.trim() : 'User';

  // Handle navigation with error handling
  const handleNavigation = (route: string | undefined) => {
    if (!route) return;
    try {
      router.push(route);
    } catch (error) {
      console.error('Navigation error in profile card:', error);
    }
  };

  return (
    <section
      aria-labelledby="profile-heading"
      role="region"
      className="mx-auto w-full max-w-sm space-y-2 sm:space-y-4"
    >
      <div className="text-center">
        <figure className="mx-auto">
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full sm:h-32 sm:w-32">
            <Image
              key={user.photo?.url}
              src={user.photo?.url || '/default-profile.png'}
              alt={`Photo of ${displayName}`}
              width={128}
              height={128}
              className="aspect-square object-cover"
              onError={(e) => {
                e.currentTarget.src = '/default-profile.png';
              }}
              priority
            />
          </div>
          <figcaption className="mt-3 sm:mt-4">
            <h2 id="profile-heading" className="text-base font-semibold sm:text-lg">
              {displayName}
            </h2>
            {user.username && (
              <p className="text-xs text-gray-500 sm:text-sm">
                <span className="sr-only">Username: </span>@{user.username}
              </p>
            )}
          </figcaption>
        </figure>
      </div>
      <nav className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-4">
        <Button
          fullWidth
          size="sm"
          variant="flat"
          onClick={() => handleNavigation(routes.edit)}
          className="flex items-center justify-center gap-2"
        >
          <FaPen className="text-xs sm:text-sm" aria-hidden="true" />
          <span>Edit Profile</span>
        </Button>
        <Button
          fullWidth
          size="sm"
          variant="flat"
          onClick={() => handleNavigation(routes.preferences)}
          className="flex items-center justify-center gap-2"
        >
          <FaGear className="text-xs sm:text-sm" aria-hidden="true" />
          <span>Preferences</span>
        </Button>
      </nav>
    </section>
  );
}
