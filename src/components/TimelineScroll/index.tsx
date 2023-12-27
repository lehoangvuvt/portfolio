"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  flex-flow: row wrap;
`;

const TimestampButton = styled.div<{ $width: number }>`
  padding-top: 10px;
  width: ${(props) => props.$width}%;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  .circle-container {
    display: flex;
    flex-flow: column wrap;
    gap: 10px;
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    align-items: center;
    color: rgba(255, 255, 255, 0.25);
    gap: 5px;
    &.selected {
      color: rgba(255, 255, 255, 1);
    }
  }
  .circle {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    transition: all 0.25s ease;
    &.selected {
      background: rgba(255, 255, 255, 1);
      transform: scale(1.1);
    }
  }
  &:hover {
    .circle,
    .bar {
      background: rgba(255, 255, 255, 0.5);
    }
  }
  .bar {
    flex: 1;
    height: 2.5px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.3);
    margin-top: 5px;
    position: relative;
    overflow: hidden;
    transition: all 0.25s ease;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      background: white;
      transition: transform 1s ease;
      transform: scaleX(0);
      transform-origin: left;
      animation: unScaleBar 0.5s ease;
      @keyframes unScaleBar {
        from {
          transform: scaleX(1);
        }
        to {
          transform: scaleX(0);
        }
      }
    }
    &.selected {
      &::after {
        transform: scaleX(0);
        animation: scaleBar 0.5s ease forwards;
        @keyframes scaleBar {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      }
    }
  }
`;

const TimelineScroll = ({
  timestamps,
  currentIndex,
  onSelectTS,
}: {
  timestamps: number[];
  currentIndex: number;
  onSelectTS?: (index: number) => void;
}) => {
  const [sortedTimestamps, setSortedTimestamps] = useState<
    { ts: number; percentage: number }[]
  >([]);

  const getDateString = (ts: number): string => {
    let dtString = "";
    const dt = new Date(ts * 1000);
    dtString += dt.getMonth() + 1 + "/" + dt.getFullYear();
    return dtString;
  };

  useEffect(() => {
    const sortedTS = timestamps.sort((a, b) => a - b);
    const nowToFirstRange = new Date().getTime() - sortedTS[0] * 1000;
    const nowToLastRange =
      new Date().getTime() - sortedTS[sortedTS.length - 1] * 1000;
    let sortedTimestamps: { ts: number; percentage: number }[] = [];
    for (let i = 1; i < sortedTS.length; i++) {
      const range = sortedTS[i] - sortedTS[i - 1];
      const percentage = ((range * 1000) / nowToFirstRange) * 100;
      sortedTimestamps.push({ percentage, ts: sortedTS[i - 1] });
    }
    sortedTimestamps.push({
      ts: sortedTS[sortedTS.length - 1],
      percentage: (nowToLastRange / nowToFirstRange) * 100,
    });
    setSortedTimestamps(sortedTimestamps);
  }, []);

  useEffect(() => {
    if (sortedTimestamps.length > 0) {
    }
  }, [sortedTimestamps]);

  // const getPos = (ts: number) => {
  //   return (
  //     ((ts - sortedTimestamps[0]) /
  //       (sortedTimestamps[sortedTimestamps.length - 1] - sortedTimestamps[0])) *
  //     100
  //   );
  // };

  return (
    <Container>
      {sortedTimestamps.length > 0 &&
        sortedTimestamps.map((item, i) => (
          <TimestampButton
            onClick={() => {
              if (onSelectTS) onSelectTS(i);
            }}
            key={item.ts}
            className={currentIndex === i ? "selected" : "not-selected"}
            $width={item.percentage}
          >
            <div
              className={
                currentIndex === i
                  ? "circle-container selected"
                  : "circle-container"
              }
            >
              <div
                className={currentIndex === i ? "circle selected" : "circle"}
              />
              {getDateString(item.ts)}
            </div>
            <div className={currentIndex === i ? "bar selected" : "bar"}></div>
          </TimestampButton>
        ))}
    </Container>
  );
};

export default TimelineScroll;
