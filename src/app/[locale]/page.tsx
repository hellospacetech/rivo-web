import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { HeroSection } from "@/components/marketing/sections/hero-section";
import { LogosMarquee } from "@/components/marketing/sections/logos-marquee";
import { ValueProposition } from "@/components/marketing/sections/value-proposition";
import { BenefitCards } from "@/components/marketing/sections/benefit-cards";
import { BlogCardsSection } from "@/components/marketing/sections/blog-cards-section";
import { CtaSection } from "@/components/marketing/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";

const SOFTWARE_APP_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rivo",
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS, Android",
  description:
    "AI-powered market audio briefs tailored to your risk profile.",
  url: "https://hellorivo.com",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  installUrl: "https://apps.apple.com/app/rivo",
  screenshot: "https://hellorivo.com/screenshots/today-brief.png",
};

export default function Home() {
  return (
    <>
      <JsonLd data={SOFTWARE_APP_JSONLD} />
      <MarketingHeader />
      <main>
        <HeroSection />
        <LogosMarquee />
        <BenefitCards />
        <ValueProposition />
        <BlogCardsSection />
        <CtaSection />
      </main>
      <MarketingFooter />
    </>
  );
}
