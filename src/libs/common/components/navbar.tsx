import { Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import Link from 'next/link';
import { FaGear } from 'react-icons/fa6';

import { useUser } from '@/context/userContext';

export default function CustomNavbar() {
  const user = useUser();
  return (
    <Navbar>
      <NavbarBrand>
        <FaGear />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/profile">
            <Avatar size="sm" src={user?.photo?.url || '/default-profile.png'} />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
