import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { GradientBg } from "../components/GradientBg";
import { AnimatedText } from "../components/AnimatedText";
import { KineticWord } from "../components/KineticWord";
import { GlowLine } from "../components/GlowLine";
import { Counter } from "../components/Counter";
import { colors, fonts } from "../lib/tokens";
import { progress, ease } from "../lib/easings";

// ── 9:16 vertical reel (1080×1920) — 6s @ 30fps = 180 frames ─────────────
// 0–45    Hook headline
// 45–105  Value bullets (3 × staggered)
// 105–150 Big stat
// 150–180 CTA with logo
// ─────────────────────────────────────────────────────────────────────────

const Bullet: React.FC<{ emoji: string; text: string; delay: number }> = ({ emoji, text, delay }) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, delay + 22, ease.easeOut);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 20,
      background: `${colors.charcoal}cc`,
      border: `1px solid ${colors.slate}`,
      borderRadius: 20, padding: "24px 32px",
      opacity: p, transform: `translateX(${(1 - p) * -50}px)`,
      width: "100%",
    }}>
      <span style={{ fontSize: 44 }}>{emoji}</span>
      <span style={{ fontSize: 26, fontWeight: 600, color: colors.white, lineHeight: 1.3 }}>{text}</span>
    </div>
  );
};

const SocialReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const ctaP = progress(frame, 162, 178, ease.back);

  return (
    <AbsoluteFill style={{ fontFamily: fonts.sans, color: colors.white, overflow: "hidden" }}>
      <GradientBg colors={["#080808", "#10091a", "#7C3AED"]} speed={0.004} />

      {/* Scanline texture overlay */}
      <AbsoluteFill style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
        pointerEvents: "none",
      }} />

      {/* ── HOOK (0–45) ─────────────────────────────────────────────────── */}
      <Sequence from={0} durationInFrames={45}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 60px", textAlign: "center" }}>
          <AnimatedText delay={3} duration={12} effect="fade">
            <span style={{ fontSize: 20, letterSpacing: "0.2em", textTransform: "uppercase", color: colors.violet }}>
              🔥 Dev tip
            </span>
          </AnimatedText>
          <div style={{ marginTop: 24 }}>
            <KineticWord
              text="Ship your app"
              startFrame={6}
              stagger={3}
              style={{ fontSize: 72, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}
            />
          </div>
          <div style={{ marginTop: 4 }}>
            <KineticWord
              text="10× faster."
              startFrame={22}
              stagger={3}
              style={{ fontSize: 72, fontWeight: 800, color: colors.violet, letterSpacing: "-0.03em", lineHeight: 1.1 }}
            />
          </div>
          <div style={{ marginTop: 32 }}>
            <GlowLine delay={30} duration={15} color={colors.violet} width={160} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ── VALUE BULLETS (45–105) ──────────────────────────────────────── */}
      <Sequence from={45} durationInFrames={60}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 50px", gap: 24 }}>
          <AnimatedText delay={2} duration={14} effect="fade" style={{ display: "block", marginBottom: 8 }}>
            <span style={{ fontSize: 18, letterSpacing: "0.18em", textTransform: "uppercase", color: colors.violet }}>
              Here's how
            </span>
          </AnimatedText>
          <Bullet emoji="⚡" text="Zero-config deploys in under 30 seconds" delay={8} />
          <Bullet emoji="🧱" text="Pre-built, production-ready templates" delay={20} />
          <Bullet emoji="📡" text="Global edge network — instant everywhere" delay={32} />
        </AbsoluteFill>
      </Sequence>

      {/* ── BIG STAT (105–150) ─────────────────────────────────────────── */}
      <Sequence from={105} durationInFrames={45}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16 }}>
          <AnimatedText delay={3} duration={14} effect="fade">
            <span style={{ fontSize: 20, letterSpacing: "0.18em", textTransform: "uppercase", color: colors.violet }}>
              Trusted by
            </span>
          </AnimatedText>
          <div style={{
            fontSize: 120, fontWeight: 800, letterSpacing: "-0.04em",
            lineHeight: 1, color: colors.white,
            opacity: progress(frame, 6, 18, ease.easeOut),
            transform: `scale(${0.7 + progress(frame, 6, 22, ease.back) * 0.3})`,
          }}>
            <Counter to={2400000} delay={8} duration={30} decimals={1} suffix="M+" />
          </div>
          <AnimatedText delay={14} duration={14} effect="fade-up" style={{ display: "block" }}>
            <span style={{ fontSize: 28, color: colors.mist }}>developers worldwide</span>
          </AnimatedText>
          <div style={{ marginTop: 12 }}>
            <GlowLine delay={20} duration={16} color={colors.violet} width={200} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ── CTA (150–180) ──────────────────────────────────────────────── */}
      <Sequence from={150} durationInFrames={30}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, textAlign: "center", padding: "0 60px" }}>
          {/* Logo lockup */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: progress(frame, 2, 14, ease.easeOut) }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20,
              background: `linear-gradient(135deg, ${colors.violet}, ${colors.blue})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36, boxShadow: `0 0 40px ${colors.violet}66`,
            }}>◈</div>
            <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.01em" }}>StackdBase</span>
          </div>

          <div style={{
            padding: "22px 56px",
            background: `linear-gradient(135deg, ${colors.violet}, ${colors.blue})`,
            borderRadius: 18, fontSize: 22, fontWeight: 700,
            transform: `scale(${ctaP})`,
            boxShadow: `0 0 50px ${colors.violet}66`,
          }}>
            Start Free Today →
          </div>

          <AnimatedText delay={16} duration={14} effect="fade" style={{ display: "block" }}>
            <span style={{ fontSize: 18, color: colors.mist }}>stackdbase.com</span>
          </AnimatedText>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export default SocialReel;
