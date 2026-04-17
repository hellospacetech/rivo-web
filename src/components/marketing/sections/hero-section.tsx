import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AudioTranscript } from "../audio-transcript";

/**
 * <HeroSection>, asymmetric layout with iPhone podcast player replica.
 *
 * Left column: H1 + subtitle + store badges
 * Right column: iPhone-framed podcast player with word-level highlight
 */

const WORD_DELAY_BASE = 0.15;
const WORD_DELAY_STEP = 0.07;

export async function HeroSection() {
  const t = await getTranslations("hero");
  const titleLines = [t("titleLine1"), t("titleLine2")];
  let wordIndex = 0;

  return (
    <section
      className="mkt-container relative pb-10 pt-[calc(80px+80px)] lg:pb-0 lg:pt-[calc(80px+120px)]"
      aria-labelledby="hero-heading"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[58fr_42fr] lg:gap-10">
        {/* ───── LEFT COLUMN ───── */}
        <div className="relative" style={{ zIndex: 2 }}>
          <h1
            id="hero-heading"
            className="mkt-title-hero mb-8 -ml-0.5 text-[2.25rem] leading-[1.1] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] lg:leading-[1.05] xl:text-[4.5rem]"
          >
            {titleLines.map((line, lineIdx) => (
              <span key={lineIdx} className="block">
                {line.split(" ").map((word, i) => {
                  const delay = WORD_DELAY_BASE + wordIndex * WORD_DELAY_STEP;
                  wordIndex++;
                  return (
                    <span key={`${lineIdx}-${i}-${word}`}>
                      <span
                        className="mkt-word-reveal"
                        style={{ animationDelay: `${delay}s` }}
                      >
                        {word}
                      </span>{" "}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <p
            className="mkt-fade-in mkt-body mb-8 max-w-[460px]"
            style={{ animationDelay: "0.8s" }}
          >
            {t("subtitle")}
          </p>

          <div
            className="mkt-fade-in flex items-center gap-2"
            style={{ animationDelay: "0.95s" }}
          >
            <a
              href="https://apps.apple.com/app/rivo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
              className="transition-opacity duration-150 hover:opacity-80"
            >
              <Image
                src="/badges/app-store.svg"
                alt="Download on the App Store"
                width={150}
                height={50}
                style={{ height: 40, width: "auto" }}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.rivo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              className="transition-opacity duration-150 hover:opacity-80"
              style={{ margin: "-8px -10px" }}
            >
              <Image
                src="/badges/google-play.png"
                alt="Get it on Google Play"
                width={180}
                height={53}
                style={{ height: 56, width: "auto" }}
              />
            </a>
          </div>
        </div>

        {/* ───── RIGHT COLUMN: iPhone podcast player ───── */}
        <div
          className="mkt-fade-in flex justify-center lg:justify-end"
          style={{ animationDelay: "1.0s" }}
        >
          <AudioTranscript />
        </div>
      </div>
    </section>
  );
}
