/**
 * <LogosMarquee>, news source logo marquee.
 *
 * Uses .mkt-logos-track keyframe (35s linear, infinite, pauses on hover)
 * with mask-image fade on both edges.
 *
 * Brand names rendered as styled text wordmarks using the page font (Inter).
 * Displayed at reduced opacity, brightening on hover.
 */

const SOURCES = [
  { name: "Bloomberg", weight: 700, tracking: "-0.02em", size: "1.25rem" },
  { name: "Reuters", weight: 700, tracking: "-0.01em", size: "1.125rem" },
  { name: "Financial Times", weight: 400, tracking: "0em", size: "1rem", italic: true },
  { name: "The Wall Street Journal", weight: 400, tracking: "0em", size: "0.75rem", uppercase: true },
  { name: "CNBC", weight: 700, tracking: "0.02em", size: "1.125rem" },
  { name: "Anadolu Ajans\u0131", weight: 600, tracking: "0em", size: "0.875rem" },
  { name: "AFP", weight: 700, tracking: "0.04em", size: "1.125rem" },
  { name: "BBC", weight: 700, tracking: "0.08em", size: "1.125rem" },
  { name: "Dow Jones", weight: 700, tracking: "0.02em", size: "1.0625rem" },
  { name: "Investing.com", weight: 600, tracking: "-0.01em", size: "1rem" },
  { name: "S&P Global", weight: 600, tracking: "0em", size: "1rem" },
  { name: "MarketWatch", weight: 700, tracking: "-0.01em", size: "0.9375rem" },
] as const;

function SourceItem({
  source,
  hidden,
}: {
  source: (typeof SOURCES)[number];
  hidden?: boolean;
}) {
  return (
    <span
      className="flex shrink-0 items-center opacity-[0.45] transition-opacity duration-200 hover:opacity-90"
      style={{
        fontSize: source.size,
        fontWeight: source.weight,
        letterSpacing: source.tracking,
        color: "var(--mkt-text-primary)",
        fontStyle: "italic" in source && source.italic ? "italic" : "normal",
        textTransform:
          "uppercase" in source && source.uppercase ? "uppercase" : "none",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
      {...(hidden ? { "aria-hidden": true } : {})}
    >
      {source.name}
    </span>
  );
}

export function LogosMarquee() {
  return (
    <section
      className="mkt-container overflow-hidden py-12 lg:py-20"
      aria-label="Source coverage"
    >
      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
          overflow: "hidden",
        }}
      >
        <div className="mkt-logos-track gap-10 lg:gap-14">
          {[0, 1, 2, 3].map((set) =>
            SOURCES.map((source) => (
              <SourceItem
                key={`${set}-${source.name}`}
                source={source}
                hidden={set > 0}
              />
            )),
          )}
        </div>
      </div>
    </section>
  );
}
