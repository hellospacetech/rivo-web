/**
 * Demo panels for FeatureSection x3.
 *
 * Each panel is a self-contained dashboard view that fills the
 * mkt-panel-content area (min-h-480 desktop / 280 mobile) with
 * Rivo-relevant content. Same visual rules as boost demo panels:
 *   - 0.5px borders for internal dividers
 *   - mkt-text-* color hierarchy
 *   - 9-12px mono labels with 0.04em tracking
 *   - 10-13px secondary data values
 *   - mkt-hover-row on interactive lists
 *
 * Three panels, each parameterized by a `view` prop to swap content.
 */

/* ─── Shared atoms ─────────────────────────────────────────────── */

function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 510,
        color: "var(--mkt-text-quaternary)",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}
    >
      {children}
    </span>
  );
}

function Dot({ tone = "secondary" }: { tone?: "primary" | "secondary" | "tertiary" | "quaternary" }) {
  const color = `var(--mkt-text-${tone})`;
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: color,
      }}
    />
  );
}

/* ───────────────────────────────────────────────────────────────
   Panel 1, Risk Profile Brief
   View: 'conservative' | 'balanced' | 'aggressive'
   ─────────────────────────────────────────────────────────────── */

type ProfileView = "conservative" | "balanced" | "aggressive";

const PROFILE_DATA: Record<
  ProfileView,
  {
    persona: string;
    profile: string;
    strength: string;
    mood: string;
    headline: string;
    summary: string;
    action: string;
    impact: string;
    sources: number;
    tilts: { label: string; value: string; change: string }[];
    items: { type: string; title: string; meta: string }[];
  }
> = {
  conservative: {
    persona: "Guardian",
    profile: "Conservative",
    strength: "Discipline",
    mood: "Calm",
    headline: "Patience pays. Quality yield leads the tape.",
    summary:
      "Gold and dividend names firm up on Fed dovishness. Treasuries supportive, no reason to chase the move.",
    action: "Hold your positions. Today is not a day to act.",
    impact: "+2.1%",
    sources: 23,
    tilts: [
      { label: "Gold", value: "2,450", change: "+1.4%" },
      { label: "Treasuries", value: "10Y −6bp", change: "supportive" },
      { label: "Dividend ETF", value: "+0.8%", change: "outperforming" },
    ],
    items: [
      { type: "Macro", title: "Gold breaks 2,450 dollars per ounce", meta: "FT · 28 min" },
      { type: "Rates", title: "10Y US treasury yield falls 6 basis points", meta: "Reuters · 41 min" },
      { type: "Equities", title: "BIST dividend index closes 0.8 percent up", meta: "AA · 1 hr" },
      { type: "Macro", title: "Dollar index weakens against safe havens", meta: "Bloomberg · 2 hr" },
    ],
  },
  balanced: {
    persona: "Builder",
    profile: "Balanced",
    strength: "Consistency",
    mood: "Constructive",
    headline: "Consistency compounds. Growth and duration both hold.",
    summary:
      "Fed dovish signal lifts equities and treasuries together. Your 60/40 baseline is working exactly as designed.",
    action: "Review tech weighting. It drifted overweight this week.",
    impact: "+4.8%",
    sources: 23,
    tilts: [
      { label: "S&P 500", value: "+1.24%", change: "outperforming" },
      { label: "Dollar", value: "−0.82%", change: "weakening" },
      { label: "10Y yield", value: "−6 bp", change: "supportive" },
    ],
    items: [
      { type: "High impact", title: "Fed signals 50bp rate cut for September", meta: "Reuters · 2 min" },
      { type: "Earnings", title: "Nvidia beats Q3 expectations by 12 percent", meta: "Bloomberg · 14 min" },
      { type: "Equities", title: "S&P 500 closes higher on rate-cut optimism", meta: "BBG · 28 min" },
      { type: "FX", title: "Dollar index falls below 102 support", meta: "FT · 34 min" },
    ],
  },
  aggressive: {
    persona: "Pioneer",
    profile: "Aggressive",
    strength: "Conviction",
    mood: "Risk-on",
    headline: "Conviction rewarded. Risk-on regime confirmed.",
    summary:
      "Semis lead the tape and JPY weakness opens a carry window. The setup you've been waiting for is here.",
    action: "Watch NVDA into the open. Size within your risk budget.",
    impact: "+8.2%",
    sources: 23,
    tilts: [
      { label: "Nvidia", value: "+8.0%", change: "AHT" },
      { label: "SOXX", value: "+3.4%", change: "leading" },
      { label: "USD/JPY", value: "150.2", change: "+0.9%" },
    ],
    items: [
      { type: "Earnings", title: "Nvidia beats Q3 by 12 percent, shares +8% AHT", meta: "Bloomberg · 14 min" },
      { type: "Sector", title: "Semiconductor index leads the tape", meta: "CNBC · 21 min" },
      { type: "FX", title: "USD/JPY breaks 150 resistance level", meta: "FT · 31 min" },
      { type: "High impact", title: "Fed signals 50bp rate cut for September", meta: "Reuters · 2 min" },
    ],
  },
};

