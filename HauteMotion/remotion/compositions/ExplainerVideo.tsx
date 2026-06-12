import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Sequence } from "remotion";
import { GradientBg } from "../components/GradientBg";
import { AnimatedText } from "../components/AnimatedText";
import { KineticWord } from "../components/KineticWord";
import { GlowLine } from "../components/GlowLine";
import { ProgressBar } from "../components/ProgressBar";
import { colors, fonts } from "../lib/tokens";
import { progress, ease } from "../lib/easings";

// ── Scene plan (30 fps, 300 frames = 10 s) ────────────────────────────────
// 0–70   Problem statement
// 70–150 Solution reveal (3 steps)
// 150–230 Feature deep dive
// 230–300 CTA
// ─────────────────────────────────────────────────────────────────────────

const StepCard: React.FC<{ icon: string; title: string; body: string; delay: number }> = ({ icon, title, body, delay }) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, delay + 25, ease.easeOut);
  return (
    <div style={{
      flex: 1, background: `${colors.charcoal}ee`,
      border: `1px solid ${colors.slate}`,
      borderRadius: 20, padding: "28px 24px",
      opacity: p, transform: `translateY(${(1 - p) * 40}px)`,
    }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontSize: 20, fontWeight: 600, color: colors.white, marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 15, color: colors.mist, lineHeight: 1.6 }}>{body}</div>
    </div>
  );
};

const ExplainerVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const features = [
    { label: "Performance", value: 98 },
    { label: "Security Score", value: 95 },
    { label: "Developer Experience", value: 100 },
    { label: "Scalability", value: 97 },
  ];

  const ctaScale = progress(frame, 242, 260, ease.back);

  return (
    <AbsoluteFill style={{ fontFamily: fonts.sans, color: colors.white, overflow: "hidden" }}>
      <GradientBg colors={["#080808", "#0a0f1a", "#10B981"]} speed={0.0015} />

      {/* ── SCENE 1: Problem Statement (0–70) ───────────────────────────── */}
      <Sequence from={0} durationInFrames={70}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 100px", textAlign: "center" }}>
          <AnimatedText delay={5} duration={15} effect="fade">
            <span style={{ fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: colors.emerald }}>
              The problem
            </span>
          </AnimatedText>
          <div style={{ marginTop: 20 }}>
            <KineticWord
              text="Building apps is"
              startFrame={8}
              stagger={2}
              style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}
            />
          </div>
          <div>
            <KineticWord
              text="too complicated."
              startFrame={26}
              stagger={2}
              style={{ fontSize: 52, fontWeight: 700, color: colors.rose, letterSpacing: "-0.02em" }}
            />
          </div>
          <AnimatedText delay={36} duration={18} effect="fade-up" style={{ display: "block", marginTop: 20 }}>
            <span style={{ fontSize: 18, color: colors.mist, maxWidth: 520, display: "block" }}>
              Developers lose weeks to boilerplate, config, and infrastructure — before writing a single line of product logic.
            </span>
          </AnimatedText>
          <div style={{ marginTop: 32 }}>
            <GlowLine delay={44} duration={20} color={colors.rose} width={120} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ── SCENE 2: Solution Steps (70–150) ────────────────────────────── */}
      <Sequence from={70} durationInFrames={80}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 60px", gap: 28 }}>
          <AnimatedText delay={2} duration={15} effect="fade" style={{ display: "block", textAlign: "center" }}>
            <span style={{ fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: colors.emerald }}>
              The solution
            </span>
          </AnimatedText>
          <AnimatedText delay={5} duration={18} effect="fade-up" style={{ display: "block", textAlign: "center" }}>
            <span style={{ fontSize: 42, fontWeight: 700, letterSpacing: "-0.02em" }}>One platform. Infinite scale.</span>
          </AnimatedText>
          <div style={{ display: "flex", gap: 20, width: "100%" }}>
            <StepCard icon="🧱" title="Build" body="Start with production-ready templates. No boilerplate, no config hell." delay={15} />
            <StepCard icon="🚀" title="Ship" body="One-click deploys to a global edge network. Your app, everywhere, instantly." delay={25} />
            <StepCard icon="📈" title="Scale" body="Auto-scaling infrastructure that grows with you — from zero to millions." delay={35} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ── SCENE 3: Feature Deep Dive (150–230) ────────────────────────── */}
      <Sequence from={150} durationInFrames={80}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 80px", gap: 20 }}>
          <AnimatedText delay={2} duration={15} effect="fade" style={{ display: "block", textAlign: "center" }}>
            <span style={{ fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: colors.emerald }}>
              Performance metrics
            </span>
          </AnimatedText>
          <AnimatedText delay={5} duration={18} effect="fade-up" style={{ display: "block", textAlign: "center" }}>
            <span style={{ fontSize: 42, fontWeight: 700, letterSpacing: "-0.02em" }}>Best-in-class, by every measure.</span>
          </AnimatedText>
          <div style={{ width: "100%", maxWidth: 640, display: "flex", flexDirection: "column", gap: 24, marginTop: 12 }}>
            {features.map((f, i) => (
              <ProgressBar
                key={f.label}
                label={f.label}
                value={f.value}
                delay={18 + i * 12}
                duration={40}
                color={colors.emerald}
              />
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ── SCENE 4: CTA (230–300) ──────────────────────────────────────── */}
      <Sequence from={230} durationInFrames={70}>
        <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, textAlign: "center", padding: "0 80px" }}>
          <AnimatedText delay={2} duration={18} effect="fade-up" style={{ display: "block" }}>
            <span style={{ fontSize: 50, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Stop wasting time.<br />Start shipping.
            </span>
          </AnimatedText>
          <AnimatedText delay={14} duration={18} effect="fade-up" style={{ display: "block" }}>
            <span style={{ fontSize: 18, color: colors.mist }}>
              Join 2.4M+ developers already building on StackdBase.
            </span>
          </AnimatedText>
          <div style={{
            marginTop: 12, padding: "18px 52px",
            background: `linear-gradient(135deg, ${colors.emerald}, ${colors.cyan})`,
            borderRadius: 14, fontSize: 18, fontWeight: 600,
            transform: `scale(${ctaScale})`,
            boxShadow: `0 0 48px ${colors.emerald}66`,
          }}>
            Try Free for 14 Days →
          </div>
          <AnimatedText delay={30} duration={18} effect="fade" style={{ display: "block" }}>
            <span style={{ fontSize: 13, color: colors.mist }}>No credit card · Cancel anytime · Free tier available</span>
          </AnimatedText>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export default ExplainerVideo;
