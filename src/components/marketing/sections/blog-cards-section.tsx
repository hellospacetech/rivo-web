import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "../scroll-reveal";

/**
 * <BlogCardsSection>, 2 gradient editorial cards.
 */

function ArrowIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M7 7h10v10"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 17L17 7"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export async function BlogCardsSection() {
  const t = await getTranslations("blog");
  return (
    <section
      className="mkt-container pt-16 pb-20 lg:pt-20 lg:pb-24"
      aria-labelledby="blog-heading"
    >
      <h2 id="blog-heading" className="sr-only">
        {t("blogHeading")}
      </h2>

      <ScrollReveal>
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] lg:gap-8">
          {/* Primary card */}
          <a
            href="/blog/risk-profiles/how-to-pick-yours"
            className="flex min-h-[220px] flex-col justify-between rounded-lg p-8 no-underline lg:min-h-[380px] lg:p-10 lg:pb-8"
            style={{
              background: "linear-gradient(180deg, #b2d5ff 0%, #dfd1ff 100%)",
              color: "#1a1a2e",
            }}
          >
            <div>
              <p
                className="text-[1.25rem] lg:text-[1.5rem]"
                style={{
                  fontWeight: 510,
                  lineHeight: 1.4,
                  color: "#1a1a2e",
                  margin: 0,
                }}
              >
                {t("card1Title")}
              </p>
              <p
                style={{
                  fontSize: "0.9375rem",
                  opacity: 0.7,
                  marginTop: 12,
                  lineHeight: 1.6,
                  margin: "12px 0 0",
                }}
              >
                {t("card1Desc")}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: "0.875rem",
                  opacity: 0.7,
                  marginTop: 24,
                }}
              >
                {t("card1Meta")}
              </div>
              <ArrowIcon />
            </div>
          </a>

          {/* Secondary card */}
          <a
            href="/blog/markets/reading-fed-signals"
            className="flex min-h-[220px] flex-col justify-between rounded-lg p-8 no-underline lg:min-h-[380px] lg:p-10 lg:pb-8"
            style={{
              background: "#e4f222",
              color: "#1a1a2e",
            }}
          >
            <div>
              <p
                className="text-[1.25rem] lg:text-[1.5rem]"
                style={{
                  fontWeight: 510,
                  lineHeight: 1.4,
                  color: "#1a1a2e",
                  margin: 0,
                }}
              >
                {t("card2Title")}
              </p>
              <p
                style={{
                  fontSize: "0.9375rem",
                  opacity: 0.7,
                  marginTop: 12,
                  lineHeight: 1.6,
                  margin: "12px 0 0",
                }}
              >
                {t("card2Desc")}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: "0.875rem",
                  opacity: 0.7,
                  marginTop: 24,
                }}
              >
                {t("card2Meta")}
              </div>
              <ArrowIcon />
            </div>
          </a>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div
          style={{
            fontSize: "0.9375rem",
            color: "var(--mkt-text-tertiary)",
          }}
        >
          <p style={{ margin: 0 }}>
            {t.rich("moreContent", {
              highlight: (chunks) => (
                <strong
                  style={{
                    color: "var(--mkt-text-primary)",
                    fontWeight: 510,
                  }}
                >
                  {chunks}
                </strong>
              ),
            })}
          </p>
          <a
            href="/blog"
            className="inline-flex min-h-[44px] items-center no-underline transition-colors duration-150 hover:text-[var(--mkt-text-primary)]"
            style={{
              color: "var(--mkt-text-tertiary)",
              marginTop: 8,
            }}
          >
            {t("viewAll")} &rarr;
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
