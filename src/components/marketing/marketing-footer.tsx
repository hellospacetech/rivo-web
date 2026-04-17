import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

/**
 * <MarketingFooter>, boost-system 5-column footer.
 */

type FooterColumn = {
  titleKey: string;
  links: { labelKey: string; href: string; external?: boolean }[];
};

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    titleKey: "product",
    links: [
      { labelKey: "features", href: "/features" },
      { labelKey: "riskProfiles", href: "/profiles" },
      { labelKey: "blog", href: "/blog" },
    ],
  },
  {
    titleKey: "profiles",
    links: [
      { labelKey: "conservative", href: "/profiles" },
      { labelKey: "balanced", href: "/profiles" },
      { labelKey: "aggressive", href: "/profiles" },
    ],
  },
  {
    titleKey: "community",
    links: [
      { labelKey: "xTwitter", href: "https://x.com", external: true },
      { labelKey: "discord", href: "https://discord.com", external: true },
      { labelKey: "youtube", href: "https://youtube.com", external: true },
    ],
  },
];

const LEGAL_KEYS = ["privacy", "terms", "cookies"] as const;
const LEGAL_HREFS = ["/privacy", "/terms", "/cookies"] as const;

export async function MarketingFooter() {
  const t = await getTranslations("footer");
  return (
    <footer style={{ borderTop: "1px solid var(--mkt-border-subtle)" }}>
      <div className="mx-auto max-w-[1436px] px-6 pt-10 pb-6 md:px-10 lg:px-[77px] lg:pt-14 lg:pb-6">
        {/* Grid: logo + 5 link columns */}
        <div className="mb-20 flex max-lg:grid max-lg:grid-cols-3 max-lg:gap-y-10 max-md:grid-cols-2 max-[480px]:grid-cols-1">
          {/* Logo column */}
          <div className="w-[200px] shrink-0 pt-px max-lg:col-span-full max-lg:mb-4 max-lg:w-auto">
            <Link
              href="/"
              aria-label="Rivo home"
              className="inline-flex h-11 items-center"
            >
              <Image
                src="/rivo-logo.png"
                alt="Rivo"
                width={32}
                height={32}
                className="rounded-[8px]"
              />
            </Link>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.titleKey} className="flex-1">
              <div className="mkt-footer-col-title">
                {t(column.titleKey)}
              </div>
              <div className="flex flex-col gap-1">
                {column.links.map((link) => (
                  <Link
                    key={link.labelKey}
                    href={link.href}
                    className="mkt-footer-link"
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legal row + maker mark */}
        <div className="flex flex-col gap-4 pl-0 sm:flex-row sm:items-center sm:justify-between lg:pl-[200px]">
          <div className="flex gap-5">
            {LEGAL_KEYS.map((key, i) => (
              <Link
                key={key}
                href={LEGAL_HREFS[i]}
                className="mkt-footer-legal"
              >
                {t(key)}
              </Link>
            ))}
          </div>
          <span
            className="mkt-footer-legal"
            style={{ color: "var(--mkt-text-quaternary)" }}
          >
            {t("copyright", { year: new Date().getFullYear() })}
          </span>
        </div>
      </div>
    </footer>
  );
}
