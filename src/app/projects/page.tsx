"use client";

import { ProjectData, projects } from "@/data/data";
import { getDateByTS } from "@/utils/datetime.utils";
import { WheelEvent, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div<{ $image: string }>`
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  height: 100%;
  top: 0px;
  position: absolute;
  overflow: hidden;
  display: flex;
  flex-flow: row;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  animation: containerAppear 1s ease;
  @keyframes containerAppear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ProjectInfo = styled.div`
  width: 40%;
  margin-left: 30%;
  z-index: 2;
  position: absolute;
  margin-top: 200px;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ProjectInfoTop = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  padding-bottom: 40px;
`;

const ProjectInfoBottom = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;

const ProjectInfoLeft = styled.div`
  width: 18%;
`;

const ProjectInfoRight = styled.div`
  width: 82%;
  display: flex;
  flex-flow: column wrap;
`;

const Line = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  width: 100%;

  &.mount {
    animation: LineMount 0.5s ease 0.2s forwards;
    transform: rotate3d(1, 0, 0, -90deg);
    transform-origin: bottom;
    @keyframes LineMount {
      from {
        transform: rotate3d(1, 0, 0, -90deg);
      }
      to {
        opacity: 1;
        transform: rotate3d(1, 0, 0, 0deg);
      }
    }
  }
  &.unmount {
    animation: LineUnmount 0.5s ease 0.3s forwards;
    transform: rotate3d(1, 0, 0, 0deg);
    transform-origin: top;
    @keyframes LineUnmount {
      from {
        transform: rotate3d(1, 0, 0, 0deg);
      }
      to {
        transform: rotate3d(1, 0, 0, 90deg);
      }
    }
  }
`;

const SlideContainer = styled.div<{ $currentTop: number; $isReset: boolean }>`
  width: 25%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  position: absolute;
  overflow: hidden;
  z-index: 2;
  transform: translateY(${(props) => props.$currentTop * -1}px);
  transition: ${(props) =>
    props.$isReset ? "none" : "  transform 0.5s ease-in"};
`;

const Item = styled.div<{ $height: number }>`
  width: 90%;
  height: ${(props) => props.$height}px;
  scroll-snap-align: start;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  box-sizing: border-box;
`;

const ItemImage = styled.div<{ $image: string }>`
  width: 100%;
  aspect-ratio: 1;
  background-image: ${(props) => `url("${props.$image}")`};
  background-size: cover;
  background-position: 0% 0%;
  background-repeat: no-repeat;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.6);
  border-radius: 6px;

  cursor: pointer;

  --clip-path-shape-1: polygon(
    50% 0,
    74% 1%,
    100% 0,
    100% 100%,
    75% 98%,
    50% 100%,
    22% 98%,
    0 100%,
    0 0,
    23% 2%
  );

  --clip-path-shape-2: polygon(
    50% 1%,
    74% 0,
    100% 3%,
    100% 98%,
    75% 100%,
    50% 98%,
    22% 100%,
    0 98%,
    0 2%,
    21% 0
  );
  animation: waterShape 1s ease infinite alternate;
  @keyframes waterShape {
    from {
      clip-path: var(--clip-path-shape-1);
      background-position: 0% 0%;
      margin-top: 0px;
      margin-left: 0px;
    }
    to {
      clip-path: var(--clip-path-shape-2);
      background-position: calc(0% - 5px) calc(0% - 5px);
      margin-top: -5px;
      margin-left: 5px;
    }
  }
  transition: all 0.5s ease-in;
  &.previous,
  &.next {
    filter: grayscale(50%);
  }
  &.current {
    transform: rotate(0deg) translateX(0%);
    mask: linear-gradient(0deg, 0, 0, 0, 0);
  }
  &.previous {
    transform: rotate(-5deg) translateX(-5%);
    -webkit-mask: linear-gradient(
      0deg,
      transparent,
      white 20%,
      white 80%,
      white 80%
    );
    mask: linear-gradient(0deg, transparent, white 20%, white 80%, white 80%);
  }
  &.next {
    transform: rotate(5deg) translateX(-5%);
    -webkit-mask: linear-gradient(0deg, transparent, 0, white 80%, transparent);
    mask: linear-gradient(0deg, transparent, 0, white 80%, transparent);
  }
`;

const ScrollToViewMoreText = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  animation: scrollToViewMore 0.5s ease-in infinite alternate;
  @keyframes scrollToViewMore {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-5px);
    }
  }
