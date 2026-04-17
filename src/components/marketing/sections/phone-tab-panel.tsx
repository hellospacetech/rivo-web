import Image from "next/image";

/**
 * <PhoneTabPanel>, the inner content for a single FeatureSection tab when
 * showing an iPhone screenshot. The outer mkt-panel-outer/inner shell is
 * provided by FeatureSection itself; this component centers a rounded
 * screenshot within that shell with breathing room and a soft ambient glow.
 *
 * Each tab renders a static still (no auto-cycle) because the user
 * already controls "which screen to show" by clicking the tab.
 */

interface PhoneTabPanelProps {
  src: string;
  alt: string;
}

export function PhoneTabPanel({ src, alt }: PhoneTabPanelProps) {
  return (
    <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden py-10 lg:min-h-[600px] lg:py-16">
      {/* Soft ambient circle behind the screenshot */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: 600,
          height: 600,
          borderRadius: 600,
          background:
            "radial-gradient(50% 50%, rgba(255,255,255,0.05) 0%, transparent 80%)",
          zIndex: 0,
        }}
      />
      <div
        className="relative overflow-hidden rounded-[32px]"
        style={{ zIndex: 1, width: 280, border: "1px solid var(--mkt-border-translucent)" }}
      >
        <Image
          src={src}
          alt={alt}
          width={280}
          height={607}
          sizes="(max-width: 1024px) 60vw, 280px"
          style={{ objectFit: "cover", display: "block", width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}
