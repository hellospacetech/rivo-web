"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ScrollReveal } from "../scroll-reveal";

/**
 * <FeatureSection>, tabbed feature showcase with side-by-side layout.
 *
 * Each tab is a self-contained feature story: headline, body, highlights
 * on the left, phone screenshot on the right. Fills the panel with real
 * content instead of floating a phone in empty space.
 *
 * Supports `reversed` prop for zigzag layout across sections.
 *
 * Normal (lg+):                        Reversed (lg+):
 *   ┌─────────────────────────────┐      ┌─────────────────────────────┐
 *   │ Copy          ┌────────┐   │      │ ┌────────┐          Copy   │
 *   │               │ Phone  │   │      │ │ Phone  │                 │
 *   │ ✓ Highlights  │        │   │      │ │        │  ✓ Highlights  │
 *   │               └────────┘   │      │ └────────┘                 │
 *   └─────────────────────────────┘      └─────────────────────────────┘
 *
 * Mobile stays stacked vertically regardless of `reversed`.
 */

export interface FeatureTab {
  id: string;
  num: string;
  label: string;
  headline: string;
  body: string;
  highlights: string[];
  screenshot: { src: string; alt: string };
}

interface FeatureSectionProps {
  title: ReactNode;
  description: string;
  tabs: FeatureTab[];
  /** Flip the panel layout: phone on the left, copy on the right. */
  reversed?: boolean;
}

export function FeatureSection({
  title,
  description,
  tabs,
  reversed = false,
}: FeatureSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  const current = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  return (
    <section className="mkt-container pt-16 pb-20 lg:pt-20 lg:pb-24">
      <ScrollReveal>
        {/* Two-column header */}
        <div className="mb-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[55%_1fr] lg:gap-12">
          <h2 className="mkt-title-section pr-0 text-[2rem] md:text-[2.5rem] lg:pr-8 lg:text-[3rem]">
            {title}
          </h2>
          <p className="mkt-body pt-0 lg:pt-2">{description}</p>
        </div>

        {/* Numbered sub-nav */}
        <div
          className="mb-5 flex flex-wrap items-center gap-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                aria-label={tab.label}
                className="relative flex cursor-pointer items-center gap-2.5 whitespace-nowrap border-none font-[inherit]"
                style={{
                  fontSize: "0.8125rem",
                  color: isActive
                    ? "var(--mkt-text-primary)"
                    : "var(--mkt-text-tertiary)",
                  fontWeight: isActive ? 510 : 400,
                  padding: "10px 16px",
                  minHeight: 44,
                  transition: "all 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
                  background: isActive
                    ? "rgba(255,255,255,0.04)"
                    : "transparent",
                  borderRadius: "6px 6px 0 0",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: isActive
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,0.03)",
                    color: isActive
                      ? "var(--mkt-text-secondary)"
                      : "var(--mkt-text-quaternary)",
                    transition: "all 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 510,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {tab.num}
                  </span>
                </span>
                <span className="hidden sm:inline">{tab.label}</span>
                {isActive && (
                  <span
                    className="absolute left-3 right-3"
                    style={{
                      bottom: -1,
                      height: 1,
                      background: "var(--mkt-text-primary)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Desktop panel ─────────────────────────────────────── */}
        <div className="hidden lg:block">
          <div className="mkt-panel-outer">
            <div className="mkt-panel-inner relative">
              <div className="mkt-grain" />
              <div
                className="pointer-events-none absolute left-2 top-2"
                style={{
                  width: 300,
                  height: 300,
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 60%)",
                  zIndex: 1,
                }}
              />

              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  role="tabpanel"
                  className="relative"
                  style={{
                    display: activeTab === tab.id ? "block" : "none",
                    zIndex: 2,
                  }}
                >
                  <div
                    className={`flex items-stretch justify-between gap-12 px-10 py-12 xl:gap-16 xl:px-14 xl:py-14 ${
                      reversed ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Copy */}
                    <div className="flex max-w-[420px] flex-1 flex-col justify-center">
                      <h3
                        className="mb-3 text-[1.5rem] font-[510] leading-[1.2] xl:text-[1.75rem]"
                        style={{
                          color: "var(--mkt-text-primary)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {tab.headline}
                      </h3>
                      <p
                        className="mkt-body mb-8"
                        style={{ lineHeight: 1.65 }}
                      >
                        {tab.body}
                      </p>
                      <ul className="flex flex-col gap-3.5">
                        {tab.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-3 text-[0.875rem]"
                            style={{
                              color: "var(--mkt-text-secondary)",
                              lineHeight: 1.5,
                            }}
                          >
                            <CheckIcon />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Phone */}
                    <div className="shrink-0">
                      <PhoneColumn src={tab.screenshot.src} alt={tab.screenshot.alt} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile panel ──────────────────────────────────────── */}
        <div
          className="overflow-hidden rounded-xl lg:hidden"
          style={{
            border: "1px solid var(--mkt-border-translucent)",
            background: "var(--mkt-bg-panel)",
          }}
        >
          {tabs.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              style={{
                display: activeTab === tab.id ? "block" : "none",
              }}
            >
              <div className="flex flex-col items-center px-5 py-8">
                {/* Copy */}
                <div className="mb-6 w-full">
                  <h3
                    className="mb-2 text-[1.25rem] font-[510] leading-[1.2]"
                    style={{
                      color: "var(--mkt-text-primary)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {tab.headline}
                  </h3>
                  <p className="mkt-body max-w-[360px]">{tab.body}</p>
                </div>

                {/* Phone */}
                <div className="relative mb-6">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      width: 360,
                      height: 360,
                      borderRadius: 360,
                      background:
                        "radial-gradient(50% 50%, rgba(255,255,255,0.04) 0%, transparent 75%)",
                    }}
                  />
                  <div className="relative overflow-hidden rounded-[24px]" style={{ width: 240, border: "1px solid var(--mkt-border-translucent)" }}>
                    <Image
                      src={tab.screenshot.src}
                      alt={tab.screenshot.alt}
                      width={240}
                      height={520}
                      sizes="240px"
                      style={{ objectFit: "cover", display: "block", width: "100%", height: "auto" }}
                    />
                  </div>
                </div>

                {/* Highlights */}
                <ul className="flex w-full flex-col gap-3">
                  {tab.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-[0.8125rem]"
                      style={{
                        color: "var(--mkt-text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      <CheckIcon />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ─── Phone column (reused for normal & reversed layouts) ──────────── */

function PhoneColumn({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: 480,
          height: 480,
          borderRadius: 480,
          background:
            "radial-gradient(50% 50%, rgba(255,255,255,0.04) 0%, transparent 75%)",
        }}
      />
      <div className="relative overflow-hidden rounded-[32px]" style={{ width: 300, border: "1px solid var(--mkt-border-translucent)" }}>
        <Image
          src={src}
          alt={alt}
          width={300}
          height={650}
          sizes="300px"
          style={{ objectFit: "cover", display: "block", width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}

/* ─── Inline check icon for highlights ─────────────────────────────── */

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <path
        d="M5 8.2l2 2 4-4.4"
        stroke="var(--mkt-text-secondary)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
