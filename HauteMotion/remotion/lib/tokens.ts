// Design tokens shared across all compositions
export const colors = {
  black: "#080808",
  white: "#F5F4EF",
  gold: "#C8A96E",
  goldLight: "#E2C990",
  goldDark: "#9A7A44",
  charcoal: "#1A1A1A",
  slate: "#2E2E2E",
  mist: "#AAAAAA",
  blue: "#3B82F6",
  violet: "#7C3AED",
  cyan: "#06B6D4",
  rose: "#F43F5E",
  emerald: "#10B981",
} as const;

export const fonts = {
  heading: "'Georgia', 'Times New Roman', serif",
  sans: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "'Courier New', monospace",
} as const;

// Standard canvas sizes
export const sizes = {
  reels: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
  landscape: { width: 1920, height: 1080 },
  story: { width: 1080, height: 1920 },
  ad: { width: 1200, height: 628 },
} as const;

export const fps = 30;
