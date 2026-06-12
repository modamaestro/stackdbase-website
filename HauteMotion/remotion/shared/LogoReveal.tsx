import React from 'react';
import {Img, staticFile, interpolate} from 'remotion';

// Reveals the REAL HauteApp logo with a diagonal "stitch wipe" — a sweep that
// uncovers the artwork left-to-right at the same shallow angle as the needle,
// so it feels stitched onto the screen. The artwork itself is never altered.
//
// reveal: 0..1 controls how much of the logo is uncovered.
// settle: 0..1 controls a subtle scale settle after the wipe.
export const LogoReveal: React.FC<{
  src?: string;
  width?: number;
  reveal: number;
  settle?: number;
}> = ({src = 'standard-logo.png', width = 820, reveal, settle = 1}) => {
  const r = Math.max(0, Math.min(1, reveal));
  // The mask edge sweeps from left (-20%) to fully past the right (120%).
  const edge = interpolate(r, [0, 1], [-15, 115]);
  const scale = interpolate(settle, [0, 1], [1.04, 1]);

  return (
    <div
      style={{
        width,
        transform: `scale(${scale})`,
        // Diagonal reveal mask — the soft band mimics the needle angle (~-9deg).
        WebkitMaskImage: `linear-gradient(99deg, #000 ${edge - 12}%, #000 ${edge - 4}%, transparent ${edge}%)`,
        maskImage: `linear-gradient(99deg, #000 ${edge - 12}%, #000 ${edge - 4}%, transparent ${edge}%)`,
      }}
    >
      <Img src={staticFile(src)} style={{width: '100%', display: 'block'}} />
    </div>
  );
};
