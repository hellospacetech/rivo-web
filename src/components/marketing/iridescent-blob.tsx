"use client";

import { useEffect, useId, useRef } from "react";
import { createNoise3D } from "simplex-noise";

/**
 * <IridescentBlob>, organic morphing blob with chromatic aberration edges.
 *
 * Technique:
 *   1. Six control points arranged in a circle, displaced by simplex noise
 *   2. Smooth cardinal spline drawn through the points as an SVG <path>
 *   3. SVG filter: RGB channel split for prismatic/iridescent edges
 *   4. Bright gradient fill so the blob is visible on the dark bg
 *
 * Performance: single rAF loop at ~30fps, will-change on path.
 * Respects prefers-reduced-motion: static shape, no loop.
 */

const NUM_POINTS = 6;
const NOISE_SPEED = 0.0025;
const NOISE_SCALE = 0.8;

interface IridescentBlobProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function IridescentBlob({
  width = 500,
  height = 500,
  className,
  style,
}: IridescentBlobProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const noise3D = createNoise3D();
    const cx = width / 2;
    const cy = height / 2;
    const baseRadius = Math.min(width, height) * 0.34;
    let t = 0;
    let frame = 0;
    let raf: number;

    function getPoints(seed: number) {
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i < NUM_POINTS; i++) {
        const angle = (Math.PI * 2 * i) / NUM_POINTS;
        const nVal = noise3D(
          Math.cos(angle) * NOISE_SCALE + seed,
          Math.sin(angle) * NOISE_SCALE + seed,
          t,
        );
        const r = baseRadius + nVal * baseRadius * 0.45;
        pts.push({
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
        });
      }
      return pts;
    }

    function splinePath(pts: { x: number; y: number }[]) {
      const n = pts.length;
      let d = "";
      for (let i = 0; i < n; i++) {
        const p0 = pts[(i - 1 + n) % n];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % n];
        const p3 = pts[(i + 2) % n];
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        if (i === 0) d += `M${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
        d += `C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
      }
      return d + "Z";
    }

    function tick() {
      raf = requestAnimationFrame(tick);
      frame++;
      if (frame % 2 !== 0) return;

      t += NOISE_SPEED;
      if (pathRef.current) {
        pathRef.current.setAttribute("d", splinePath(getPoints(0)));
      }
      if (path2Ref.current) {
        path2Ref.current.setAttribute("d", splinePath(getPoints(100)));
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [width, height]);

  const staticD = buildStaticPath(width, height);
  const chromId = `chr-${uid}`;
  const grad1Id = `g1-${uid}`;
  const grad2Id = `g2-${uid}`;

  return (
    <svg
      aria-hidden="true"
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <defs>
        {/* Chromatic aberration: split R/G/B, offset, recombine */}
        <filter id={chromId} x="-20%" y="-20%" width="140%" height="140%">
          {/* Red */}
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
          />
          <feOffset dx="5" dy="-3" />
          <feGaussianBlur stdDeviation="3" result="r" />
          {/* Green */}
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
          />
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="1.5" result="g" />
          {/* Blue */}
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
          />
          <feOffset dx="-5" dy="3" />
          <feGaussianBlur stdDeviation="3" result="b" />
          {/* Merge */}
          <feBlend in="r" in2="g" mode="screen" result="rg" />
          <feBlend in="rg" in2="b" mode="screen" />
        </filter>

        {/* Primary blob gradient: visible purples and warm tones */}
        <radialGradient id={grad1Id} cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#a070d0" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#6040a0" stopOpacity="0.4" />
          <stop offset="75%" stopColor="#302060" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#100818" stopOpacity="0" />
        </radialGradient>

        {/* Secondary blob gradient: cooler teal/blue shift */}
        <radialGradient id={grad2Id} cx="55%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#5090c0" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#305080" stopOpacity="0.3" />
          <stop offset="75%" stopColor="#182840" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#080c18" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Primary blob */}
      <g filter={`url(#${chromId})`}>
        <path
          ref={pathRef}
          d={staticD}
          fill={`url(#${grad1Id})`}
          style={{ willChange: "d" }}
        />
      </g>

      {/* Secondary blob for depth, offset noise seed */}
      <g filter={`url(#${chromId})`} opacity="0.7">
        <path
          ref={path2Ref}
          d={staticD}
          fill={`url(#${grad2Id})`}
          style={{ willChange: "d" }}
        />
      </g>
    </svg>
  );
}

function buildStaticPath(w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.34;
  const offsets = [1, 0.85, 1.1, 0.9, 1.05, 0.88];
  const pts = offsets.map((o, i) => {
    const angle = (Math.PI * 2 * i) / NUM_POINTS;
    return { x: cx + Math.cos(angle) * r * o, y: cy + Math.sin(angle) * r * o };
  });
  const n = pts.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    if (i === 0) d += `M${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    d += `C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d + "Z";
}
