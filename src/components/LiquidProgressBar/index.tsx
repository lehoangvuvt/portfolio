"use client";

import { useEffect } from "react";
import "./style.css";
import styled from "styled-components";

const Container = styled.div<{ $translateY: number; $lastTranslateY: number }>`
  position: absolute;
  z-index: 5;
  width: 80px;
  height: 80px;
  aspect-ratio: 1;
  overflow: hidden;
  .box {
    position: relative;
    background: blue;
    border: 0.25rem solid white;
    height: 100%;
    width: 100%;
    outline: 0;
    overflow: hidden;
  }
  .box::before {
    content: "";
    font-size: 2rem;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box::after {
    content: "";
    position: absolute;
    bottom: -50%;
    left: -50%;
    height: 200%;
    width: 200%;
    background-color: red;
    border-radius: 35%;
    animation: spin 4s ease-in-out infinite alternate;
  }

  @keyframes spin {
    0% {
      transform: translateY(${(props) => props.$lastTranslateY * -1}%)
        rotate(0deg);
    }
    100% {
      transform: translateY(${(props) => props.$translateY * -1}%)
        rotate(400deg);
    }
  }
`;

const LiquidProgressBar = ({
  style,
  translateY,
  lastTranslateY,
}: {
  style?: React.CSSProperties;
  translateY: number;
  lastTranslateY: number;
}) => {
  return (
    <Container
      $lastTranslateY={lastTranslateY}
      $translateY={translateY}
      style={style}
    >
      <div className="box"></div>
    </Container>
  );
};

export default LiquidProgressBar;
