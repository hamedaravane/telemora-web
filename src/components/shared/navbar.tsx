import { Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { useUser } from '@/context/user-context';

const CustomNavbar = () => {
  const { user } = useUser();
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Telemora</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Avatar size="sm" src={user?.photo?.url || '/default-profile.png'} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
