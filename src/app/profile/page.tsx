import AppLayout from '@/components/app-layout';
import Image from 'next/image';
import { useUser } from '@/context/user-context';

export default function ProfilePage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load profile data. Please try again.</p>
      </div>
    );
  }

  return (
    <AppLayout>
      <main>
        <section>
          <div>
            <Image
              src={user.photoUrl ?? '/default-profile.png'}
              alt="user profile photo"
              width={100}
              height={100}
              className="rounded-full"
            ></Image>
            <p>
              <span>{user.firstName}</span> <span>{user.lastName}</span>
            </p>
          </div>
        </section>
      </main>
    </AppLayout>
  );
}
