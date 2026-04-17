import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <html lang="en" className="h-full">
      <body className="marketing-dark flex min-h-full items-center justify-center">
        <div className="text-center">
          <p
            className="mb-2 text-sm font-[510] uppercase tracking-[0.06em]"
            style={{ color: "var(--mkt-text-quaternary)" }}
          >
            404
          </p>
          <h1
            className="mb-4 text-2xl font-[450] tracking-[-0.02em]"
            style={{ color: "var(--mkt-text-primary)" }}
          >
            Page not found
          </h1>
          <p className="mb-8" style={{ color: "var(--mkt-text-tertiary)" }}>
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center no-underline"
            style={{
              height: 44,
              padding: "0 16px",
              fontSize: "0.875rem",
              fontWeight: 450,
              color: "var(--mkt-bg-primary)",
              background: "#e6e6e6",
              borderRadius: 4,
            }}
          >
            Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
