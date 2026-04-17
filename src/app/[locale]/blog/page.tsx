import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Rivo",
};

export default async function BlogIndex() {
  const t = await getTranslations("blog");
  return (
    <>
      <MarketingHeader />
      <main className="mkt-container pt-32 pb-20 lg:pt-40 lg:pb-28">
        <header className="mb-14">
          <p className="mkt-label mb-4">{t("indexTitle")}</p>
          <h1 className="mkt-title-section text-3xl md:text-4xl">
            {t("indexTitle")}
          </h1>
          <p
            className="mkt-body mt-4 max-w-[520px]"
          >
            {t("indexDesc")}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex min-h-[260px] flex-col justify-between rounded-lg p-8 no-underline lg:min-h-[340px] lg:p-10 lg:pb-8"
              style={{
                background: post.gradient ?? post.bg ?? "var(--mkt-bg-panel)",
                color: post.gradient || post.bg ? "#1a1a2e" : "var(--mkt-text-primary)",
              }}
            >
              <div>
                <p
                  className="text-[1.25rem] lg:text-[1.5rem]"
                  style={{
                    fontWeight: 510,
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  {t(post.titleKey)}
                </p>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    opacity: 0.7,
                    lineHeight: 1.6,
                    margin: "12px 0 0",
                  }}
                >
                  {t(post.descKey)}
                </p>
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  opacity: 0.7,
                  marginTop: 24,
                }}
              >
                {post.category} &middot; {post.readTime}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
