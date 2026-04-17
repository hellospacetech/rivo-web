import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug.join("/"));
  if (!post) return {};
  const t = await getTranslations("blog");
  return {
    title: `${t(post.titleKey)} | Rivo`,
    description: t(post.descKey),
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug.join("/"));
  if (!post) notFound();

  const t = await getTranslations("blog");

  return (
    <>
      <MarketingHeader />
      <main className="mkt-container pt-32 pb-20 lg:pt-40 lg:pb-28">
        <article className="mx-auto max-w-[720px]">
          <header className="mb-12">
            <Link
              href="/blog"
              className="mkt-label mb-6 inline-flex items-center gap-1.5 no-underline transition-colors hover:text-[var(--mkt-text-secondary)]"
            >
              &larr; {t("indexTitle")}
            </Link>
            <h1 className="mkt-title-section text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem]">
              {t(post.titleKey)}
            </h1>
            <p
              className="mt-4 text-sm"
              style={{ color: "var(--mkt-text-quaternary)" }}
            >
              {post.category} &middot; {post.readTime} &middot; {post.date}
            </p>
          </header>

          <div className="flex flex-col gap-10">
            {/* Intro */}
            <p className="legal-body" style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}>
              {t(post.contentKeys[0])}
            </p>

            {/* Sections (pairs of title + body) */}
            {Array.from({ length: (post.contentKeys.length - 2) / 2 }).map((_, i) => {
              const titleIdx = 1 + i * 2;
              const bodyIdx = 2 + i * 2;
              return (
                <section key={i}>
                  <h2
                    className="mb-4 text-lg font-[510]"
                    style={{ color: "var(--mkt-text-primary)" }}
                  >
                    {t(post.contentKeys[titleIdx])}
                  </h2>
                  <p className="legal-body" style={{ lineHeight: 1.75 }}>
                    {t(post.contentKeys[bodyIdx])}
                  </p>
                </section>
              );
            })}

            {/* Conclusion */}
            <p
              className="legal-body"
              style={{
                lineHeight: 1.75,
                color: "var(--mkt-text-secondary)",
                fontWeight: 450,
              }}
            >
              {t(post.contentKeys[post.contentKeys.length - 1])}
            </p>
          </div>
        </article>
      </main>
      <MarketingFooter />
    </>
  );
}
