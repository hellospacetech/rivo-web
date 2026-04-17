import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Everything Rivo does to replace your morning news routine with one calm listen.",
  openGraph: {
    title: "Features - Rivo",
    description:
      "Everything Rivo does to replace your morning news routine with one calm listen.",
  },
  alternates: {
    canonical: "https://hellorivo.com/features",
    languages: {
      "x-default": "https://hellorivo.com/features",
      en: "https://hellorivo.com/features",
      tr: "https://hellorivo.com/tr/features",
    },
  },
};

export default async function FeaturesPage() {
  const t = await getTranslations("features");

  return (
    <>
      <MarketingHeader />
      <main>
        {/* Page header */}
        <div className="mkt-container pt-32 pb-20 lg:pt-40 lg:pb-28">
          <p className="mkt-label mb-4">{t("title")}</p>
          <h1 className="mkt-title-section max-w-[640px] text-[2rem] md:text-[2.5rem] lg:text-[3rem]">
            {t("subtitle")}
          </h1>
        </div>

        {/* Feature list */}
        <div className="mkt-container flex flex-col">
          <FeatureRow
            label={t("briefLabel")}
            title={t("briefTitle")}
            desc={t("briefDesc")}
            details={[t("briefH1Desc"), t("briefH2Desc"), t("briefH3Desc")]}
          />
          <FeatureRow
            label={t("profilesLabel")}
            title={t("profilesTitle")}
            desc={t("profilesDesc")}
            profiles={[
              { name: t("guardianName"), desc: t("guardianDesc"), color: "#7099C4" },
              { name: t("builderName"), desc: t("builderDesc"), color: "#C9B97F" },
              { name: t("pioneerName"), desc: t("pioneerDesc"), color: "#D4725A" },
            ]}
          />
          <FeatureRow
            label={t("chatLabel")}
            title={t("chatTitle")}
            desc={t("chatDesc")}
            details={[t("chatH1Desc"), t("chatH2Desc"), t("chatH3Desc")]}
          />
          <FeatureRow
            label={t("inboxLabel")}
            title={t("inboxTitle")}
            desc={t("inboxDesc")}
            details={[t("inboxH1Desc"), t("inboxH2Desc")]}
          />
          <FeatureRow
            label={t("sourcesLabel")}
            title={t("sourcesTitle")}
            desc={t("sourcesDesc")}
          />
        </div>

        {/* Bottom CTA */}
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

/* ─── Feature row ────────────────────────────────────────────────── */

function FeatureRow({
  label,
  title,
  desc,
  details,
  profiles,
}: {
  label: string;
  title: string;
  desc: string;
  details?: string[];
  profiles?: { name: string; desc: string; color: string }[];
}) {
  return (
    <section
      className="grid grid-cols-1 gap-6 border-t py-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-16"
      style={{ borderColor: "var(--mkt-border-subtle)" }}
    >
      {/* Left: label + title */}
      <div>
        <p className="mkt-label mb-3">{label}</p>
        <h2
          className="text-[1.375rem] font-[450] leading-[1.2] tracking-[-0.02em] md:text-[1.625rem]"
          style={{ color: "var(--mkt-text-primary)" }}
        >
          {title}
        </h2>
      </div>

      {/* Right: description + details */}
      <div>
        <p className="mkt-body mb-0">{desc}</p>

        {details && details.length > 0 && (
          <ul className="mt-6 flex flex-col gap-3">
            {details.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[0.875rem]"
                style={{ color: "var(--mkt-text-secondary)", lineHeight: 1.55 }}
              >
                <span
                  className="mt-[7px] block h-[5px] w-[5px] shrink-0 rounded-full"
                  style={{ background: "var(--mkt-text-quaternary)" }}
                />
                {d}
              </li>
            ))}
          </ul>
        )}

        {profiles && (
          <div className="mt-6 flex flex-col gap-3">
            {profiles.map((p) => (
              <div
                key={p.name}
                className="flex items-start gap-3 text-[0.875rem]"
                style={{ lineHeight: 1.55 }}
              >
                <span
                  className="mt-[7px] block h-[5px] w-[5px] shrink-0 rounded-full"
                  style={{ background: p.color }}
                />
                <span>
                  <span style={{ color: p.color, fontWeight: 510 }}>
                    {p.name}
                  </span>
                  <span style={{ color: "var(--mkt-text-tertiary)" }}>
                    {" "}{p.desc}
                  </span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
