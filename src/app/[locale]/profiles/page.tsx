import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Risk Profiles | Rivo",
  description:
    "Same market day, three different briefs. Pick the lens that matches how you invest.",
};

const PROFILES = [
  { nameKey: "guardianName", labelKey: "guardianLabel", taglineKey: "guardianTagline", powerKey: "guardianPower", descKey: "guardianDesc", journeyKeys: ["guardianJ1", "guardianJ2", "guardianJ3"], color: "#7099C4" },
  { nameKey: "builderName", labelKey: "builderLabel", taglineKey: "builderTagline", powerKey: "builderPower", descKey: "builderDesc", journeyKeys: ["builderJ1", "builderJ2", "builderJ3"], color: "#C9B97F" },
  { nameKey: "pioneerName", labelKey: "pioneerLabel", taglineKey: "pioneerTagline", powerKey: "pioneerPower", descKey: "pioneerDesc", journeyKeys: ["pioneerJ1", "pioneerJ2", "pioneerJ3"], color: "#D4725A" },
] as const;

export default async function ProfilesPage() {
  const t = await getTranslations("profiles");

  return (
    <>
      <MarketingHeader />
      <main>
        {/* Header */}
        <div className="mkt-container pt-32 pb-20 lg:pt-40 lg:pb-28">
          <p className="mkt-label mb-4">{t("title")}</p>
          <h1 className="mkt-title-section max-w-[640px] text-[2rem] md:text-[2.5rem] lg:text-[3rem]">
            {t("subtitle")}
          </h1>
        </div>

        {/* Three profiles */}
        <div className="mkt-container flex flex-col">
          {PROFILES.map((p) => (
            <section
              key={p.nameKey}
              className="grid grid-cols-1 gap-8 border-t py-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-16"
              style={{ borderColor: "var(--mkt-border-subtle)" }}
            >
              {/* Left */}
              <div>
                <div className="mb-3 flex items-center gap-2.5">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: p.color }}
                  />
                  <span className="mkt-label" style={{ color: p.color }}>
                    {t(p.labelKey)}
                  </span>
                </div>
                <h2
                  className="mb-2 text-[1.375rem] font-[450] leading-[1.2] tracking-[-0.02em] md:text-[1.625rem]"
                  style={{ color: "var(--mkt-text-primary)" }}
                >
                  {t(p.nameKey)}
                </h2>
                <p
                  className="text-[0.9375rem]"
                  style={{ color: "var(--mkt-text-tertiary)" }}
                >
                  {t(p.taglineKey)}
                </p>
              </div>

              {/* Right */}
              <div>
                <p className="mkt-body mb-0">{t(p.descKey)}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {p.journeyKeys.map((jk) => (
                    <li
                      key={jk}
                      className="flex items-start gap-3 text-[0.875rem]"
                      style={{ color: "var(--mkt-text-secondary)", lineHeight: 1.55 }}
                    >
                      <span
                        className="mt-[7px] block h-[5px] w-[5px] shrink-0 rounded-full"
                        style={{ background: p.color }}
                      />
                      {t(jk)}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        {/* How it works */}
        <div className="mkt-container flex flex-col">
          <section
            className="grid grid-cols-1 gap-8 border-t py-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-16"
            style={{ borderColor: "var(--mkt-border-subtle)" }}
          >
            <div>
              <p className="mkt-label mb-3">{t("howLabel")}</p>
              <h2
                className="text-[1.375rem] font-[450] leading-[1.2] tracking-[-0.02em] md:text-[1.625rem]"
                style={{ color: "var(--mkt-text-primary)" }}
              >
                {t("howTitle")}
              </h2>
            </div>
            <div>
              <p className="mkt-body mb-6">{t("howDesc")}</p>
              <div className="flex flex-col gap-5">
                {([
                  { key: "howGuardian", power: "guardianPower", color: "#7099C4" },
                  { key: "howBuilder", power: "builderPower", color: "#C9B97F" },
                  { key: "howPioneer", power: "pioneerPower", color: "#D4725A" },
                ] as const).map((item) => (
                  <div key={item.key} className="flex items-start gap-3 text-[0.875rem]" style={{ lineHeight: 1.6 }}>
                    <span
                      className="mt-[7px] block h-[5px] w-[5px] shrink-0 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span>
                      <span style={{ color: item.color, fontWeight: 510 }}>{t(item.power)}</span>
                      <span style={{ color: "var(--mkt-text-tertiary)" }}> {t(item.key)}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quiz + Switch */}
          <section
            className="grid grid-cols-1 gap-8 border-t py-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-16"
            style={{ borderColor: "var(--mkt-border-subtle)" }}
          >
            <div>
              <p className="mkt-label mb-3">{t("quizLabel")}</p>
              <h2
                className="text-[1.375rem] font-[450] leading-[1.2] tracking-[-0.02em] md:text-[1.625rem]"
                style={{ color: "var(--mkt-text-primary)" }}
              >
                {t("quizTitle")}
              </h2>
            </div>
            <p className="mkt-body">{t("quizDesc")}</p>
          </section>

          <section
            className="grid grid-cols-1 gap-8 border-t py-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-16"
            style={{ borderColor: "var(--mkt-border-subtle)" }}
          >
            <div>
              <p className="mkt-label mb-3">{t("switchLabel")}</p>
              <h2
                className="text-[1.375rem] font-[450] leading-[1.2] tracking-[-0.02em] md:text-[1.625rem]"
                style={{ color: "var(--mkt-text-primary)" }}
              >
                {t("switchTitle")}
              </h2>
            </div>
            <p className="mkt-body">{t("switchDesc")}</p>
          </section>
        </div>

        {/* CTA */}
        <div className="mkt-container py-20 text-center lg:py-28">
          <Link
            href="/signup"
            className="mkt-btn-invert no-underline"
            style={{ height: 48, padding: "0 20px", fontSize: "0.9375rem" }}
          >
            Start free
          </Link>
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
