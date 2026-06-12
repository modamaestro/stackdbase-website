import React from "react";
import { useCurrentFrame } from "remotion";
import { progress, ease, EasingFn } from "../lib/easings";

interface Props {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  effect?: "fade-up" | "fade-down" | "fade" | "clip" | "scale";
  easing?: EasingFn;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<Props> = ({
  children,
  delay = 0,
  duration = 20,
  effect = "fade-up",
  easing = ease.easeOut,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, delay + duration, easing);

  const effects: Record<string, React.CSSProperties> = {
    "fade-up": {
      opacity: p,
      transform: `translateY(${(1 - p) * 32}px)`,
    },
    "fade-down": {
      opacity: p,
      transform: `translateY(${-(1 - p) * 32}px)`,
    },
    fade: {
      opacity: p,
    },
    scale: {
      opacity: p,
      transform: `scale(${0.8 + p * 0.2})`,
    },
    clip: {
      clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`,
    },
  };

  return (
    <span
      style={{
        display: "inline-block",
        willChange: "transform, opacity",
        ...effects[effect],
        ...style,
      }}
    >
      {children}
    </span>
  );
};
