import React from "react";
import { Composition } from "remotion";
import AppAd from "./compositions/AppAd";
import ExplainerVideo from "./compositions/ExplainerVideo";
import SocialReel from "./compositions/SocialReel";
import { WhatIsHauteApp } from "./compositions/WhatIsHauteApp";
import { fps } from "./lib/tokens";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 16:9 landscape — App ad (7s) */}
      <Composition
        id="AppAd"
        component={AppAd}
        durationInFrames={210}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* 16:9 landscape — Explainer video (10s) */}
      <Composition
        id="ExplainerVideo"
        component={ExplainerVideo}
        durationInFrames={300}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* 9:16 vertical — Social / Reels (6s) */}
      <Composition
        id="SocialReel"
        component={SocialReel}
        durationInFrames={180}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* 9:16 vertical — HauteApp brand intro (20s) */}
      <Composition
        id="WhatIsHauteApp"
        component={WhatIsHauteApp}
        durationInFrames={600}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};
