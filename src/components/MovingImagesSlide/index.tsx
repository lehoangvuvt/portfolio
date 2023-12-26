"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div<{ $url: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: 16/7;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  transition: all calc(0.05s * slicesAmount) ease;
  background-image: url(${(props) => props.$url});
  background-position-y: 70%;
`;

const FilterDiv = styled.div<{
  $index: number;
  $direction: "ltr" | "rtl";
  $url: string;
  $delayTime: number;
  $slicesAmount: number;
}>`
  height: 100%;
  flex: 1;
  background-image: url(${(props) => props.$url});
  background-repeat: no-repeat;
  background-position-x: ${(props) =>
    (props.$index * 100) / props.$slicesAmount}%;
  background-position-y: 70%;
  --ltr-transition: all ${(props) => props.$delayTime * (props.$index + 1)}s
    ease;
  --rtf-transition: all
    ${(props) => props.$delayTime * (props.$slicesAmount - (props.$index + 1))}s
    ease;
  transition: ${(props) =>
    props.$direction === "ltr"
      ? "var(--ltr-transition)"
      : "var(--rtf-transition)"};
  filter: brightness(90%);
  font-size: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
  .text {
    color: transparent;
    animation: none;
  }
  &.hovered {
    filter: brightness(110%) blur(0px);
    transform: scale(1.1);
    .text {
      color: #f5f5f5;
      animation: jumpingText
        ${(props) => props.$delayTime * (props.$index + 1)}s ease infinite
        alternate;
      @keyframes jumpingText {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(${(props) => props.$index * -0.5}px);
        }
      }
    }
  }
`;

export type MovingImage = {
  src: string;
  text: string;
};

const MovingImagesSlide = ({
  direction,
  currentIndex,
  images,
  delayTime = 0.05,
  slicesAmount = 30,
}: {
  direction: "ltr" | "rtl";
  currentIndex: number;
  images: MovingImage[];
  delayTime?: number;
  slicesAmount?: number;
}) => {
  const [startIndex, setStartIndex] = useState<number>(-1);
  const [endIndex, setEndIndex] = useState<number>(-1);
  const [text, setText] = useState<string[]>([]);

  const handleOnMouseEnter = (index: number) => {
    if (index < 7) {
      setStartIndex(0);
      setEndIndex(index + 3);
    } else {
      setStartIndex(index - 5);
      setEndIndex(index + 5);
    }
  };

  useEffect(() => {
    setText([]);
    const nameArr = images[currentIndex].text.split("");
    const lengthForSide = Math.floor((slicesAmount - nameArr.length) / 2);
    const textArr = [
      ...Array(lengthForSide).fill(""),
      ...nameArr,
      ...Array(slicesAmount - nameArr.length - lengthForSide).fill(""),
    ];
    setTimeout(() => {
      setText(textArr);
    }, 500);
  }, [currentIndex]);

  useEffect(() => {
    const increment = async (initIndex: number) => {
      do {
        if (initIndex < 7) {
          setStartIndex(0);
          setEndIndex(initIndex + 3);
        } else {
          if (slicesAmount - initIndex - 6 > 0) {
            setStartIndex(0);
            setEndIndex(initIndex + 6);
          } else {
            setStartIndex(0);
            setEndIndex(slicesAmount);
          }
        }
        await new Promise((resolve) => setTimeout(() => resolve(""), 50));
        initIndex++;
      } while (initIndex < 31);
    };
    if (text.length > 0) increment(0);
  }, [text]);

  const handleOnMouseLeave = (index: number) => {
    setStartIndex(-1);
    setEndIndex(-1);
  };

  return (
    <Container $url={"/images/" + images[currentIndex].src}>
      {Array(slicesAmount)
        .fill("")
        .map((item, i) => (
          <FilterDiv
            $slicesAmount={slicesAmount}
            $delayTime={delayTime}
            $direction={direction}
            $index={i}
            $url={"/images/" + images[currentIndex].src}
            onMouseEnter={() => handleOnMouseEnter(i)}
            onMouseLeave={() => handleOnMouseLeave(i)}
            className={
              i <= endIndex && i >= startIndex ? "hovered" : "not-hovered"
            }
            key={i}
          >
            <div className="text">
              {text.length > 0 && text[i].toUpperCase()}
            </div>
          </FilterDiv>
        ))}
    </Container>
  );
};

export default MovingImagesSlide;
