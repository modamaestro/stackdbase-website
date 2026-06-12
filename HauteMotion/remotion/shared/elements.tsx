import React from 'react';
import { colors, fonts } from './tokens';

// ── StitchLine ────────────────────────────────────────────────────────────
// Draws a dashed "thread stitch" line progressively from left to right.
// progress: 0 = hidden, 1 = fully drawn.
interface StitchLineProps {
  width: number;
  progress: number;
  thickness?: number;
  color?: string;
  dashLength?: number;
  gapLength?: number;
}

export const StitchLine: React.FC<StitchLineProps> = ({
  width,
  progress,
  thickness = 3,
  color = colors.white,
  dashLength = 18,
  gapLength = 10,
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const totalDash = dashLength + gapLength;
  const totalLength = width + totalDash;
  // SVG stroke-dashoffset trick: offset goes from totalLength → 0
  const offset = totalLength * (1 - p);

  return (
    <svg
      width={width}
      height={thickness * 6}
      viewBox={`0 0 ${width} ${thickness * 6}`}
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* Shadow thread */}
      <line
        x1={0}
        y1={thickness * 3}
        x2={width}
        y2={thickness * 3}
        stroke={color}
        strokeOpacity={0.25}
        strokeWidth={thickness}
        strokeDasharray={`${dashLength} ${gapLength}`}
      />
      {/* Animated draw thread */}
      <line
        x1={0}
        y1={thickness * 3}
        x2={width}
        y2={thickness * 3}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={`${dashLength} ${gapLength}`}
        strokeDashoffset={offset}
        style={{ filter: `drop-shadow(0 0 3px ${color}88)` }}
      />
      {/* Needle head at the leading edge */}
      {p > 0.02 && p < 0.98 && (
        <ellipse
          cx={Math.min(p * width, width - 4)}
          cy={thickness * 3}
          rx={4}
          ry={thickness * 0.9}
          fill={color}
          opacity={0.9}
        />
      )}
    </svg>
  );
};

// ── FeatureCard ───────────────────────────────────────────────────────────
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  appear: number; // 0-1
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, appear }) => {
  const p = Math.max(0, Math.min(1, appear));
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        background: 'rgba(187,23,134,0.10)',
        border: `2px solid rgba(187,23,134,${0.3 * p})`,
        borderRadius: 28,
        padding: '28px 44px',
        width: 860,
        opacity: p,
        transform: `translateY(${(1 - p) * 36}px)`,
      }}
    >
      <div style={{ flexShrink: 0, width: 72, height: 72 }}>{icon}</div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 44,
          fontWeight: 600,
          color: colors.magenta,
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
    </div>
  );
};

// ── Icons ─────────────────────────────────────────────────────────────────
const iconStyle: React.CSSProperties = {
  width: 72,
  height: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 18,
  background: colors.magenta,
  fontSize: 36,
};

export const IconOrders: React.FC = () => (
  <div style={iconStyle}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="6" y="4" width="28" height="34" rx="4" stroke="white" strokeWidth="2.5" fill="none" />
      <line x1="12" y1="13" x2="28" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="20" x2="28" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="27" x2="22" y2="27" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* Needle */}
      <line x1="30" y1="24" x2="30" y2="34" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="30" cy="23" rx="2" ry="2.5" fill="white" />
    </svg>
  </div>
);

export const IconPayment: React.FC = () => (
  <div style={iconStyle}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="4" y="10" width="32" height="22" rx="4" stroke="white" strokeWidth="2.5" fill="none" />
      <line x1="4" y1="17" x2="36" y2="17" stroke="white" strokeWidth="2.5" />
      <rect x="9" y="23" width="8" height="4" rx="2" fill="white" />
      <circle cx="32" cy="25" r="4" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="28" cy="25" r="4" stroke="white" strokeWidth="2" fill="none" />
    </svg>
  </div>
);

export const IconClients: React.FC = () => (
  <div style={iconStyle}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="13" r="7" stroke="white" strokeWidth="2.5" fill="none" />
      <path d="M6 35c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);
