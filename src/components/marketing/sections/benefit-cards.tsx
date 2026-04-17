"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "../scroll-reveal";

/**
 * <BenefitCards>, 3 capability pillars with isometric SVG illustrations.
 *
 * Structurally lifted from boost-your-app/components/marketing/sections/
 * benefit-cards.tsx. Boost uses 3 elaborate isometric scenes; Rivo uses
 * simpler isometric platforms following the same construction rules:
 *   - 30° isometric projection
 *   - fill #08090a (page bg) for surfaces
 *   - stroke #3e3e44 (dark) and #d0d6e0 (accent details), strokeWidth 0.5
 *   - mkt-iso-float per layer (5s / 4.5s / 4s, staggered)
 *   - dashed connectors (strokeDasharray "3 4")
 *   - aria-hidden, prefers-reduced-motion respected via global CSS
 */

const BENEFIT_CARDS = [
  { fig: "Fig. 01", titleKey: "card1Title" as const, descKey: "card1Desc" as const, Illustration: AggregateSvg },
  { fig: "Fig. 02", titleKey: "card2Title" as const, descKey: "card2Desc" as const, Illustration: AnalyzeSvg },
  { fig: "Fig. 03", titleKey: "card3Title" as const, descKey: "card3Desc" as const, Illustration: DeliverSvg },
];

export function BenefitCards() {
  const t = useTranslations("benefits");
  return (
    <section className="mkt-container" aria-label={t("capabilitiesLabel")}>
      <ScrollReveal>
        <div className="grid grid-cols-1 gap-0 py-12 lg:grid-cols-3">
          {BENEFIT_CARDS.map((card, i) => (
            <div
              key={card.fig}
              className={`group flex cursor-default flex-col px-0 py-6 transition-opacity duration-200 lg:px-8 lg:py-0 ${
                i < BENEFIT_CARDS.length - 1
                  ? "border-b border-[var(--mkt-border-translucent)] lg:border-b-0 lg:border-r"
                  : ""
              } ${i === 0 ? "pt-0 lg:pl-0" : ""} ${
                i === BENEFIT_CARDS.length - 1 ? "lg:pr-0" : ""
              }`}
            >
              {/* Figure label */}
              <div className="mkt-label" style={{ opacity: 0.6 }}>
                {card.fig}
              </div>

              {/* Illustration */}
              <div className="grid min-h-[220px] flex-1 place-items-center py-6 lg:min-h-[320px]">
                <div
                  className="w-full transition-all duration-300"
                  style={{
                    maxWidth: 340,
                    transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                >
                  <div className="transition-all duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:[filter:brightness(1.3)] group-hover:[transform:translateY(-4px)]">
                    <card.Illustration />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div
                className="mb-2.5 font-[510] transition-colors duration-200"
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--mkt-text-secondary)",
                }}
              >
                <span className="group-hover:text-[var(--mkt-text-primary)]">
                  {t(card.titleKey)}
                </span>
              </div>

              {/* Description */}
              <p
                className="mkt-body"
                style={{ textWrap: "balance", lineHeight: 1.65 }}
              >
                {t(card.descKey)}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ─── Illustration 1: Stacked sources funneling in ────────────────── */

function AggregateSvg() {
  return (
    <svg
      viewBox="0 0 265 262"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top layer: incoming sources (5 small platforms) */}
      <g
        className="mkt-iso-float"
        style={{ animationDuration: "4.5s", animationDelay: "-1.5s" }}
      >
        {[
          { cx: 60, cy: 70 },
          { cx: 110, cy: 50 },
          { cx: 160, cy: 50 },
          { cx: 205, cy: 70 },
          { cx: 132, cy: 30 },
        ].map((p, i) => (
          <g key={i}>
            <path
              d={`M${p.cx} ${p.cy + 8} L${p.cx + 22} ${p.cy - 4} L${p.cx} ${p.cy - 16} L${p.cx - 22} ${p.cy - 4} Z`}
              fill="#08090a"
              stroke="#3e3e44"
              strokeWidth="0.5"
            />
            {/* Tiny accent dot in center */}
            <circle
              cx={p.cx}
              cy={p.cy - 4}
              r="1.2"
              fill="#d0d6e0"
              opacity="0.8"
            />
          </g>
        ))}
      </g>

      {/* Connector lines (dashed) from sources to hub */}
      <g stroke="#3e3e44" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.6">
        <line x1="60" y1="70" x2="132" y2="170" />
        <line x1="110" y1="50" x2="132" y2="170" />
        <line x1="160" y1="50" x2="132" y2="170" />
        <line x1="205" y1="70" x2="132" y2="170" />
        <line x1="132" y1="30" x2="132" y2="170" />
      </g>

      {/* Hub: large central platform */}
      <g className="mkt-iso-float" style={{ animationDuration: "5s" }}>
        <path
          d="M132 220 L220 170 L132 120 L44 170 Z"
          fill="#08090a"
          stroke="#3e3e44"
          strokeWidth="0.5"
        />
        <path
          d="M44 170 L44 185 L132 235 L132 220"
          fill="#08090a"
          stroke="#3e3e44"
          strokeWidth="0.5"
        />
        <path
          d="M132 220 L132 235 L220 185 L220 170"
          fill="#08090a"
          stroke="#3e3e44"
          strokeWidth="0.5"
        />
        {/* Top-face grid lines */}
        <line
          x1="66"
          y1="158"
          x2="154"
          y2="208"
          stroke="#3e3e44"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <line
          x1="88"
          y1="146"
          x2="176"
          y2="196"
          stroke="#3e3e44"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <line
          x1="110"
          y1="134"
          x2="198"
          y2="184"
          stroke="#3e3e44"
          strokeWidth="0.5"
          opacity="0.5"
        />
        {/* Center beacon */}
        <circle cx="132" cy="170" r="3" fill="#d0d6e0" opacity="0.9" />
      </g>
    </svg>
  );
}

/* ─── Illustration 2: AI processing, central node + radial nodes ── */

function AnalyzeSvg() {
  return (
    <svg
      viewBox="0 0 265 262"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Background grid (subtle) */}
      <g stroke="#3e3e44" strokeWidth="0.5" opacity="0.2">
        <line x1="40" y1="80" x2="225" y2="180" />
        <line x1="40" y1="180" x2="225" y2="80" />
        <line x1="132" y1="40" x2="132" y2="220" />
      </g>

      {/* Outer ring nodes */}
      <g className="mkt-iso-float" style={{ animationDuration: "4s" }}>
        {[
          { x: 60, y: 130 },
          { x: 95, y: 75 },
          { x: 170, y: 75 },
          { x: 205, y: 130 },
          { x: 170, y: 185 },
          { x: 95, y: 185 },
        ].map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#08090a"
            stroke="#3e3e44"
            strokeWidth="0.5"
          />
        ))}
      </g>

      {/* Connectors from outer to center (dashed) */}
      <g stroke="#3e3e44" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.7">
        <line x1="60" y1="130" x2="132" y2="130" />
        <line x1="95" y1="75" x2="132" y2="130" />
        <line x1="170" y1="75" x2="132" y2="130" />
        <line x1="205" y1="130" x2="132" y2="130" />
        <line x1="170" y1="185" x2="132" y2="130" />
        <line x1="95" y1="185" x2="132" y2="130" />
      </g>

      {/* Central platform */}
      <g className="mkt-iso-float" style={{ animationDuration: "5s" }}>
        <path
          d="M132 165 L185 130 L132 95 L79 130 Z"
          fill="#08090a"
          stroke="#d0d6e0"
          strokeWidth="0.5"
        />
        <path
          d="M79 130 L79 142 L132 177 L132 165"
          fill="#08090a"
          stroke="#3e3e44"
          strokeWidth="0.5"
        />
        <path
          d="M132 165 L132 177 L185 142 L185 130"
          fill="#08090a"
          stroke="#3e3e44"
          strokeWidth="0.5"
        />
        {/* Top-face cross-hatch */}
        <line
          x1="98"
          y1="121"
          x2="151"
          y2="156"
          stroke="#3e3e44"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <line
          x1="113"
          y1="113"
          x2="166"
          y2="148"
          stroke="#3e3e44"
          strokeWidth="0.5"
          opacity="0.5"
        />
        {/* Pulse dot */}
        <circle cx="132" cy="130" r="2.5" fill="#d0d6e0" />
      </g>
    </svg>
  );
}

