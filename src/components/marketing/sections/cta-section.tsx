import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "../scroll-reveal";

/**
 * <CtaSection>, final closing CTA. Always last on every page.
 */
export async function CtaSection() {
  const t = await getTranslations("cta");
  return (
    <section
      className="mkt-container py-24 text-center lg:pt-32 lg:pb-24"
      aria-labelledby="cta-heading"
    >
      <ScrollReveal>
        <h2
          id="cta-heading"
          className="mkt-title-cta mb-12 !text-[2rem] md:!text-[2.5rem] lg:!text-[3.5rem] xl:!text-[4.5rem]"
        >
          <span className="block">{t("ctaLine1")}</span>
          <span className="mt-6 block text-[1.5rem] md:text-[1.875rem] lg:mt-10 lg:text-[2.5rem] xl:text-[3rem]">
            {t("ctaLine2")}
          </span>
        </h2>
        <div className="flex w-full flex-col items-center justify-center gap-2 md:w-auto md:flex-row">
          <Link
            href="/signup"
            className="inline-flex w-full items-center justify-center no-underline md:w-auto"
            style={{
              height: 48,
              padding: "0 20px",
              fontSize: "0.9375rem",
              fontWeight: 400,
              color: "var(--mkt-bg-primary)",
              background: "#e6e6e6",
              border: "1px solid #e6e6e6",
              borderRadius: 4,
            }}
          >
            {t("primaryBtn")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center no-underline md:w-auto"
            style={{
              height: 48,
              padding: "0 20px",
              fontSize: "0.9375rem",
              fontWeight: 400,
              color: "var(--mkt-text-primary)",
              background: "var(--mkt-bg-hover-strong)",
              border: "1px solid var(--mkt-border-strong)",
              borderRadius: 4,
            }}
          >
            {t("secondaryBtn")}
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
