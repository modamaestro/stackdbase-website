import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { noise2D } from "@remotion/noise";

interface Props {
  colors?: [string, string, string];
  speed?: number;
  style?: React.CSSProperties;
}

/** Animated mesh gradient background using Perlin noise for organic movement. */
export const GradientBg: React.FC<Props> = ({
  colors = ["#080808", "#1A1A1A", "#C8A96E"],
  speed = 0.003,
  style,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const t = frame * speed;

  const x1 = 50 + noise2D("x1", t, 0) * 30;
  const y1 = 50 + noise2D("y1", 0, t) * 30;
  const x2 = 50 + noise2D("x2", t + 10, 0) * 40;
  const y2 = 50 + noise2D("y2", 0, t + 10) * 40;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width,
        height,
        background: `
          radial-gradient(ellipse at ${x1}% ${y1}%, ${colors[2]}33 0%, transparent 60%),
          radial-gradient(ellipse at ${x2}% ${y2}%, ${colors[1]} 0%, ${colors[0]} 100%)
        `,
        ...style,
      }}
    />
  );
};
