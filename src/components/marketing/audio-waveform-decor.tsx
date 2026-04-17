/**
 * <AudioWaveformDecor>, a subtle decorative background waveform.
 *
 * Used in the hero behind the phone to whisper "audio" as a brand
 * motif. Very low opacity (0.06) so it never competes with the phone
 * or copy. Asymmetric bar heights so it reads as a real spoken-word
 * waveform rather than a flat equalizer.
 *
 * Boost rules: cool monochrome, no chroma, aria-hidden, respects
 * reduced motion (no animation).
 */

const BARS = [
  { x: 0, h: 22 },
  { x: 14, h: 46 },
  { x: 28, h: 30 },
  { x: 42, h: 64 },
  { x: 56, h: 26 },
  { x: 70, h: 88 },
  { x: 84, h: 50 },
  { x: 98, h: 110 },
  { x: 112, h: 72 },
  { x: 126, h: 92 },
  { x: 140, h: 38 },
  { x: 154, h: 64 },
  { x: 168, h: 24 },
  { x: 182, h: 78 },
  { x: 196, h: 32 },
  { x: 210, h: 18 },
];

interface AudioWaveformDecorProps {
  className?: string;
  width?: number;
  height?: number;
}

export function AudioWaveformDecor({
  className,
  width = 220,
  height = 130,
}: AudioWaveformDecorProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 220 130"
      fill="none"
    >
      {BARS.map(({ x, h }, i) => (
        <rect
          key={i}
          x={x}
          y={(130 - h) / 2}
          width={5}
          height={h}
          rx={2}
          fill="var(--mkt-text-primary)"
          opacity={0.06}
        />
      ))}
    </svg>
  );
}
