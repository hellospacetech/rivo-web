import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "../scroll-reveal";

/**
 * <ValueProposition>, single big-text statement.
 */
export async function ValueProposition() {
  const t = await getTranslations("value");
  return (
    <section className="mkt-container pb-16" aria-labelledby="vp-heading">
      <ScrollReveal>
        <h2 id="vp-heading" className="sr-only">
          {t("valuePropBold")}
        </h2>
        <p
          className="text-[2rem] font-[450] leading-[1.1] tracking-[-0.022em] md:text-[2.5rem] lg:text-[3rem]"
          style={{ color: "var(--mkt-text-tertiary)" }}
        >
          <strong
            className="font-[450]"
            style={{ color: "var(--mkt-text-secondary)" }}
          >
            {t("valuePropBold")}
          </strong>{" "}
          {t("valuePropBody")}
        </p>
      </ScrollReveal>
    </section>
  );
}
