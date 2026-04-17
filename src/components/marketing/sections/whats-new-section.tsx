import { ScrollReveal } from "../scroll-reveal";

/**
 * <WhatsNewSection>, 4-card horizontal release timeline.
 *
 * Lifted 1:1 from boost-your-app/components/marketing/sections/
 * whats-new-section.tsx. First entry highlighted via dot + accent
 * gradient line.
 */

function TimelineDot({ active }: { active?: boolean }) {
  if (active) {
    return (
      <div
        className="drop-shadow-[0_0_6px_rgba(208,214,224,0.4)]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#d0d6e0",
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#3e3e44",
        border: "1px solid #4e4e54",
      }}
    />
  );
}

const ENTRIES = [
  {
    title: "Audio briefs",
    description:
      "Press play on your morning. Your calm brief, read out loud in plain language, ready over coffee or the commute. Eyes free, jargon free.",
  },
  {
    title: "Guardian, Builder, Pioneer",
    description:
      "One brief, three risk lenses. Switch between the Guardian (discipline), Builder (consistency), and Pioneer (conviction) personas. The whole brief rewrites itself for your strength.",
  },
  {
    title: "Smart Alerts v2",
    description:
      "Cross-source rule engine with rate-cap detection. Get alerted only when the news actually moves the tape.",
  },
  {
    title: "AI summaries, Turkish",
    description:
      "Native Turkish summaries with currency, sector, and risk tagging. Geist Mono ticker pills throughout.",
  },
];

export function WhatsNewSection() {
  return (
    <section
      className="mkt-container pt-16 pb-12 lg:pt-20 lg:pb-16"
      aria-labelledby="whatsnew-heading"
    >
      <ScrollReveal>
        <h2
          id="whatsnew-heading"
          className="mkt-title-section mb-10 text-[2rem] lg:mb-16 lg:text-[3rem]"
        >
          What&apos;s new
        </h2>

        {/* Timeline bar with dots, desktop only */}
        <div className="relative hidden lg:block">
          <div className="relative mb-8 flex items-center">
            <div
              className="absolute left-0 right-0 top-1/2"
              style={{ height: 1, background: "#23252a" }}
            />
            <div className="relative z-[1] grid w-full grid-cols-4">
              <div>
                <TimelineDot active />
              </div>
              <div>
                <TimelineDot />
              </div>
              <div>
                <TimelineDot />
              </div>
              <div>
                <TimelineDot />
              </div>
            </div>
          </div>
          {/* Accent gradient from first dot */}
          <div
            className="absolute left-0 top-1 w-1/4"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, #d0d6e0, rgba(208,214,224,0.05))",
              borderRadius: 1,
            }}
          />
        </div>

        {/* 4-column content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-12">
          {ENTRIES.map((entry, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 510,
                  color: "var(--mkt-text-secondary)",
                  marginBottom: 8,
                }}
              >
                {entry.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--mkt-text-tertiary)",
                  lineHeight: 1.6,
                }}
              >
                {entry.description}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
