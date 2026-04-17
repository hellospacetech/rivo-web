"use client";

import { useState } from "react";
import { useReducedMotion } from "../use-reduced-motion";

/**
 * <HeroFrame>, Daily Brief dashboard mockup that lives inside the
 * desktop hero. Structurally lifted 1:1 from
 * boost-your-app/components/marketing/sections/hero-frame.tsx.
 * Content is Rivo-specific (portfolio nav + market signals).
 */

/* ─── Sidebar nav items ──────────────────────────────────────────── */

interface NavItem {
  label: string;
  icon: React.ReactNode;
  section?: string;
  badge?: number;
}

function SidebarIcon({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#d0d6e0" : "#73767c"}
      strokeWidth="1.5"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Overview",
    icon: (
      <SidebarIcon>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </SidebarIcon>
    ),
  },
  {
    label: "Daily Brief",
    badge: 7,
    icon: (
      <SidebarIcon active>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </SidebarIcon>
    ),
  },
  {
    label: "Watchlists",
    section: "PORTFOLIO",
    icon: (
      <SidebarIcon>
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </SidebarIcon>
    ),
  },
  {
    label: "Price Targets",
    icon: (
      <SidebarIcon>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </SidebarIcon>
    ),
  },
  {
    label: "Smart Alerts",
    badge: 3,
    icon: (
      <SidebarIcon>
        <path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 004 0" />
      </SidebarIcon>
    ),
  },
  {
    label: "Risk Profiles",
    section: "ANALYSIS",
    icon: (
      <SidebarIcon>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </SidebarIcon>
    ),
  },
  {
    label: "Sectors",
    icon: (
      <SidebarIcon>
        <path d="M12 20V10M18 20V4M6 20v-4" />
      </SidebarIcon>
    ),
  },
  {
    label: "Sources",
    icon: (
      <SidebarIcon>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a14 14 0 010 18M12 3a14 14 0 000 18M3 12h18" />
      </SidebarIcon>
    ),
  },
  {
    label: "Reports",
    section: "ARCHIVE",
    icon: (
      <SidebarIcon>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
      </SidebarIcon>
    ),
  },
  {
    label: "Settings",
    icon: (
      <SidebarIcon>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9 1.65 1.65 0 004.27 7.18l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </SidebarIcon>
    ),
  },
];

/* ─── Sparkline ──────────────────────────────────────────────────── */

function Sparkline({
  points,
  color,
  id,
  width = 44,
  height = 18,
}: {
  points: number[];
  color: string;
  id: string;
  width?: number;
  height?: number;
}) {
  if (!points.length) return null;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1 || 1);
  const coords = points.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * height;
    return [x, y] as const;
  });
  const d = "M " + coords.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ");
  const fillD = `${d} L ${width} ${height} L 0 ${height} Z`;
  const gradientId = `${id}-grad`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill={`url(#${gradientId})`} />
      <path
        d={d}
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── KPI Stats ──────────────────────────────────────────────────── */

const SPARK_COLOR = "#8a8f98";

const STATS = [
  {
    label: "Signals today",
    value: "23",
    change: "+8",
    sparkData: [11, 14, 12, 17, 15, 19, 18, 21, 23],
    sparkId: "sf-signals",
  },
  {
    label: "High impact",
    value: "4",
    change: "+1",
    sparkData: [2, 3, 2, 3, 4, 3, 4, 3, 4],
    sparkId: "sf-impact",
  },
  {
    label: "Watchlist movers",
    value: "12",
    change: "+3",
    sparkData: [6, 5, 7, 8, 6, 9, 10, 11, 12],
    sparkId: "sf-movers",
  },
  {
    label: "Brief streak",
    value: "7d",
    change: "perfect",
    sparkData: [1, 2, 3, 4, 5, 6, 7, 7, 7],
    sparkId: "sf-streak",
  },
];

/* ─── Insight feed ───────────────────────────────────────────────── */

const DOT_SHADES = ["#d0d6e0", "#8a8f98", "#62666d", "#4a4d52"] as const;

interface InsightCard {
  type: string;
  timestamp: string;
  title: string;
  description: React.ReactNode;
  actions: { label: string; primary?: boolean }[];
  isNew?: boolean;
}

