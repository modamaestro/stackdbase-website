import React from "react";
import { useCurrentFrame } from "remotion";
import { progress, ease } from "../lib/easings";

interface Props {
  text: string;
  startFrame?: number;
  stagger?: number;
  duration?: number;
  style?: React.CSSProperties;
  charStyle?: React.CSSProperties;
}

/** Animates each character individually with a stagger for kinetic typography. */
export const KineticWord: React.FC<Props> = ({
  text,
  startFrame = 0,
  stagger = 3,
  duration = 18,
  style,
  charStyle,
}) => {
  const frame = useCurrentFrame();

  return (
    <span style={{ display: "inline-flex", overflow: "hidden", ...style }}>
      {text.split("").map((char, i) => {
        const delay = startFrame + i * stagger;
        const p = progress(frame, delay, delay + duration, ease.back);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: Math.min(1, p * 2),
              transform: `translateY(${(1 - p) * 60}px) rotate(${(1 - p) * 8}deg)`,
              willChange: "transform, opacity",
              ...charStyle,
            }}
          >
            {char === " " ? " " : char}
          </span>
        );
      })}
    </span>
  );
};
