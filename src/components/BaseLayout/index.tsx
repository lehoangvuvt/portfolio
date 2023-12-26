"use client";

import { ReactNode } from "react";
import styled from "styled-components";
import Header from "../Header";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  position: absolute;
  top: 0;
  left: 0;
  background: #131418;
  height: 100%;
  overflow-x: hidden;
  font-family: var(--font-roboto);
`;

const Body = styled.div`
  margin-top: 100px;
`

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Header />
      <Body>{children}</Body>
    </Container>
  );
};

export default BaseLayout;