const INSIGHTS: InsightCard[] = [
  {
    type: "High impact",
    timestamp: "2m ago",
    title:
      "Fed signals 50bp rate cut on the table for September meeting",
    description: (
      <>
        Powell at Jackson Hole flagged inflation converging to target. Markets now price{" "}
        <span style={{ color: "#d0d6e0" }}>68% odds</span> of a 50bp cut, up from 25bp prior.
      </>
    ),
    actions: [
      { label: "Read full brief" },
      { label: "Add to watchlist \u2192", primary: true },
    ],
    isNew: true,
  },
  {
    type: "Earnings beat",
    timestamp: "14m ago",
    title:
      "Nvidia beats Q3 expectations by 12 percent, shares up 8 percent after-hours",
    description: (
      <>
        Data center revenue{" "}
        <span style={{ color: "#d0d6e0" }}>+154% YoY</span>. Forward guidance upgraded
        and analyst consensus now calls for $4.20 EPS vs prior $3.95.
      </>
    ),
    actions: [
      { label: "Compare with peers" },
      { label: "View full analysis \u2192", primary: true },
    ],
    isNew: true,
  },
  {
    type: "Macro shift",
    timestamp: "28m ago",
    title:
      "Gold breaks 2,450 dollars per ounce as safe-haven demand accelerates",
    description: (
      <>
        Central bank buying continues for{" "}
        <span style={{ color: "#d0d6e0" }}>9th consecutive month</span>. Conservative
        portfolios up 1.8 percent on the move.
      </>
    ),
    actions: [
      { label: "Track gold" },
      { label: "Open report \u2192", primary: true },
    ],
  },
  {
    type: "Risk alert",
    timestamp: "1h ago",
    title:
      "China manufacturing PMI slips to 48.3, contraction extends to second month",
    description:
      "Aggressive portfolios with EM exposure should monitor commodity-linked positions. Brent already off 1.2 percent.",
    actions: [
      { label: "Affected positions" },
      { label: "Hedge ideas \u2192", primary: true },
    ],
  },
];

/* ─── Filter button ──────────────────────────────────────────────── */

