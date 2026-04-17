import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";

const CDN_MANIFEST =
  "https://cdn.better-i18n.com/hellospace/rivo-web/manifest.json";

async function getLocalesFromCDN(): Promise<string[]> {
  try {
    const res = await fetch(CDN_MANIFEST, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (Array.isArray(data.languages) && data.languages.length > 0) {
      return data.languages.map((l: { code: string }) => l.code);
    }
  } catch {
    // CDN unreachable
  }
  return ["en"];
}

let cachedLocales: string[] | null = null;

export default async function middleware(
  request: Parameters<ReturnType<typeof createMiddleware>>[0],
) {
  if (!cachedLocales) {
    cachedLocales = await getLocalesFromCDN();
  }

  const routing = defineRouting({
    locales: cachedLocales,
    defaultLocale: "en",
    localePrefix: "as-needed",
  });

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: ["/", "/((?!api|_next|.*\\..*).*)"],
};
