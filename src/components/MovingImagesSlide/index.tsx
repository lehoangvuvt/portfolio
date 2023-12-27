"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div<{
  $url: string;
  $slicesAmount: number;
  $delayTime: number;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  transition: all calc(${(props) => props.$delayTime * props.$slicesAmount})
    ease;
  background-image: url(${(props) => props.$url});
  background-position-y: 100%;
`;

const FilterDiv = styled.div<{
  $index: number;
  $direction: "ltr" | "rtl";
  $url: string;
  $delayTime: number;
  $slicesAmount: number;
}>`
  height: 100%;
  width: calc(100% / ${(props) => props.$slicesAmount});
  background-size: calc(100% * ${(props) => props.$slicesAmount}) 100%;
  background-image: url(${(props) => props.$url});
  background-repeat: no-repeat;
  background-position-x: ${(props) =>
    (props.$index * 100) / props.$slicesAmount}%;
  background-position-y: 100%;
  --ltr-transition: all ${(props) => props.$delayTime * (props.$index + 1)}s
    ease;
  --rtf-transition: all
    ${(props) => props.$delayTime * (props.$slicesAmount - (props.$index + 1))}s
    ease;
  transition: ${(props) =>
    props.$direction === "ltr"
      ? "var(--ltr-transition)"
      : "var(--rtf-transition)"};
  filter: brightness(100%);
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  .text {
    color: transparent;
    animation: none;
  }
  &.jumped {
    .text {
      color: #f5f5f5;
    }
    &.hovered {
      transform: scale(1.1);
      filter: brightness(105%);
      .text {
        animation: jumpingText 0.5s ease;
      }
    }
  }
  &.hovered {
    /* transform: scale(1.1); */
    .text {
      color: #f5f5f5;
      animation: jumpingText
        ${(props) => props.$delayTime * 1 * (props.$index + 1)}s ease;
    }
  }
  @keyframes jumpingText {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(${(props) => props.$index * -0.5}px);
    }
    100% {
      transform: translateY(0);
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
  timeIncrementInMs = 50,
  onJumpEnd,
}: {
  direction: "ltr" | "rtl";
  currentIndex: number;
  images: MovingImage[];
  delayTime?: number;
  slicesAmount?: number;
  timeIncrementInMs?: number;
  onJumpEnd?: () => void;
}) => {
  const [startIndex, setStartIndex] = useState<number>(-1);
  const [endIndex, setEndIndex] = useState<number>(-1);
  const [text, setText] = useState<string[]>([]);
  const [jumpEnd, setJumpEnd] = useState(false);

  const handleOnMouseEnter = (index: number) => {
    if (!jumpEnd) return;
    setStartIndex(index);
    setEndIndex(index);
  };

  const handleOnMouseLeave = (index: number) => {
    if (!jumpEnd) return;
    setStartIndex(-1);
    setEndIndex(-1);
  };

  useEffect(() => {
    setText([]);
    setJumpEnd(false);
    setEndIndex(-1);
    setStartIndex(-1);
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
    const timeEndJump = slicesAmount * timeIncrementInMs;
    setTimeout(() => {
      if (onJumpEnd) {
        onJumpEnd();
      }
      setJumpEnd(true);
    }, timeEndJump);
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
        await new Promise((resolve) =>
          setTimeout(() => resolve(""), timeIncrementInMs)
        );
        initIndex++;
      } while (initIndex < slicesAmount + 1);
    };
    if (text.length > 0) increment(0);
  }, [text]);

  return (
    <Container
      $delayTime={delayTime}
      $slicesAmount={slicesAmount}
      $url={"/images/" + images[currentIndex].src}
    >
      {Array(slicesAmount)
        .fill("")
        .map((item, i) => (
          <FilterDiv
            $slicesAmount={slicesAmount}
            $delayTime={delayTime}
            $direction={direction}
            $index={i + 1}
            $url={"/images/" + images[currentIndex].src}
            onMouseEnter={() => handleOnMouseEnter(i)}
            onMouseLeave={() => handleOnMouseLeave(i)}
            style={{
              pointerEvents:
                currentIndex === images.length - 1 ? "none" : "auto",
            }}
            className={
              jumpEnd
                ? i === startIndex
                  ? "jumped hovered"
                  : "jumped"
                : i <= endIndex && i >= startIndex
                ? "hovered"
                : "not-hovered"
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
