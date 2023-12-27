"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 5%;
  display: flex;
  position: fixed;
  z-index: 100;
  box-sizing: border-box;
  backdrop-filter: blur(1px) grayscale(50%);
`;

const Left = styled.div`
  width: 15%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  img {
    height: 50px;
    cursor: pointer;
    position: relative;
    animation: logoAppear 0.5s ease;
    &:hover {
      animation: flicker 2s ease infinite;
    }
    @keyframes flicker {
      0% {
        opacity: 0.5;
      }
      20% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      75% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 25px;
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
  const router = useRouter();

  return (
    <Container>
      <Left>
        <img
          onClick={() => router.push("/")}
          alt="logo"
          src="images/logo.png"
        />
      </Left>
      <Center>
        <MenuItem href="/">Home</MenuItem>
        {/* <MenuItem href="/about">About</MenuItem> */}
        <MenuItem href="/projects">Projects</MenuItem>
        <MenuItem href="/about">About</MenuItem>
      </Center>
      <Right></Right>
    </Container>
  );
};

export default Header;
