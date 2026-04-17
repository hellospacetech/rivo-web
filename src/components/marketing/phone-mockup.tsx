import { cn } from "@/lib/cn";

/**
 * <PhoneMockup>, pixel-precise iPhone 15 Pro mockup.
 *
 * Uses real iPhone 15 Pro proportions (393pt screen width).
 * Two aspect modes calculated from actual pixel dimensions:
 *   - "video"      → 1180×2556 → screen 393×851 → viewBox 405×863
 *   - "screenshot"  → 1179×2376 → screen 393×792 → viewBox 405×804
 *
 * SVG outer shell adapts height per mode. Screen cutout is always
 * at x=6 y=6 with the calculated height. Content div matches exactly.
 */

interface PhoneMockupProps {
  width?: number;
  /** "video" for screen recordings, "screenshot" for app screenshots */
  aspect?: "video" | "screenshot";
  className?: string;
  children: React.ReactNode;
}

const W = 405;
const PAD = 6;
const SCR_W = 393;
const SCR_RX = 39;
const OUTER_RX = 55;

const PRESETS = {
  video: { scrH: 851, vbH: 863 },
  screenshot: { scrH: 792, vbH: 804 },
} as const;

function shellPath(h: number) {
  const r = OUTER_RX;
  return `M0 ${r}A${r} ${r} 0 0 1 ${r} 0h${W - r * 2}a${r} ${r} 0 0 1 ${r} ${r}v${h - r * 2}a${r} ${r} 0 0 1-${r} ${r}H${r}A${r} ${r} 0 0 1 0 ${h - r}z`;
}

function screenPath(scrH: number) {
  const r = SCR_RX;
  const x = PAD;
  const y = PAD;
  const w = SCR_W;
  const h = scrH;
  return `M${x + r} ${y}h${w - r * 2}a${r} ${r} 0 0 1 ${r} ${r}v${h - r * 2}a${r} ${r} 0 0 1-${r} ${r}H${x + r}a${r} ${r} 0 0 1-${r}-${r}V${y + r}a${r} ${r} 0 0 1 ${r}-${r}z`;
}

export function PhoneMockup({
  width = 320,
  aspect = "video",
  className,
  children,
}: PhoneMockupProps) {
  const { scrH, vbH } = PRESETS[aspect];
  const s = width / W;

  const shell = shellPath(vbH);
  const screen = screenPath(scrH);

  return (
    <div className={cn("relative inline-block", className)} style={{ width }}>
      {/* Screen content */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: PAD * s,
          top: PAD * s,
          width: SCR_W * s,
          height: scrH * s,
          borderRadius: SCR_RX * s,
          background: "#000",
          zIndex: 0,
        }}
      >
        <div className="relative h-full w-full">
          {children}
        </div>
      </div>

      {/* SVG frame */}
      <svg
        aria-hidden="true"
        className="relative block"
        viewBox={`0 0 ${W} ${vbH}`}
        fill="none"
        style={{ width: "100%", height: "auto", zIndex: 1 }}
      >
        <path d={shell + " " + screen} fillRule="evenodd" fill="#1a1a1d" />
        <path d={shell} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" />

        {/* Side buttons */}
        <rect x="-1" y={Math.round(vbH * 0.19)} width="2.5" height="24" rx="1.25" fill="#2a2a2e" />
        <rect x="-1" y={Math.round(vbH * 0.26)} width="2.5" height="46" rx="1.25" fill="#2a2a2e" />
        <rect x="-1" y={Math.round(vbH * 0.33)} width="2.5" height="46" rx="1.25" fill="#2a2a2e" />
        <rect x={W - 1.5} y={Math.round(vbH * 0.27)} width="2.5" height="62" rx="1.25" fill="#2a2a2e" />
      </svg>
    </div>
  );
}
