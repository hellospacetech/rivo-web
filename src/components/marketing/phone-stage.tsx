import Image from "next/image";

/**
 * <PhoneStage>, a fully controlled slider track for app screenshots.
 *
 * No internal state. The parent owns `idx` and decides when to advance.
 * This lets the hero render the screenshot in one column and the slider
 * controls in another, while keeping a single source of truth.
 *
 * The track is a flex row of slides at full container width. Setting
 * `transform: translateX(-idx * 100%)` slides the active slide into
 * view with a quint-out 700ms transition.
 */

interface Slide {
  src: string;
  alt: string;
}

interface PhoneStageProps {
  slides: Slide[];
  /** Active slide index, owned by the parent. */
  idx: number;
  /** Width in px. */
  width: number;
  /** First slide is loaded with priority (use for hero). */
  priority?: boolean;
  className?: string;
}

export function PhoneStage({
  slides,
  idx,
  width,
  priority = false,
  className,
}: PhoneStageProps) {
  return (
    <div
      className={`overflow-hidden ${className ?? ""}`}
      style={{ width }}
    >
      <div
        className="flex"
        style={{
          transform: `translateX(-${idx * 100}%)`,
          transition: "transform 700ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="shrink-0"
            style={{ width }}
            aria-hidden={idx === i ? "false" : "true"}
          >
            <div
              className="overflow-hidden rounded-[32px]"
              style={{ border: "1px solid var(--mkt-border-translucent)" }}
            >
              <Image
                src={slide.src}
                alt={idx === i ? slide.alt : ""}
                width={width}
                height={Math.round(width * 2.17)}
                sizes={`${width}px`}
                priority={priority && i === 0}
                style={{ objectFit: "cover", display: "block", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