export function ProfilePanel({ view }: { view: ProfileView }) {
  const data = PROFILE_DATA[view];

  return (
    <div className="relative min-h-[480px] grid grid-cols-1 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div
        className="hidden lg:flex lg:flex-col"
        style={{
          padding: "24px 20px",
          borderRight: "0.5px solid rgba(255,255,255,0.06)",
          gap: 18,
        }}
      >
        <div>
          <MonoLabel>Persona</MonoLabel>
          <div
            style={{
              fontSize: 20,
              fontWeight: 590,
              color: "var(--mkt-text-primary)",
              letterSpacing: "-0.012em",
              marginTop: 4,
            }}
          >
            {data.persona}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--mkt-text-tertiary)",
              marginTop: 3,
            }}
          >
            {data.profile} · Strength: {data.strength}
          </div>
        </div>

        <div>
          <MonoLabel>Today&apos;s impact</MonoLabel>
          <div
            style={{
              fontSize: 28,
              fontWeight: 590,
              color: "var(--mkt-text-primary)",
              letterSpacing: "-0.02em",
              marginTop: 6,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {data.impact}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--mkt-text-tertiary)",
              marginTop: 2,
            }}
          >
            risk-adjusted
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

        <div>
          <MonoLabel>Tilts</MonoLabel>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 12 }}>
            {data.tilts.map((tilt) => (
              <div
                key={tilt.label}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 12, color: "var(--mkt-text-tertiary)" }}>
                  {tilt.label}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 510,
                    color: "var(--mkt-text-secondary)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {tilt.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 16 }}>
          <MonoLabel>Coverage</MonoLabel>
          <div
            style={{
              fontSize: 12,
              color: "var(--mkt-text-tertiary)",
              marginTop: 4,
            }}
          >
            {data.sources} sources scanned
          </div>
        </div>
      </div>

      {/* Right pane */}
      <div className="flex flex-col" style={{ padding: "24px 24px 16px" }}>
        {/* Header: Mood → Why → Action */}
        <div
          style={{
            paddingBottom: 16,
            marginBottom: 14,
            borderBottom: "0.5px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-2">
            <MonoLabel>Morning brief · 09 Apr</MonoLabel>
            <span
              aria-hidden="true"
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "var(--mkt-text-quaternary)",
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 510,
                color: "var(--mkt-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Mood: {data.mood}
            </span>
          </div>
          <div
            style={{
              fontSize: 19,
              fontWeight: 510,
              color: "var(--mkt-text-primary)",
              letterSpacing: "-0.012em",
              lineHeight: 1.3,
              marginTop: 10,
              maxWidth: "44ch",
            }}
          >
            {data.headline}
          </div>
          <div
            className="mkt-body"
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              marginTop: 8,
              maxWidth: "60ch",
            }}
          >
            <span style={{ color: "var(--mkt-text-quaternary)" }}>Why · </span>
            {data.summary}
          </div>
          <div
            style={{
              marginTop: 12,
              padding: "10px 12px",
              borderRadius: 6,
              background: "rgba(255,255,255,0.03)",
              border: "0.5px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 510,
                color: "var(--mkt-text-quaternary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 4,
              }}
            >
              For you · Action
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 510,
                color: "var(--mkt-text-secondary)",
                lineHeight: 1.45,
              }}
            >
              {data.action}
            </div>
          </div>
        </div>

        {/* Story list */}
        <div className="flex flex-col" style={{ gap: 2 }}>
          {data.items.map((item, i) => (
            <div
              key={item.title}
              className="mkt-hover-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
              }}
            >
              <Dot tone={i === 0 ? "secondary" : "tertiary"} />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 510,
                  color: "var(--mkt-text-quaternary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  width: 96,
                  flexShrink: 0,
                }}
              >
                {item.type}
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: "var(--mkt-text-secondary)",
                  fontWeight: 510,
                }}
              >
                {item.title}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "var(--mkt-text-quaternary)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {item.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────
   Panel 2, Daily Brief Views
   ─────────────────────────────────────────────────────────────── */

