import { Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@heroui/react';

const BackwardNavbar = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="../.." />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default BackwardNavbar;
