"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

/**
 * <LocaleSwitcher>, minimal dropdown using next-intl routing.
 *
 * No SDK dependency. Reads available locales from CDN manifest
 * at mount, switches via router navigation.
 */

interface LangOption {
  code: string;
  name: string;
  nativeName: string;
}

const MANIFEST_URL =
  "https://cdn.better-i18n.com/hellospace/rivo-web/manifest.json";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [languages, setLanguages] = useState<LangOption[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fetch languages from CDN manifest
  useEffect(() => {
    fetch(MANIFEST_URL)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.languages)) {
          setLanguages(
            data.languages.map((l: LangOption) => ({
              code: l.code,
              name: l.name,
              nativeName: l.nativeName,
            })),
          );
        }
      })
      .catch(() => {});
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const switchLocale = (code: string) => {
    document.cookie = `NEXT_LOCALE=${code};path=/;max-age=31536000`;
    // Strip current locale prefix from pathname
    const segments = pathname.split("/").filter(Boolean);
    const knownCodes = languages.map((l) => l.code);
    if (knownCodes.includes(segments[0])) {
      segments.shift();
    }
    const newPath = code === "en" ? `/${segments.join("/")}` : `/${code}/${segments.join("/")}`;
    router.push(newPath || "/");
    router.refresh();
    setOpen(false);
  };

  if (languages.length <= 1) return null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 items-center gap-1.5 px-3 text-[13.5px] font-[450] transition-colors duration-150"
        style={{
          borderRadius: 999,
          letterSpacing: "-0.005em",
          color: "var(--mkt-text-tertiary)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--mkt-text-primary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--mkt-text-tertiary)")
        }
      >
        {locale.toUpperCase()}
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-lg py-1"
          style={{
            background: "rgba(14,15,16,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            animation: "mkt-dropdown-scale-in 0.15s ease forwards",
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => switchLocale(lang.code)}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] transition-colors duration-100"
              style={{
                background:
                  lang.code === locale
                    ? "rgba(255,255,255,0.06)"
                    : "transparent",
                color:
                  lang.code === locale
                    ? "var(--mkt-text-primary)"
                    : "var(--mkt-text-tertiary)",
                fontWeight: lang.code === locale ? 510 : 400,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (lang.code !== locale)
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                if (lang.code !== locale)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      style={{
        transition: "transform 0.15s ease",
        transform: open ? "rotate(180deg)" : "rotate(0)",
      }}
    >
      <path
        d="M2.5 3.75L5 6.25L7.5 3.75"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
