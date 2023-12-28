"use client";

import styled from "styled-components";
import { KeyboardEvent, WheelEvent, useRef, useState } from "react";
import MovingImagesSlide from "@/components/MovingImagesSlide";
import BuildText from "@/components/BuildText";
import TimelineScroll from "@/components/TimelineScroll";
import { homeSlides, projects } from "@/data/data";
import { useRouter } from "next/navigation";

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  overflow-y: hidden;
  position: absolute;
  animation: pageContainerAppear 0.5s ease;
  @keyframes pageContainerAppear {
    from {
      filter: brightness(0%);
    }
    to {
      filter: brightness(100%);
    }
  }
`;

const ProjectSlideContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ProjectSlideContainerBottom = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`;

const ProjectSlideLeftTitle = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: 700;
  box-sizing: border-box;
  padding-bottom: 20px;
  padding-right: 30px;
`;

const ProjectSlideContainerTop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  position: absolute;
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

const ScrollIndicatorContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  pointer-events: none;
  animation: scrollAppear 1s ease;
  padding-bottom: 40px;
  box-sizing: border-box;

  @keyframes scrollAppear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &.disabled {
    opacity: 0.8;
    .scroll-btn .mouse > * {
      -webkit-animation: none;
      -moz-animation: none;
      animation: none;
    }
  }

  @-webkit-keyframes ani-mouse {
    0% {
      opacity: 1;
      top: 29%;
    }
    15% {
      opacity: 1;
      top: 50%;
    }
    50% {
      opacity: 0;
      top: 50%;
    }
    100% {
      opacity: 0;
      top: 29%;
    }
  }
  @-moz-keyframes ani-mouse {
    0% {
      opacity: 1;
      top: 29%;
    }
    15% {
      opacity: 1;
      top: 50%;
    }
    50% {
      opacity: 0;
      top: 50%;
    }
    100% {
      opacity: 0;
      top: 29%;
    }
  }
  @keyframes ani-mouse {
    0% {
      opacity: 1;
      top: 29%;
    }
    15% {
      opacity: 1;
      top: 50%;
    }
    50% {
      opacity: 0;
      top: 50%;
    }
    100% {
      opacity: 0;
      top: 29%;
    }
  }
  .scroll-btn {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
  }
  .scroll-btn > * {
    display: inline-block;
    line-height: 18px;
    font-size: 13px;
    font-weight: normal;
    color: #7f8c8d;
    color: #ffffff;
    font-family: "proxima-nova", "Helvetica Neue", Helvetica, Arial, sans-serif;
    letter-spacing: 2px;
  }
  .scroll-btn > *:hover,
  .scroll-btn > *:focus,
  .scroll-btn > *.active {
    color: #ffffff;
  }
  .scroll-btn > *:hover,
  .scroll-btn > *:focus,
  .scroll-btn > *:active,
  .scroll-btn > *.active {
    opacity: 0.8;
    filter: alpha(opacity=80);
  }
  .scroll-btn .mouse {
    position: relative;
    display: block;
    width: 35px;
    height: 55px;
    margin: 0 auto 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 3px solid white;
    border-radius: 23px;
  }
  .scroll-btn .mouse > * {
    position: absolute;
    display: block;
    top: 29%;
    left: 50%;
    width: 8px;
    height: 8px;
    margin: -4px 0 0 -4px;
    background: white;
    border-radius: 50%;
    -webkit-animation: ani-mouse 2.5s linear infinite;
    -moz-animation: ani-mouse 2.5s linear infinite;
    animation: ani-mouse 2.5s linear infinite;
  }
`;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const [isAnimating, setAnimating] = useState(false);
  const [isInit, setInit] = useState(true);
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const router = useRouter();

  const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (!containerRef || !containerRef.current || isAnimating || isInit) return;
    containerRef.current.focus();
    setAnimating(true);
    if (e.deltaY > 0) {
      if (currentIndex < homeSlides.length - 1) {
        setDirection("ltr");
        currentIndexRef.current = currentIndex + 1;
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    } else {
      if (currentIndex > 0) {
        currentIndexRef.current = currentIndex - 1;
        setCurrentIndex(currentIndex - 1);
        setDirection("ltr");
      } else {
        currentIndexRef.current = homeSlides.length - 1;
        setCurrentIndex(homeSlides.length - 1);
        setDirection("ltr");
      }
    }
    setTimeout(() => setAnimating(false), 3500);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (currentIndexRef.current < homeSlides.length - 1) return;
    if (e.key === "Enter") {
      router.push("/projects");
    }
  };

  return (
    <Container
      tabIndex={0}
      ref={containerRef}
      onKeyDown={handleKeyDown}
      onWheelCapture={handleScroll}
    >
      <ProjectSlideContainer>
        <ProjectSlideContainerTop>
          <MovingImagesSlide
            onJumpEnd={() => {
              if (isInit) {
                setInit(false);
              }
              setAnimating(false);
            }}
            slicesAmount={60}
            delayTime={0.01}
            images={homeSlides.map((item) => {
              return {
                src: item.image,
                text: item.title,
              };
            })}
            direction={direction}
            currentIndex={currentIndex}
          />
          <BuildText text={projects[currentIndex].name} />{" "}
        </ProjectSlideContainerTop>
        <ProjectSlideContainerBottom>
          {/* <TimelineScroll
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
          /> */}
          {/* <ProjectSlideLeftTitle>
            <BuildText
              style={{ fontSize: "30px", fontWeight: 700 }}
              text={projects[currentIndex].name}
            />
          </ProjectSlideLeftTitle> */}
        </ProjectSlideContainerBottom>
      </ProjectSlideContainer>
      {!isInit && (
        <ScrollIndicatorContainer className={isAnimating ? "disabled" : ""}>
          <span className="scroll-btn">
            <a href="#">
              <span className="mouse">
                <span></span>
              </span>
            </a>
            <p>{isAnimating ? "hold on" : "scroll me"}</p>
          </span>
        </ScrollIndicatorContainer>
      )}
    </Container>
  );
}
