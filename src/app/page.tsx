"use client";

import styled from "styled-components";
import { WheelEvent, useRef, useState } from "react";
import MovingImagesSlide from "@/components/MovingImagesSlide";
import BuildText from "@/components/BuildText";
import TimelineScroll from "@/components/TimelineScroll";
import { projects } from "@/data/data";

const Container = styled.div`
  width: 100%;
  flex: 1;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  overflow-x: hidden;
`;

const ProjectSlideContainer = styled.div`
  width: 90%;
  display: flex;
  flex-flow: row wrap;
`;

const ProjectSlideContainerLeft = styled.div`
  width: 50%;
  display: flex;
  flex-flow: column wrap;
  position: relative;
`;

const ProjectSlideLeftTitle = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: 700;
  box-sizing: border-box;
  padding-bottom: 20px;
  padding-right: 30px;
`;

const ProjectSlideContainerRight = styled.div`
  width: 50%;
  display: flex;
  flex-flow: row wrap;
`;

const ProjectSlideDescription = styled.div`
  width: 100%;
  padding-right: 30px;
  box-sizing: border-box;
  &::before {
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #131418;
    position: absolute;
    transform-origin: right;
    animation: projectSlideAppear 1s ease forwards;
    transform: scaleX(1);
    @keyframes projectSlideAppear {
      from {
        transform: scaleX(1);
      }
      to {
        transform: scaleX(0);
      }
    }
  }
`;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (!containerRef || !containerRef.current || isAnimating) return;
    setAnimating(true);
    if (e.deltaY > 0) {
      if (currentIndex < projects.length - 1) {
        setDirection("rtl");
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    } else {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setDirection("ltr");
      } else {
        setCurrentIndex(projects.length - 1);
        setDirection("rtl");
      }
    }
    setTimeout(() => setAnimating(false), 500);
  };

  return (
    <Container ref={containerRef} onWheelCapture={handleScroll}>
      <ProjectSlideContainer>
        <ProjectSlideContainerLeft>
          <ProjectSlideLeftTitle>
            <BuildText
              style={{ fontSize: "30px", fontWeight: 700 }}
              text={projects[currentIndex].name}
            />
          </ProjectSlideLeftTitle>
          <ProjectSlideDescription key={currentIndex}>
            {projects[currentIndex].description ?? ""}
          </ProjectSlideDescription>
          <p>Features:</p>
          <ul>
            {projects[currentIndex].features.length > 0 &&
              projects[currentIndex].features.map((feature, fIndex) => (
                <li key={fIndex}>{feature}</li>
              ))}
          </ul>
        </ProjectSlideContainerLeft>
        <ProjectSlideContainerRight>
          <MovingImagesSlide
            slicesAmount={30}
            delayTime={0.05}
            images={projects.map((project) => {
              return {
                src: project.image,
                text: project.category,
              };
            })}
            direction={direction}
            currentIndex={currentIndex}
          />
          <BuildText text={projects[currentIndex].name} />{" "}
          <TimelineScroll
            timestamps={projects.map((project) => project.timestamp)}
            onSelectTS={(index) => {
              if (index < currentIndex) {
                setDirection("ltr");
              } else {
                setDirection("rtl");
              }
              setCurrentIndex(index);
            }}
            currentIndex={currentIndex}
          />
        </ProjectSlideContainerRight>
      </ProjectSlideContainer>
    </Container>
  );
}