type BriefView = "headlines" | "impact" | "summaries";

const STORIES = [
  {
    title: "Fed signals 50bp rate cut on the table for September",
    source: "Reuters",
    time: "2m",
    impact: "+8.2",
    risk: "high",
    summary:
      "Why: Powell flagged inflation converging to target; 68% odds of a 50bp cut. Action for Builder: review duration. Don't chase equities until the statement lands next week.",
  },
  {
    title: "Nvidia beats Q3 expectations by 12 percent, shares +8% AHT",
    source: "Bloomberg",
    time: "14m",
    impact: "+7.1",
    risk: "mid",
    summary:
      "Why: Data center revenue +154% YoY, guidance upgraded, consensus EPS $4.20. Action. Pioneer: watch the open. Builder: this raises your tech weighting, rebalance on strength.",
  },
  {
    title: "Gold breaks 2,450 dollars per ounce as safe-haven demand surges",
    source: "FT",
    time: "28m",
    impact: "+5.3",
    risk: "low",
    summary:
      "Why: Central bank buying continues for the 9th month. Action for Guardian: you're already positioned, hold. Today is not a day to act.",
  },
  {
    title: "China manufacturing PMI slips to 48.3, contraction extends",
    source: "Bloomberg",
    time: "41m",
    impact: "−4.8",
    risk: "high",
    summary:
      "Why: Brent off 1.2% on the data, EM commodity exposure at risk. Action. Pioneer: trim commodity-linked names. Builder and Guardian: no change, this sits outside your lane.",
  },
  {
    title: "BIST 100 closes day 1.2 percent higher, banks lead",
    source: "AA",
    time: "1h",
    impact: "+2.4",
    risk: "mid",
    summary:
      "Why: Banking rally on local rate-cut expectations, volume 20% above 30-day average. Action for Builder: your Turkish bank allocation is compounding as expected. Hold.",
  },
];

