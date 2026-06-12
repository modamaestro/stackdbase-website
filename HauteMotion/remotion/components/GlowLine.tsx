import React from "react";
import { useCurrentFrame } from "remotion";
import { progress, ease } from "../lib/easings";

interface Props {
  delay?: number;
  duration?: number;
  color?: string;
  width?: number | string;
  vertical?: boolean;
  style?: React.CSSProperties;
}

/** Animated reveal line — horizontal or vertical — with glow effect. */
export const GlowLine: React.FC<Props> = ({
  delay = 0,
  duration = 20,
  color = "#C8A96E",
  width = "100%",
  vertical = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, delay + duration, ease.expo);

  const base: React.CSSProperties = vertical
    ? {
        width: 1,
        height: `calc(${typeof width === "number" ? `${width}px` : width} * ${p})`,
        background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
        boxShadow: `0 0 12px 2px ${color}88`,
      }
    : {
        height: 1,
        width: `calc(${typeof width === "number" ? `${width}px` : width} * ${p})`,
        background: `linear-gradient(to right, transparent, ${color}, transparent)`,
        boxShadow: `0 0 12px 2px ${color}88`,
      };

  return <div style={{ ...base, opacity: p > 0 ? 1 : 0, ...style }} />;
};
