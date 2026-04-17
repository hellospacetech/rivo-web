import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { i18n } from "@/i18n.config";
import { JsonLd } from "@/components/seo/json-ld";
import { getAlternates } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export async function generateStaticParams() {
  try {
    const locales = await i18n.getLocales();
    return locales.map((locale) => ({ locale }));
  } catch {
    return [{ locale: "en" }];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL("https://hellorivo.com"),
    title: {
      default: "Rivo - Exit the Chaos | AI-Powered Market Audio Briefs",
      template: "%s | Rivo",
    },
    description:
      "Rivo aggregates market news, analyzes it with AI, and delivers personalized audio briefs based on your risk profile. Available on iOS and Android.",
    keywords: [
      "market news",
      "AI analysis",
      "audio briefs",
      "risk profile",
      "investing app",
      "stock market",
      "financial news",
    ],
    authors: [{ name: "Rivo" }],
    creator: "Rivo",
    publisher: "Rivo",
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: "https://hellorivo.com",
      siteName: "Rivo",
      title: "Rivo - Exit the Chaos",
      description:
        "AI-powered market audio briefs tailored to your risk profile.",
      images: [
        {
          url: "/og/default.png",
          width: 1200,
          height: 630,
          alt: "Rivo - Exit the Chaos",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rivo - Exit the Chaos",
      description:
        "AI-powered market audio briefs tailored to your risk profile.",
      images: ["/og/default.png"],
    },
    alternates: getAlternates("/"),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const ORG_WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://hellorivo.com/#organization",
      name: "Rivo",
      url: "https://hellorivo.com",
      logo: {
        "@type": "ImageObject",
        url: "https://hellorivo.com/rivo-logo.png",
        width: 512,
        height: 512,
      },
      sameAs: ["https://apps.apple.com/app/rivo"],
    },
    {
      "@type": "WebSite",
      "@id": "https://hellorivo.com/#website",
      url: "https://hellorivo.com",
      name: "Rivo",
      publisher: { "@id": "https://hellorivo.com/#organization" },
      inLanguage: ["en", "tr"],
    },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${geistMono.variable} h-full`}
    >
      <body className="marketing-dark min-h-full">
        <JsonLd data={ORG_WEBSITE_JSONLD} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
