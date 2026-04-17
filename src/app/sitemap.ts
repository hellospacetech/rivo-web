import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";

const BASE_URL = "https://hellorivo.com";
const LOCALES = ["en", "tr"];
const STATIC_PAGES = ["", "/features", "/profiles", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [
            l,
            `${BASE_URL}${l === "en" ? "" : `/${l}`}${page}`,
          ]),
        ),
      },
    });
  }

  for (const post of BLOG_POSTS) {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [
            l,
            `${BASE_URL}${l === "en" ? "" : `/${l}`}/blog/${post.slug}`,
          ]),
        ),
      },
    });
  }

  for (const page of ["/privacy", "/terms", "/cookies"]) {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    });
  }

  return entries;
}
