import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingHeader />
      <main className="mkt-container pt-32 pb-20 lg:pt-40 lg:pb-28">
        {children}
      </main>
      <MarketingFooter />
    </>
  );
}
