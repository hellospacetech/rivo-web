"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";

/**
 * <MarketingHeader>, unified floating pill nav.
 *
 *   ┌────────────────────────────────────────────────────────────┐
 *   │ [R] Rivo │ Features Profiles Pricing Blog │ Sign in ▐Start▌│
 *   └────────────────────────────────────────────────────────────┘
 *
 * Sophistications:
 *   - Scroll-aware: bg opacity + border strength transitions on scroll
 *   - Active section: IntersectionObserver highlights current section
 *   - Sliding indicator: shared hover pill slides between nav items
 *   - Entrance: fade-in synced with hero animation timeline
 *   - Mobile drawer: staggered item reveal
 */

const NAV_KEYS = ["features", "profiles", "blog"] as const;
const NAV_HREFS = ["/features", "/profiles", "/blog"] as const;

export function MarketingHeader() {
  const t = useTranslations("nav");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoverRect, setHoverRect] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

  /* ── Scroll awareness ──────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section tracking ───────────────────────────────── */
  useEffect(() => {
    const sectionIds = NAV_HREFS.filter((href) =>
      href.startsWith("#"),
    ).map((href) => href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Mobile drawer ─────────────────────────────────────────── */
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  /* ── Sliding hover indicator ───────────────────────────────── */
  const handleNavHover = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!navRef.current) return;
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = e.currentTarget.getBoundingClientRect();
      setHoverRect({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    },
    [],
  );

  const clearHover = useCallback(() => setHoverRect(null), []);

  return (
    <>
      <header
        className="mkt-fade-in fixed inset-x-0 top-0 z-[100] h-20"
        style={{ animationDelay: "0.05s" }}
      >
        {/* Ambient top-fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,9,10,0.92) 0%, rgba(8,9,10,0.6) 55%, rgba(8,9,10,0) 100%)",
            opacity: scrolled ? 1 : 0.7,
            transition:
              "opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />

        <div className="relative flex h-full items-center justify-center px-4">
          {/* ── Unified floating pill (desktop) ─────────────────── */}
          <nav
            aria-label="Primary"
            className="hidden items-center lg:flex"
            style={{
              height: 56,
              padding: 6,
              gap: 2,
              borderRadius: 999,
              background: scrolled
                ? "rgba(14,15,16,0.88)"
                : "rgba(14,15,16,0.72)",
              border: `1px solid rgba(255,255,255,${scrolled ? "0.10" : "0.07"})`,
              backdropFilter: "blur(24px) saturate(140%)",
              WebkitBackdropFilter: "blur(24px) saturate(140%)",
              transition:
                "background 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label={t("home")}
              className="flex h-11 items-center gap-2.5 pl-3 pr-4"
              style={{
                borderRadius: 999,
                letterSpacing: "-0.01em",
              }}
            >
              <Image
                src="/rivo-logo.png"
                alt=""
                width={26}
                height={26}
                priority
                className="rounded-[6px]"
              />
              <span className="text-[15px] font-[510] text-[var(--mkt-text-primary)]">
                Rivo
              </span>
            </Link>

            {/* Divider */}
            <Divider />

            {/* Primary nav with sliding indicator */}
            <ul
              ref={navRef}
              className="relative flex items-center gap-0.5"
              onMouseLeave={clearHover}
            >
              {/* Sliding hover pill */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 -translate-y-1/2"
                style={{
                  left: hoverRect?.left ?? 0,
                  width: hoverRect?.width ?? 0,
                  height: 36,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  opacity: hoverRect ? 1 : 0,
                  transition: hoverRect
                    ? "left 0.25s cubic-bezier(0.23, 1, 0.32, 1), width 0.25s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.15s ease"
                    : "opacity 0.2s ease",
                }}
              />

              {NAV_KEYS.map((key, i) => {
                const href = NAV_HREFS[i];
                const isActive =
                  href.startsWith("#") &&
                  activeSection === href.slice(1);
                return (
                  <li key={key}>
                    <Link
                      href={href}
                      className="relative flex h-11 items-center px-4 text-[13.5px] font-[450] transition-colors duration-150"
                      style={{
                        borderRadius: 999,
                        letterSpacing: "-0.005em",
                        color: isActive
                          ? "var(--mkt-text-primary)"
                          : "var(--mkt-text-tertiary)",
                      }}
                      onMouseEnter={(e) => {
                        handleNavHover(e);
                        if (!isActive)
                          e.currentTarget.style.color =
                            "var(--mkt-text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          e.currentTarget.style.color =
                            "var(--mkt-text-tertiary)";
                      }}
                    >
                      {t(key)}
                      {/* Active dot */}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2"
                        style={{
                          width: 3,
                          height: 3,
                          borderRadius: 999,
                          background: "var(--mkt-text-primary)",
                          opacity: isActive ? 1 : 0,
                          transform: `translateX(-50%) scale(${isActive ? 1 : 0})`,
                          transition:
                            "opacity 0.3s ease, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Divider />
            <LocaleSwitcher />
          </nav>

          {/* ── Mobile bar ──────────────────────────────────────── */}
          <div className="flex w-full items-center justify-between lg:hidden">
            <Link
              href="/"
              aria-label={t("home")}
              className="flex h-11 items-center gap-2.5"
            >
              <Image
                src="/rivo-logo.png"
                alt=""
                width={26}
                height={26}
                priority
                className="rounded-[6px]"
              />
              <span className="text-[15px] font-[510] text-[var(--mkt-text-primary)]">
                Rivo
              </span>
            </Link>
            <div className="flex items-center gap-1">
              <LocaleSwitcher />
              <button
                type="button"
                onClick={() => setDrawerOpen((v) => !v)}
                aria-label={drawerOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={drawerOpen}
              className="flex h-11 w-11 items-center justify-center transition-transform duration-200 active:scale-95"
              style={{
                borderRadius: 999,
                background: drawerOpen
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(14,15,16,0.72)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(24px) saturate(140%)",
                WebkitBackdropFilter: "blur(24px) saturate(140%)",
                transition:
                  "background 0.2s ease, transform 0.2s ease",
              }}
            >
              {drawerOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ───────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[99] lg:hidden"
        style={{
          top: 80,
          background: "var(--mkt-bg-primary)",
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
          transition: "opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div
          className="flex flex-col"
          style={{
            padding: "24px var(--mkt-page-padding, 16px)",
          }}
        >
          {NAV_KEYS.map((key, i) => (
            <Link
              key={key}
              href={NAV_HREFS[i]}
              onClick={() => setDrawerOpen(false)}
              className="flex min-h-12 items-center border-b border-[rgba(255,255,255,0.05)] py-3.5 text-[20px] font-[510] text-[var(--mkt-text-primary)]"
              style={{
                opacity: drawerOpen ? 1 : 0,
                transform: drawerOpen
                  ? "translateY(0)"
                  : "translateY(8px)",
                transition: `opacity 0.35s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.05}s, transform 0.35s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.05}s`,
              }}
            >
              {t(key)}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Shared hairline divider inside the pill ──────────────────────── */

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="mx-1 h-6 w-px"
      style={{ background: "rgba(255,255,255,0.08)" }}
    />
  );
}

/* ─── Inline SVG icons ─────────────────────────────────────────────── */

function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      {[2, 8, 14].flatMap((y) =>
        [2, 8, 14].map((x) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="1.2"
            fill="var(--mkt-text-tertiary)"
          />
        )),
      )}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 3l10 10M13 3L3 13"
        stroke="var(--mkt-text-primary)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
