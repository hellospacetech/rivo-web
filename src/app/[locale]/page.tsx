import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { HeroSection } from "@/components/marketing/sections/hero-section";
import { LogosMarquee } from "@/components/marketing/sections/logos-marquee";
import { ValueProposition } from "@/components/marketing/sections/value-proposition";
import { BenefitCards } from "@/components/marketing/sections/benefit-cards";
import { BlogCardsSection } from "@/components/marketing/sections/blog-cards-section";
import { CtaSection } from "@/components/marketing/sections/cta-section";

/**
 * Rivo landing, mobile-first showcase of the iOS app.
 *
 * Section composition:
 *   HeroSection → LogosMarquee → BenefitCards
 *   → ValueProposition → BlogCardsSection → CtaSection
 */
export default function Home() {
  return (
    <>
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
