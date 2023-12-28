"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import logo from "/public/images/logo.png";
import Menu from "../Menu";

const Container = styled.div`
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 2.5%;
  padding-right: 2.5%;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  z-index: 100;
  box-sizing: border-box;
`;

const Left = styled.div`
  width: 15%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  img {
    z-index: 100;
    margin-left: 20px;
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

const Right = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

const HamburgerButton = styled.div<{ $isOpen: boolean }>`
  width: 50px;
  position: absolute;
  height: 100%;
  z-index: 100;
  cursor: pointer;
  &:hover {
    &::before,
    &::after {
      background-color: rgba(255, 255, 255, 1);
    }
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.85);
    top: 40%;
    --anim-open: background-color 0.2s ease, margin 0.5s ease,
      transform 0.5s ease 0.5s;
    --anim-close: background-color 0.2s ease, margin 0.5s ease 0.5s,
      transform 0.5s ease;
    transition: ${(props) =>
      props.$isOpen ? "var(--anim-open)" : "var(--anim-close)"};
  }
  &.close {
    &::before {
      transform: rotate(0deg);
      margin-top: -5px;
    }
    &::after {
      margin-top: 5px;
      transform: rotate(0deg);
    }
  }
  &.open {
    &::before {
      margin-top: 0px;
      transform: rotate(45deg);
    }
    &::after {
      margin-top: 0px;
      transform: rotate(-45deg);
    }
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
  const pathName = usePathname();
  const [isOpenMenu, setOpenMenu] = useState(true);

  return (
    <Container>
      <Left></Left>
      <Center>
        <Image
          height={46}
          alt="logo"
          src={logo}
          onClick={() => {
            if (isOpenMenu) setOpenMenu(false);
            router.push("/");
          }}
        />
        {/* <MenuItem href="/">Home</MenuItem>
        <MenuItem href="/about">About</MenuItem>
        <MenuItem href="/projects">Projects</MenuItem>
        <MenuItem href="/about">About</MenuItem> */}
      </Center>
      <Right>
        <HamburgerButton
          $isOpen={isOpenMenu}
          onClick={() => setOpenMenu(!isOpenMenu)}
          className={isOpenMenu ? "open" : "close"}
        />
      </Right>
      {isOpenMenu && <Menu closeMenu={() => setOpenMenu(false)} />}
    </Container>
  );
};

export default Header;