export function BriefPanel({ view }: { view: BriefView }) {
  return (
    <div className="relative min-h-[480px] flex flex-col" style={{ padding: "24px 24px" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{
          paddingBottom: 14,
          marginBottom: 14,
          borderBottom: "0.5px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-center gap-2">
          <MonoLabel>Brief · 09 Apr · Builder</MonoLabel>
        </div>
        <div className="flex gap-1.5">
          {(
            [
              { id: "headlines", label: "Mood" },
              { id: "impact", label: "Why" },
              { id: "summaries", label: "Action" },
            ] as const
          ).map((t) => (
            <span
              key={t.id}
              style={{
                fontSize: 10,
                fontWeight: 510,
                padding: "3px 8px",
                borderRadius: 4,
                background:
                  t.id === view
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.02)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                color:
                  t.id === view
                    ? "var(--mkt-text-secondary)"
                    : "var(--mkt-text-quaternary)",
              }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Story list */}
      <div className="flex flex-col" style={{ gap: 2 }}>
        {STORIES.map((s, i) => {
          const positive = !s.impact.startsWith("−");
          return (
            <div
              key={s.title}
              className="mkt-hover-row"
              style={{ padding: "12px 14px" }}
            >
              <div className="flex items-center gap-3">
                <Dot tone={i === 0 ? "secondary" : "tertiary"} />
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 510,
                    color: "var(--mkt-text-quaternary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    width: 78,
                    flexShrink: 0,
                  }}
                >
                  {s.risk} risk
                </span>
                <span
                  style={{
                    flex: 1,
                    fontSize: 13,
                    fontWeight: 510,
                    color: "var(--mkt-text-secondary)",
                  }}
                >
                  {s.title}
                </span>
                {view === "impact" && (
                  <span
                    style={{
                      fontSize: 13,
                      fontVariantNumeric: "tabular-nums",
                      color: positive
                        ? "var(--mkt-text-secondary)"
                        : "var(--mkt-text-quaternary)",
                      width: 48,
                      textAlign: "right",
                    }}
                  >
                    {s.impact}
                  </span>
                )}
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--mkt-text-quaternary)",
                    width: 68,
                    textAlign: "right",
                  }}
                >
                  {s.source} · {s.time}
                </span>
              </div>
              {view === "summaries" && (
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--mkt-text-tertiary)",
                    lineHeight: 1.55,
                    margin: "8px 0 0 95px",
                    maxWidth: "70ch",
                  }}
                >
                  {s.summary}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────
   Panel 3, Stay Sharp (alerts / targets / watchlists)
   ─────────────────────────────────────────────────────────────── */

type SharpView = "alerts" | "targets" | "watchlists";

const ALERTS = [
  { type: "rule triggered", title: "Fed 50bp signal flagged high impact", time: "2m", channel: "push" },
  { type: "rule triggered", title: "Nvidia earnings beat matches risk profile", time: "14m", channel: "email" },
  { type: "snoozed", title: "Gold price target hit (2,450)", time: "28m", channel: "push" },
  { type: "rule armed", title: "BIST 100 below 10,200", time: "armed", channel: "push" },
];

const TARGETS = [
  { asset: "BIST 100", direction: "above", target: "10,500", current: "10,542", status: "hit" },
  { asset: "Gold", direction: "above", target: "2,450", current: "2,461", status: "hit" },
  { asset: "USD/TRY", direction: "below", target: "32.5", current: "32.84", status: "armed" },
  { asset: "Brent", direction: "below", target: "82.0", current: "83.5", status: "armed" },
];

const WATCHLISTS = [
  { name: "Akbank", ticker: "AKBNK", change: "+2.4%", positive: true },
  { name: "Turkish Airlines", ticker: "THYAO", change: "+1.1%", positive: true },
  { name: "Gold spot", ticker: "GOLD", change: "+0.6%", positive: true },
  { name: "Brent crude", ticker: "BRENT", change: "−1.2%", positive: false },
  { name: "Apple", ticker: "AAPL", change: "+0.9%", positive: true },
  { name: "Nvidia", ticker: "NVDA", change: "+8.0%", positive: true },
];

export function SharpPanel({ view }: { view: SharpView }) {
  return (
    <div className="relative min-h-[480px] grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <div
        className="hidden lg:flex lg:flex-col"
        style={{
          padding: "24px 20px",
          borderRight: "0.5px solid rgba(255,255,255,0.06)",
          gap: 16,
        }}
      >
        <MonoLabel>Active rules</MonoLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Smart Alerts", count: 12 },
            { label: "Price Targets", count: 4 },
            { label: "Watchlists", count: 3 },
          ].map((r) => (
            <div
              key={r.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 12, color: "var(--mkt-text-tertiary)" }}>
                {r.label}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 590,
                  color: "var(--mkt-text-secondary)",
                  background: "rgba(255,255,255,0.06)",
                  padding: "1px 6px",
                  borderRadius: 4,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {r.count}
              </span>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
        <MonoLabel>Channels</MonoLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {["push", "email", "slack"].map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: "var(--mkt-text-tertiary)",
                textTransform: "capitalize",
              }}
            >
              <Dot tone="quaternary" />
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Right area, content swap by view */}
      <div className="flex flex-col" style={{ padding: "24px 24px" }}>
        <div
          className="flex items-center justify-between"
          style={{
            paddingBottom: 14,
            marginBottom: 14,
            borderBottom: "0.5px solid rgba(255,255,255,0.05)",
          }}
        >
          <MonoLabel>
            {view === "alerts"
              ? "Recent alerts"
              : view === "targets"
                ? "Price targets"
                : "Portfolio watchlist"}
          </MonoLabel>
          <span style={{ fontSize: 11, color: "var(--mkt-text-tertiary)" }}>
            {view === "alerts" ? "12 today" : view === "targets" ? "4 active" : "6 assets"}
          </span>
        </div>

        {view === "alerts" && (
          <div className="flex flex-col" style={{ gap: 2 }}>
            {ALERTS.map((a, i) => (
              <div key={a.title} className="mkt-hover-row" style={{ padding: "10px 12px" }}>
                <div className="flex items-center gap-3">
                  <Dot tone={i === 0 ? "secondary" : "tertiary"} />
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 510,
                      color: "var(--mkt-text-quaternary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      width: 110,
                      flexShrink: 0,
                    }}
                  >
                    {a.type}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 13,
                      color: "var(--mkt-text-secondary)",
                      fontWeight: 510,
                    }}
                  >
                    {a.title}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "var(--mkt-text-quaternary)",
                      width: 50,
                      textAlign: "right",
                      textTransform: "capitalize",
                    }}
                  >
                    {a.channel}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "var(--mkt-text-quaternary)",
                      width: 36,
                      textAlign: "right",
                    }}
                  >
                    {a.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "targets" && (
          <div className="flex flex-col" style={{ gap: 2 }}>
            {TARGETS.map((t) => (
              <div key={t.asset} className="mkt-hover-row" style={{ padding: "10px 12px" }}>
                <div className="flex items-center gap-3">
                  <Dot tone={t.status === "hit" ? "secondary" : "quaternary"} />
                  <span
                    style={{
                      fontSize: 13,
                      color: "var(--mkt-text-secondary)",
                      fontWeight: 510,
                      width: 110,
                    }}
                  >
                    {t.asset}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "var(--mkt-text-quaternary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      width: 60,
                    }}
                  >
                    {t.direction}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--mkt-text-tertiary)",
                      fontVariantNumeric: "tabular-nums",
                      width: 80,
                    }}
                  >
                    {t.target}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 12,
                      color: "var(--mkt-text-secondary)",
                      fontVariantNumeric: "tabular-nums",
                      textAlign: "right",
                    }}
                  >
                    {t.current}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 510,
                      color:
                        t.status === "hit"
                          ? "var(--mkt-text-secondary)"
                          : "var(--mkt-text-quaternary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      width: 50,
                      textAlign: "right",
                    }}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "watchlists" && (
          <div className="flex flex-col" style={{ gap: 2 }}>
            {WATCHLISTS.map((w) => (
              <div key={w.ticker} className="mkt-hover-row" style={{ padding: "10px 12px" }}>
                <div className="flex items-center gap-3">
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 590,
                      color: "var(--mkt-text-secondary)",
                      width: 60,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {w.ticker}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 13,
                      color: "var(--mkt-text-tertiary)",
                    }}
                  >
                    {w.name}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: w.positive
                        ? "var(--mkt-text-secondary)"
                        : "var(--mkt-text-quaternary)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {w.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
