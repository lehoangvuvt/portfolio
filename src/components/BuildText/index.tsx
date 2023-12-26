"use client";

import { useEffect, useState } from "react";

const BuildText = ({
  text,
  style = { fontSize: "40px", letterSpacing: "4px", fontWeight: 500 },
}: {
  text: string;
  style?: React.CSSProperties;
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const [displayText, setDisplayText] = useState("");
  const [triggerAnim, setTriggerAnim] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setTriggerAnim(false);
    let displayText = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== " ") {
        if (alphabet.includes(text[i].toUpperCase())) {
          if (parseInt(text[i])) {
            displayText += "0";
          } else {
            displayText += "A";
          }
        }
      } else {
        displayText += " ";
      }
    }
    setDisplayText(displayText);
  }, [text]);

  useEffect(() => {
    if (displayText !== "" && !triggerAnim) {
      setTriggerAnim(true);
    }
  }, [displayText]);

  useEffect(() => {
    if (triggerAnim) {
      const animText = async (
        displayTextIndex: number,
        alphaBetIndex: number
      ) => {
        let updatedDisplayText = displayText;
        do {
          if (updatedDisplayText.charAt(displayTextIndex) !== " ") {
            let arr = updatedDisplayText.split("");
            arr[displayTextIndex] = alphabet.charAt(alphaBetIndex);
            updatedDisplayText = arr.join("");
            setDisplayText(updatedDisplayText);
            await new Promise((resolve, reject) =>
              setTimeout(() => {
                resolve("");
              }, 10)
            );
            if (
              alphabet.charAt(alphaBetIndex) ===
              text.charAt(displayTextIndex).toUpperCase()
            ) {
              displayTextIndex++;
              alphaBetIndex = 0;
            } else {
              alphaBetIndex++;
            }
          } else {
            displayTextIndex++;
            alphaBetIndex = 0;
          }
        } while (updatedDisplayText !== text.toUpperCase());
      };
      animText(0, 0);
    }
  }, [triggerAnim]);

  return <h1 style={style}>{displayText}</h1>;
};

export default BuildText;
