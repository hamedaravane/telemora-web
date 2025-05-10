import { Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import Link from 'next/link';
import { FaGear } from 'react-icons/fa6';

import { useUserState } from '@/libs/users/context/userContext';

export default function CustomNavbar() {
  const { data } = useUserState();
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/profile/preferences">
          <FaGear aria-label="Preferences" />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/profile">
            <Avatar size="sm" src={data?.photo?.url || '/default-profile.png'} />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
