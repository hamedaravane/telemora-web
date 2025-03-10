import { Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { useContext } from 'react';
import { UserContext } from '@/context/user-context';

const CustomNavbar = () => {
  const { user } = useContext(UserContext);
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Telemart</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Avatar size="sm" src={user?.photoUrl || '/default-profile.png'} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
