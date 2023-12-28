"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #09053d;
  width: 100%;
  height: 100%;
  z-index: 99;
  animation: menuAppear 0.5s ease forwards;
  opacity: 0;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  justify-content: flex-end;
  @keyframes menuAppear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Left = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`;

const LeftItem = styled.div`
  width: 100%;
  padding: 10px;
  color: white;
  text-transform: uppercase;
  text-align: center;
  font-weight: 600;
  font-size: 45px;
  cursor: pointer;
  transition: color 0.25s ease;
  letter-spacing: 1.5px;
  font-family: var(--font-roboto-source-code);
  &:hover {
    color: #e6b9de;
  }
`;

const Menu = ({ closeMenu }: { closeMenu: () => void }) => {
  const router = useRouter();

  const handleClickItem = (path: string) => {
    router.push(path);
    closeMenu();
  };

  return (
    <Container>
      <Left>
        <LeftItem onClick={() => handleClickItem("/")}>Home</LeftItem>
        <LeftItem onClick={() => handleClickItem("/projects")}>
          Projects
        </LeftItem>
        <LeftItem onClick={() => handleClickItem("/about")}>About</LeftItem>
      </Left>
    </Container>
  );
};

export default Menu;
