import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { i18n } from "@/i18n.config";

export async function generateStaticParams() {
  try {
    const locales = await i18n.getLocales();
    return locales.map((locale) => ({ locale }));
  } catch {
    return [{ locale: "en" }];
  }
}

export const metadata: Metadata = {
  metadataBase: new URL("https://hellorivo.com"),
  title: "Rivo: Exit the chaos",
  description:
    "Rivo aggregates market news, analyzes it with AI, and generates easy-to-understand reports for investors based on their risk profile.",
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
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
