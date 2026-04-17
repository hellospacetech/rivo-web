"use client";

import { useEffect, useState } from "react";

/**
 * useReducedMotion, observe `(prefers-reduced-motion: reduce)`.
 *
 * Mandatory hook for any component that runs JS-driven animation,
 * scroll observers, or imperative motion. Mirrors boost-your-app's
 * marketing/sections/use-reduced-motion.ts.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return reduced;
}
