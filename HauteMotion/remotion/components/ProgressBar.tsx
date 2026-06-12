import React from "react";
import { useCurrentFrame } from "remotion";
import { progress, ease } from "../lib/easings";
import { colors } from "../lib/tokens";

interface Props {
  label?: string;
  value: number; // 0–100
  delay?: number;
  duration?: number;
  color?: string;
  trackColor?: string;
  height?: number;
  style?: React.CSSProperties;
}

/** Animated progress bar — great for skill showcases and feature highlights. */
export const ProgressBar: React.FC<Props> = ({
  label,
  value,
  delay = 0,
  duration = 40,
  color = colors.gold,
  trackColor = colors.slate,
  height = 4,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, delay + duration, ease.easeOut);
  const labelP = progress(frame, delay, delay + 15, ease.easeOut);

  return (
    <div style={{ width: "100%", ...style }}>
      {label && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            opacity: labelP,
            transform: `translateY(${(1 - labelP) * 8}px)`,
            fontSize: 14,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span>{label}</span>
          <span style={{ color }}>{Math.round(value * p)}%</span>
        </div>
      )}
      <div
        style={{
          width: "100%",
          height,
          background: trackColor,
          borderRadius: height,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value * p}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            borderRadius: height,
            boxShadow: `0 0 8px ${color}66`,
            transition: "none",
          }}
        />
      </div>
    </div>
  );
};
