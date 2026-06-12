// Professional easing curves used across all animations
export const ease = {
  // Smooth deceleration — for elements entering the screen
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),

  // Smooth acceleration — for elements leaving
  easeIn: (t: number) => t * t * t,

  // Ease in + out — for neutral transitions
  easeInOut: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

  // Elastic bounce — for playful callouts
  elastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    if (t === 0 || t === 1) return t;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },

  // Expo out — for snappy reveals
  expo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),

  // Back overshoot — for punchy kinetic text
  back: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },

  // Linear — for mechanical / data animations
  linear: (t: number) => t,
} as const;

export type EasingFn = (t: number) => number;

/** Map frame range [start, end] to [0, 1] with optional easing. */
export function progress(
  frame: number,
  start: number,
  end: number,
  easingFn: EasingFn = ease.easeOut
): number {
  const t = Math.max(0, Math.min(1, (frame - start) / (end - start)));
  return easingFn(t);
}

/** Interpolate between two numbers. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