/* ─── Illustration 3: Audio waveform reading the 08:00 brief ───────── */

function DeliverSvg() {
  // Waveform bars centered horizontally above the platform.
  // Heights asymmetric so the shape reads as a dynamic spoken-word waveform,
  // not a flat equalizer. Tallest bar slightly off-center.
  const bars = [
    { x: 60, h: 14, o: 0.3 },
    { x: 72, h: 30, o: 0.45 },
    { x: 84, h: 52, o: 0.6 },
    { x: 96, h: 38, o: 0.55 },
    { x: 108, h: 70, o: 0.75 },
    { x: 120, h: 88, o: 0.9 },
    { x: 132, h: 64, o: 0.78 },
    { x: 144, h: 96, o: 1.0 },
    { x: 156, h: 72, o: 0.85 },
    { x: 168, h: 44, o: 0.6 },
    { x: 180, h: 58, o: 0.7 },
    { x: 192, h: 24, o: 0.4 },
    { x: 204, h: 12, o: 0.28 },
  ];

  return (
    <svg
      viewBox="0 0 265 262"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Background platform (clock surface) */}
      <g className="mkt-iso-float" style={{ animationDuration: "5s" }}>
        <path
          d="M132 220 L220 170 L132 120 L44 170 Z"
          fill="#08090a"
          stroke="#3e3e44"
          strokeWidth="0.5"
        />
        <path
          d="M44 170 L44 185 L132 235 L132 220"
          fill="#08090a"
          stroke="#3e3e44"
          strokeWidth="0.5"
        />
        <path
          d="M132 220 L132 235 L220 185 L220 170"
          fill="#08090a"
          stroke="#3e3e44"
          strokeWidth="0.5"
        />
      </g>

      {/* Floating audio waveform */}
      <g
        className="mkt-iso-float"
        style={{ animationDuration: "4.5s", animationDelay: "-2s" }}
      >
        {bars.map((b, i) => (
          <rect
            key={i}
            x={b.x - 1.6}
            y={88 - b.h / 2}
            width={3.2}
            height={b.h}
            rx={1.2}
            fill="#d0d6e0"
            opacity={b.o}
          />
        ))}
        {/* Horizontal centerline ghost (subtle, gives the waveform an axis) */}
        <line
          x1="50"
          y1="88"
          x2="216"
          y2="88"
          stroke="#3e3e44"
          strokeWidth="0.5"
          opacity="0.35"
          strokeDasharray="2 4"
        />
      </g>

      {/* Connector, dashed line down to platform */}
      <line
        x1="132"
        y1="142"
        x2="132"
        y2="170"
        stroke="#3e3e44"
        strokeWidth="0.5"
        strokeDasharray="3 4"
        opacity="0.7"
      />

      {/* Time mark on top of platform */}
      <g>
        <text
          x="132"
          y="178"
          textAnchor="middle"
          fill="#d0d6e0"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fontWeight="510"
          letterSpacing="0.06em"
          opacity="0.8"
        >
          08:00
        </text>
      </g>
    </svg>
  );
}