function FilterBtn({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 510,
        color: "#8a8f98",
        padding: "3px 8px",
        borderRadius: 4,
        background: "rgba(255,255,255,0.03)",
        border: "0.5px solid rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── HeroFrame ──────────────────────────────────────────────────── */

export function HeroFrame() {
  const [activeNav, setActiveNav] = useState("Daily Brief");
  const reduced = useReducedMotion();

  // Helper: when reduced motion is on (or when prerendering / screenshot
  // tooling can't wait for delays), render the end state immediately.
  const animStart = (delay: number, type: "stats" | "insight") =>
    reduced
      ? { opacity: 1, transform: "none" }
      : {
          opacity: 0,
          transform: type === "stats" ? "translateY(6px)" : "translateY(8px)",
          animation: `mkt-insight-slide-in 0.4s cubic-bezier(0.23,1,0.32,1) ${delay}s forwards`,
        };

  return (
    <div
      className="relative grid h-full grid-cols-1 p-2 lg:grid-cols-[220px_1fr]"
      style={{ zIndex: 2 }}
    >
      {/* ── SIDEBAR ── */}
      <div
        className="hidden flex-col overflow-hidden lg:flex"
        style={{
          background: "var(--mkt-bg-panel)",
          borderRadius: "7px 0 0 7px",
          padding: "12px 8px",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Portfolio selector */}
        <div
          className="flex items-center gap-2"
          style={{ padding: "4px 6px", marginBottom: 4 }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              background: "rgba(255,255,255,0.06)",
              border: "0.5px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 590,
              color: "#d0d6e0",
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 590,
              color: "#d0d6e0",
            }}
          >
            Selin · Balanced
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{ opacity: 0.4, marginLeft: "auto" }}
          >
            <path d="M3 5l3 3 3-3" stroke="#8a8f98" strokeWidth="1.2" />
          </svg>
        </div>

        <div style={{ height: 10 }} />

        {/* Nav items */}
        {NAV_ITEMS.map((item) => (
          <div key={item.label}>
            {item.section && (
              <>
                <div style={{ height: 8 }} />
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 510,
                    color: "#585a5c",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "8px 6px 4px",
                    userSelect: "none",
                  }}
                >
                  {item.section}
                </div>
              </>
            )}
            <div
              className="flex cursor-default items-center"
              style={{
                gap: 10,
                padding: "7px 8px",
                borderRadius: 6,
                fontSize: 12.5,
                fontWeight: 510,
                color: activeNav === item.label ? "#d0d6e0" : "#73767c",
                whiteSpace: "nowrap",
                background:
                  activeNav === item.label
                    ? "rgba(255,255,255,0.04)"
                    : undefined,
              }}
              onClick={() => setActiveNav(item.label)}
            >
              {item.icon}
              {item.label}
              {item.badge && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 9,
                    fontWeight: 590,
                    color: "#d0d6e0",
                    background: "rgba(255,255,255,0.08)",
                    padding: "1px 5px",
                    borderRadius: 4,
                    minWidth: 18,
                    textAlign: "center",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Plan usage meter */}
        <div
          style={{
            padding: "10px 8px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            marginTop: 8,
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: 6 }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 590,
                color: "#8a8f98",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Pro Plan
            </span>
            <span style={{ fontSize: 9, color: "#62666d" }}>148 / 200</span>
          </div>
          <div
            style={{
              height: 3,
              borderRadius: 2,
              background: "rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "74%",
                height: "100%",
                borderRadius: 2,
                background: "rgba(255,255,255,0.35)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          background: "#121314",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 7,
        }}
      >
        {/* Subtle inner glow */}
        <div
          className="pointer-events-none absolute left-0 top-0"
          style={{
            width: 300,
            height: 300,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
            zIndex: 0,
          }}
        />

        {/* Page header */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: "14px 20px",
            borderBottom: "0.5px solid rgba(255,255,255,0.05)",
            minHeight: 48,
          }}
        >
          <div className="flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d0d6e0"
              strokeWidth="1.5"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
            <span
              style={{
                fontSize: 14,
                fontWeight: 590,
                color: "#d0d6e0",
              }}
            >
              Daily Brief · 09 Apr
            </span>
            <span
              style={{
                fontSize: 10,
                color: "#d0d6e0",
                background: "rgba(255,255,255,0.06)",
                padding: "1px 6px",
                borderRadius: 9999,
                fontWeight: 510,
              }}
            >
              7 new
            </span>
          </div>
          <div className="flex gap-1.5">
            <FilterBtn>Balanced</FilterBtn>
            <FilterBtn>Last 24h</FilterBtn>
          </div>
        </div>

        {/* KPI Stats Row */}
        <div
          className="flex"
          style={{
            padding: "10px 20px",
            gap: 10,
            borderBottom: "0.5px solid rgba(255,255,255,0.05)",
            ...animStart(1.3, "stats"),
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex-1"
              style={{
                padding: "8px 10px",
                borderRadius: 6,
                border: "0.5px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 510,
                  color: "#62666d",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 4,
                }}
              >
                {stat.label}
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span
                    style={{
                      fontSize: 17,
                      fontWeight: 590,
                      color: "#d0d6e0",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 510,
                      color: "#8a8f98",
                      marginLeft: 5,
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <Sparkline
                  points={stat.sparkData}
                  color={SPARK_COLOR}
                  id={stat.sparkId}
                  width={44}
                  height={18}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Insights feed */}
        <div className="relative flex flex-1 overflow-hidden">
          <div
            className="flex flex-1 flex-col overflow-hidden"
            style={{ padding: "12px 20px", gap: 8 }}
          >
            {INSIGHTS.map((insight, i) => (
              <div
                key={insight.type}
                className={`relative${insight.isNew ? " overflow-visible" : ""}`}
                style={{
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: `0.5px solid rgba(255,255,255,${
                    i === 0
                      ? "0.08"
                      : i === 1
                        ? "0.06"
                        : i === 2
                          ? "0.05"
                          : "0.04"
                  })`,
                  background: "rgba(255,255,255,0.01)",
                  ...animStart(1.6 + i * 0.8, "insight"),
                }}
              >
                {/* Notification dot */}
                {insight.isNew && (
                  <span
                    className="absolute"
                    style={{
                      top: -1,
                      right: -1,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#d0d6e0",
                      animation: "mkt-notif-pulse 2.5s ease-in-out infinite",
                    }}
                  />
                )}

                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: DOT_SHADES[i],
                      }}
                    />
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 510,
                        color: "#8a8f98",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {insight.type}
                    </span>
                  </div>
                  <span style={{ fontSize: 10, color: "#62666d" }}>
                    {insight.timestamp}
                  </span>
                </div>

                {/* Title */}
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: 510,
                    color: "#d0d6e0",
                    margin: "7px 0 5px",
                    lineHeight: 1.4,
                  }}
                >
                  {insight.title}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontSize: 12,
                    color: "#8a8f98",
                    lineHeight: 1.55,
                  }}
                >
                  {insight.description}
                </div>

                {/* Actions */}
                <div className="flex gap-1.5" style={{ marginTop: 7 }}>
                  {insight.actions.map((action) => (
                    <div
                      key={action.label}
                      style={{
                        fontSize: 10,
                        fontWeight: 510,
                        color: action.primary ? "#d0d6e0" : "#8a8f98",
                        padding: "3px 8px",
                        borderRadius: 4,
                        border: "0.5px solid rgba(255,255,255,0.08)",
                        background: action.primary
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(255,255,255,0.02)",
                        cursor: "pointer",
                      }}
                    >
                      {action.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom fade */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0"
            style={{
              height: 60,
              background: "linear-gradient(180deg, transparent, #121314)",
              zIndex: 5,
            }}
          />
        </div>
      </div>
    </div>
  );
}
