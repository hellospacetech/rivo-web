"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * <ScrollReveal>, IntersectionObserver wrapper that adds the
 * `.visible` class to its child container when scrolled into view.
 *
 * Mirrors boost-your-app's marketing/sections/scroll-reveal.tsx:
 *   - threshold 0.01
 *   - rootMargin "200px 0px" (eager reveal)
 *   - one-shot (no re-hide)
 *   - reduced-motion: visible immediately, no observer
 *
 * Pair with the `mkt-reveal` CSS class on the immediate child.
 */
type ScrollRevealProps = {
  children: ReactNode;
  /** Optional className appended to the wrapper div */
  className?: string;
  /** Optional asChild-style render: skip the wrapper, apply class to first child */
  as?: "div" | "section";
};

export function ScrollReveal({
  children,
  className,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.01, rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <Tag
      ref={ref as never}
      className={`mkt-reveal${visible ? " visible" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </Tag>
  );
}