`;

const Projects = () => {
  const [canScroll, setCanScroll] = useState(true);
  const [items, setItems] = useState<ProjectData[]>([
    projects[projects.length - 1],
    ...projects,
    projects[0],
  ]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isReset, setReset] = useState(false);
  const heightPerItem = 500;
  const scrollConstant = 100;
  const scrollUnit = heightPerItem - scrollConstant;
  const [currentTop, setCurrentTop] = useState(scrollUnit);
  const [description, setDescription] = useState("");
  const [timestamp, setTimestamp] = useState<number>(0);
  const [isInit, setInit] = useState(true);

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (!canScroll) return;
    setInit(false);
    setCanScroll(false);
    if (e.deltaY > 0) {
      if (currentIndex < projects.length) {
        setCurrentTop(currentTop + heightPerItem);
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentTop(currentTop + scrollUnit);
        setCurrentIndex(1);
        setTimeout(() => {
          setCurrentTop(scrollUnit);
          setReset(true);
        }, 500);
      }
    } else {
      if (currentTop > heightPerItem) {
        setCurrentTop(currentTop - heightPerItem);
        setCurrentIndex(currentIndex - 1);
      } else {
        setCurrentTop(currentTop - heightPerItem);
        setCurrentIndex(items.length - 2);
        setTimeout(() => {
          setCurrentTop((items.length - 2) * heightPerItem - scrollConstant);
          setReset(true);
        }, 500);
      }
    }
    setTimeout(() => {
      setCanScroll(true);
      setReset(false);
    }, 1100);
  };

  const getDesLines = (description: string): string[] => {
    if (description.length > 60) {
      const arr = description.split("");
      let textPerLine = "";
      const lines: string[] = [];
      arr.forEach((character) => {
        if (textPerLine.length < 60) {
          textPerLine += character;
        } else {
          lines.push(textPerLine);
          textPerLine = character;
        }
      });
      return lines;
    } else {
      return [description];
    }
  };

  useEffect(() => {
    if (items) {
      const delayMS = isInit ? 0 : 500;
      setTimeout(() => {
        setDescription(
          items[currentIndex].description + "_pid=" + currentIndex
        );
        setTimestamp(items[currentIndex].timestamp);
      }, delayMS);
    }
  }, [currentIndex, items, isInit]);

  return (
    <Container
      $image={"/images/" + items[currentIndex].image}
      onWheelCapture={handleWheel}
    >
      <SlideContainer $isReset={isReset} $currentTop={currentTop}>
        {items.map((project, pIndex) => (
          <Item $height={heightPerItem} key={pIndex}>
            <ItemImage
              $image={"/images/" + project.image}
              className={
                pIndex < currentIndex
                  ? "previous"
                  : pIndex > currentIndex
                  ? "next"
                  : "current"
              }
            ></ItemImage>
          </Item>
        ))}
      </SlideContainer>
      <ProjectInfo>
        <ProjectInfoTop>
          <Line
            style={{ color: "rgba(255,255,255,1)", fontSize: "16px" }}
            className={
              isInit
                ? ""
                : currentIndex !== parseInt(description.split("_pid=")[1])
                ? "unmount"
                : "mount"
            }
          >
            {getDateByTS(timestamp * 1000).year}
          </Line>
        </ProjectInfoTop>
        <ProjectInfoBottom>
          <ProjectInfoLeft>
            <Line
              style={{ color: "rgba(255,255,255,1)", fontSize: "15px" }}
              className={
                isInit
                  ? ""
                  : currentIndex !== parseInt(description.split("_pid=")[1])
                  ? "unmount"
                  : "mount"
              }
            >
              {getDateByTS(timestamp * 1000).date > 10
                ? getDateByTS(timestamp * 1000).date
                : "0" + getDateByTS(timestamp * 1000).date}
              &nbsp;/&nbsp;
              {getDateByTS(timestamp * 1000).month > 10
                ? getDateByTS(timestamp * 1000).month
                : "0" + getDateByTS(timestamp * 1000).month}
            </Line>
          </ProjectInfoLeft>
          <ProjectInfoRight>
            {getDesLines(description.split("_pid=")[0]).map((line, lIndex) => (
              <Line
                style={{ color: "rgba(255,255,255,0.9)", fontSize: "15px" }}
                className={
                  isInit
                    ? ""
                    : currentIndex !== parseInt(description.split("_pid=")[1])
                    ? "unmount"
                    : "mount"
                }
                key={lIndex}
              >
                {line}
              </Line>
            ))}
          </ProjectInfoRight>
        </ProjectInfoBottom>
      </ProjectInfo>
      <ScrollToViewMoreText>Scroll to view more</ScrollToViewMoreText>
    </Container>
  );
};

export default Projects;
