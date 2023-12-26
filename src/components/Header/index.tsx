"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 25px;
  margin-bottom: 10px;
  background: #131418;
  display: flex;
`;

const Left = styled.div`
  width: 15%;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const Right = styled.div`
  width: 15%;
`;

const MenuItemLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 400;
  font-family: var(--font-roboto);
  letter-spacing: 1px;
  &.selected {
    color: rgba(255, 255, 255, 1);
  }
`;

const MenuItem = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  const pathname = usePathname();

  return (
    <MenuItemLink
      className={
        href === "/"
          ? pathname === href
            ? "selected"
            : ""
          : pathname.includes(href)
          ? "selected"
          : ""
      }
      href={href}
      shallow={true}
    >
      {children}
    </MenuItemLink>
  );
};

const Header = () => {
  return (
    <Container>
      <Left></Left>
      <Center>
        <MenuItem href="/">Home</MenuItem>
        <MenuItem href="/about">About</MenuItem>
        <MenuItem href="/projects">Projects</MenuItem>
      </Center>
      <Right></Right>
    </Container>
  );
};

export default Header;
