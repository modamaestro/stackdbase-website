import React from "react";
import { useCurrentFrame } from "remotion";
import { progress, ease } from "../lib/easings";

interface Props {
  from?: number;
  to: number;
  delay?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}

/** Animated number counter — perfect for stats and metrics in explainer videos. */
export const Counter: React.FC<Props> = ({
  from = 0,
  to,
  delay = 0,
  duration = 60,
  decimals = 0,
  prefix = "",
  suffix = "",
  style,
}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, delay + duration, ease.easeOut);
  const value = from + (to - from) * p;

  return (
    <span style={style}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};
