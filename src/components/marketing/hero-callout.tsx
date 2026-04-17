import { cn } from "@/lib/cn";

/**
 * <HeroCallout>, a small "isolated component" floating UI card.
 *
 * Inspired by the designerup.co "Isolated Component" hero pattern: pull
 * key UI elements out of the product screen and let them float as
 * standalone units in the hero. Visually they look like fragments
 * extracted from the app, enlarged and isolated to call out a feature.
 *
 * Boost rules:
 *   - Zero shadows (depth comes from the panel border + bg)
 *   - 1px translucent borders
 *   - --mkt-* tokens
 *   - Inter, weights 510 only
 *
 * Used in HeroSection: positioned absolutely around the phone with the
 * `style` prop set by the parent.
 */

interface HeroCalloutProps {
  /** Inline SVG icon, sized 16x16 by the parent. */
  icon: React.ReactNode;
  /** Small uppercase mono label, e.g. "AUDIO BRIEF". */
  label: string;
  /** Bigger callout text, the actual feature value. */
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function HeroCallout({
  icon,
  label,
  text,
  className,
  style,
}: HeroCalloutProps) {
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      style={{
        padding: "11px 14px 11px 11px",
        borderRadius: 12,
        background: "rgba(15, 16, 17, 0.85)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px) saturate(140%)",
        WebkitBackdropFilter: "blur(12px) saturate(140%)",
        ...style,
      }}
    >
      <div
        className="flex shrink-0 items-center justify-center"
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.07)",
          color: "var(--mkt-text-secondary)",
        }}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span
          style={{
            fontSize: 9,
            fontWeight: 510,
            color: "var(--mkt-text-quaternary)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 3,
            lineHeight: 1,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 12.5,
            fontWeight: 510,
            color: "var(--mkt-text-secondary)",
            letterSpacing: "-0.005em",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
