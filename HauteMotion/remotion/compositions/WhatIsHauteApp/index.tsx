import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import {colors, fonts} from '../../shared/tokens';
import {
  StitchLine,
  FeatureCard,
  IconOrders,
  IconPayment,
  IconClients,
} from '../../shared/elements';
import {Img, staticFile} from 'remotion';
import {LogoReveal} from '../../shared/LogoReveal';

const W = 1080;

// ---- Scene 1: Hook (0-90) — magenta brand screen, white text ----
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const draw = spring({frame, fps, config: {damping: 200}});
  const textIn = interpolate(frame, [20, 45], [0, 1], {extrapolateRight: 'clamp'});
  const underline = interpolate(frame, [55, 80], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: colors.magenta, justifyContent: 'center', padding: 80}}>
      <StitchLine width={W - 160} progress={draw} color={colors.white} />
      <div
        style={{
          opacity: textIn,
          fontFamily: fonts.display,
          fontSize: 84,
          lineHeight: 1.08,
          color: colors.white,
          marginTop: 40,
          fontWeight: 700,
        }}
      >
        Running a fashion business shouldn&apos;t feel like{' '}
        <span style={{position: 'relative', color: colors.champagne}}>
          chaos
          <div style={{position: 'absolute', left: 0, bottom: -14, width: '100%'}}>
            <StitchLine width={300} progress={underline} thickness={5} color={colors.champagne} />
          </div>
        </span>
        .
      </div>
    </AbsoluteFill>
  );
};

// ---- Scene 2: Name reveal (90-180) — REAL logo, stitch-wipe reveal ----
const NameReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // Logo wipes on between frames 8 and 50, then settles.
  const reveal = interpolate(frame, [8, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const settle = spring({frame: frame - 45, fps, config: {damping: 16}});
  const subIn = interpolate(frame, [58, 78], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{backgroundColor: colors.magenta, justifyContent: 'center', alignItems: 'center'}}
    >
      <LogoReveal src="standard-logo.png" width={860} reveal={reveal} settle={settle} />
      <div
        style={{
          opacity: subIn,
          fontFamily: fonts.body,
          fontSize: 40,
          color: 'rgba(255,255,255,0.92)',
          marginTop: 30,
          fontWeight: 500,
        }}
      >
        Business management, built for tailors &amp; designers.
      </div>
    </AbsoluteFill>
  );
};

// ---- Scene 3: What it does (180-390) ----
const Features: React.FC = () => {
  const frame = useCurrentFrame();
  const cards = [
    {icon: <IconOrders />, title: 'Track orders & measurements'},
    {icon: <IconPayment />, title: 'Take payments with ease'},
    {icon: <IconClients />, title: 'Manage clients & styles'},
  ];
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.petal,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 36,
      }}
    >
      {cards.map((c, i) => {
        const start = i * 35;
        const appear = interpolate(frame, [start, start + 30], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return <FeatureCard key={i} icon={c.icon} title={c.title} appear={appear} />;
      })}
    </AbsoluteFill>
  );
};

// ---- Scene 4: How to start (390-510) ----
const Steps: React.FC = () => {
  const frame = useCurrentFrame();
  const steps = ['Sign up free', 'Add your clients', 'Start taking orders'];
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magenta,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 100,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 36,
          color: 'rgba(255,255,255,0.75)',
          marginBottom: 50,
          letterSpacing: 4,
          textTransform: 'uppercase',
        }}
      >
        How to get started
      </div>
      {steps.map((s, i) => {
        const start = i * 28;
        const appear = interpolate(frame, [start, start + 24], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const x = interpolate(appear, [0, 1], [-60, 0]);
        return (
          <div
            key={i}
            style={{
              opacity: appear,
              transform: `translateX(${x}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 30,
              marginBottom: 46,
            }}
          >
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 90,
                fontWeight: 800,
                color: colors.champagne,
                width: 80,
              }}
            >
              {i + 1}
            </div>
            <div
              style={{fontFamily: fonts.body, fontSize: 56, fontWeight: 600, color: colors.white}}
            >
              {s}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---- Scene 5: CTA (510-600) ----
const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 14}});
  const pull = interpolate(frame, [60, 88], [0, 1], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill
      style={{backgroundColor: colors.petal, justifyContent: 'center', alignItems: 'center'}}
    >
      <div style={{transform: `scale(${pop})`, textAlign: 'center'}}>
        <Img
          src={staticFile('android-icon.jpg')}
          style={{width: 150, height: 150, borderRadius: 30, display: 'inline-block'}}
        />
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 100,
            fontWeight: 800,
            color: colors.magenta,
            marginTop: 10,
          }}
        >
          Start free today
        </div>
        <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
          <StitchLine width={520} progress={1 - pull} color={colors.magenta} />
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 44,
            color: colors.magentaDeep,
            marginTop: 30,
            fontWeight: 600,
          }}
        >
          @hauteapp · hauteapps.com
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const WhatIsHauteApp: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.petal}}>
      <Sequence durationInFrames={90}>
        <Hook />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <NameReveal />
      </Sequence>
      <Sequence from={180} durationInFrames={210}>
        <Features />
      </Sequence>
      <Sequence from={390} durationInFrames={120}>
        <Steps />
      </Sequence>
      <Sequence from={510} durationInFrames={90}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
