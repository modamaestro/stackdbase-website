import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { GradientBg } from "../components/GradientBg";
import { AnimatedText } from "../components/AnimatedText";
import { GlowLine } from "../components/GlowLine";
import { Counter } from "../components/Counter";
import { colors, fonts } from "../lib/tokens";
import { progress, ease } from "../lib/easings";

// ── Scene timings (30 fps) ─────────────────────────────────────────────────
// Scene 1 (0–60):   Logo reveal + tagline
// Scene 2 (60–120): Feature callouts
// Scene 3 (120–180): Social proof stats
// Scene 4 (180–210): CTA
// ──────────────────────────────────────────────────────────────────────────

const AppAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Scene transitions
  const scene2opacity = interpolate(frame, [55, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const scene3opacity = interpolate(frame, [115, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const scene4opacity = interpolate(frame, [175, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const scene1opacity = interpolate(frame, [50, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scene2out = interpolate(frame, [110, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scene3out = interpolate(frame, [170, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const features = [
    { icon: "⚡", label: "Blazing Fast", sub: "0.8s avg load time" },
    { icon: "🔒", label: "Bank-Grade Security", sub: "256-bit encryption" },
    { icon: "📊", label: "Real-Time Analytics", sub: "Live dashboards" },
  ];

  const stats = [
    { value: 2400000, suffix: "+", label: "Active Users", decimals: 0, format: (v: number) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : `${Math.round(v)}` },
    { value: 4.9, suffix: "★", label: "App Store Rating", decimals: 1, format: (v: number) => v.toFixed(1) },
    { value: 99.9, suffix: "%", label: "Uptime SLA", decimals: 1, format: (v: number) => v.toFixed(1) },
  ];

  const ctaP = progress(frame, 185, 205, ease.back);

  return (
    <AbsoluteFill style={{ fontFamily: fonts.sans, overflow: "hidden" }}>
      <GradientBg colors={["#080808", "#0d0d1a", "#3B82F6"]} speed={0.002} />

      {/* ── SCENE 1: Logo & Tagline ─────────────────────────────────────── */}
      <AbsoluteFill
        style={{ opacity: scene1opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
      >
        {/* Logo mark */}
        <div style={{ marginBottom: 24, opacity: progress(frame, 0, 20, ease.easeOut) }}>
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.violet})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, boxShadow: `0 0 40px ${colors.blue}66`,
            transform: `scale(${0.6 + progress(frame, 0, 20, ease.back) * 0.4})`,
          }}>
            ◈
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <AnimatedText delay={10} duration={20} effect="fade-up" style={{ display: "block" }}>
            <span style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-0.02em", color: colors.white }}>
              StackdBase
            </span>
          </AnimatedText>
          <AnimatedText delay={20} duration={20} effect="fade-up" style={{ display: "block", marginTop: 12 }}>
            <span style={{ fontSize: 20, color: colors.mist, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Build. Ship. Scale.
            </span>
          </AnimatedText>
        </div>

        <div style={{ marginTop: 36 }}>
          <GlowLine delay={30} duration={25} color={colors.blue} width={200} />
        </div>
      </AbsoluteFill>

      {/* ── SCENE 2: Feature Callouts ────────────────────────────────────── */}
      <AbsoluteFill
        style={{ opacity: scene2opacity * scene2out, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, padding: "0 80px" }}
      >
        <AnimatedText delay={65} duration={15} effect="fade" style={{ display: "block", marginBottom: 8 }}>
          <span style={{ fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: colors.blue }}>
            Why teams choose us
          </span>
        </AnimatedText>
        {features.map((f, i) => {
          const p = progress(frame, 68 + i * 10, 88 + i * 10, ease.easeOut);
          return (
            <div
              key={f.label}
              style={{
                display: "flex", alignItems: "center", gap: 24,
                width: "100%", maxWidth: 520,
                opacity: p, transform: `translateX(${(1 - p) * -40}px)`,
                background: `${colors.charcoal}cc`,
                border: `1px solid ${colors.slate}`,
                borderRadius: 16, padding: "20px 28px",
              }}
            >
              <span style={{ fontSize: 36 }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 600, color: colors.white }}>{f.label}</div>
                <div style={{ fontSize: 14, color: colors.mist, marginTop: 4 }}>{f.sub}</div>
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* ── SCENE 3: Social Proof Stats ──────────────────────────────────── */}
      <AbsoluteFill
        style={{ opacity: scene3opacity * scene3out, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}
      >
        <AnimatedText delay={125} duration={15} effect="fade" style={{ display: "block", marginBottom: 24 }}>
          <span style={{ fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: colors.blue }}>
            Trusted by developers worldwide
          </span>
        </AnimatedText>
        <div style={{ display: "flex", gap: 48 }}>
          {stats.map((s, i) => {
            const p = progress(frame, 128 + i * 8, 148 + i * 8, ease.easeOut);
            return (
              <div key={s.label} style={{ textAlign: "center", opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>
                <div style={{ fontSize: 52, fontWeight: 700, color: colors.white, lineHeight: 1 }}>
                  <Counter
                    to={s.value}
                    delay={130 + i * 8}
                    duration={35}
                    decimals={s.decimals}
                    suffix={s.suffix}
                  />
                </div>
                <div style={{ fontSize: 13, color: colors.mist, marginTop: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {s.label}
                </div>
                <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
                  <GlowLine delay={140 + i * 8} duration={15} color={colors.blue} width={60} />
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* ── SCENE 4: CTA ─────────────────────────────────────────────────── */}
      <AbsoluteFill
        style={{ opacity: scene4opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}
      >
        <AnimatedText delay={182} duration={18} effect="fade-up" style={{ display: "block" }}>
          <span style={{ fontSize: 44, fontWeight: 700, color: colors.white, textAlign: "center", display: "block" }}>
            Start building today.
          </span>
        </AnimatedText>
        <AnimatedText delay={190} duration={18} effect="fade-up" style={{ display: "block" }}>
          <span style={{ fontSize: 18, color: colors.mist }}>Free forever. No credit card required.</span>
        </AnimatedText>
        <div
          style={{
            marginTop: 12,
            padding: "18px 48px",
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.violet})`,
            borderRadius: 14,
            fontSize: 18, fontWeight: 600, color: colors.white,
            letterSpacing: "0.04em",
            transform: `scale(${ctaP})`,
            boxShadow: `0 0 40px ${colors.blue}66`,
          }}
        >
          Get Started Free →
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default AppAd;
