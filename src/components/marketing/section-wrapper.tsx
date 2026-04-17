import type { ReactNode } from "react";
import { ScrollReveal } from "./scroll-reveal";

/**
 * <SectionWrapper>, combines `mkt-container` + `<ScrollReveal>` and
 * applies the canonical accessibility pattern (`aria-labelledby`).
 *
 * Use for every marketing section that wraps its own heading.
 */
type SectionWrapperProps = {
  id?: string;
  /** ID of the section heading element for aria-labelledby */
  ariaLabelledBy?: string;
  /** Tailwind classes for vertical padding (use boost spacing scale) */
  paddingClass?: string;
  className?: string;
  children: ReactNode;
};

export function SectionWrapper({
  id,
  ariaLabelledBy,
  paddingClass = "pt-16 pb-20 lg:pt-20 lg:pb-24",
  className,
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`${paddingClass}${className ? ` ${className}` : ""}`}
    >
      <ScrollReveal>
        <div className="mkt-container">{children}</div>
      </ScrollReveal>
    </section>
  );
}
