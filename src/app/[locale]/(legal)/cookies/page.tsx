import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Rivo",
  description:
    "Rivo cookie policy. Learn about the cookies used on our website and how to manage them.",
};

export default function CookiesPage() {
  return (
    <article className="max-w-[720px]">
      <header className="mb-12">
        <p className="mkt-label mb-4">Cookie Policy</p>
        <h1 className="mkt-title-section text-3xl md:text-4xl">
          Cookie Policy
        </h1>
        <p
          className="mt-4 text-sm"
          style={{ color: "var(--mkt-text-quaternary)" }}
        >
          Last updated: April 17, 2026
        </p>
      </header>

      <div className="legal-content flex flex-col gap-10">
        <Section title="1. What Are Cookies?">
          <p>
            Cookies are small text files placed on your device when you visit
            our website. They are used to ensure the proper functioning of our
            site, maintain security, and improve the user experience.
          </p>
        </Section>

        <Section title="2. Types of Cookies We Use">
          <div className="flex flex-col gap-6">
            <CookieType
              name="Essential Cookies"
              description="Required for core site functionality. These handle session management and security features. These cookies cannot be disabled."
            />
            <CookieType
              name="Analytics Cookies"
              description="Collect anonymous information about visitor counts, page views, and site usage patterns. This data helps us improve our site."
            />
            <CookieType
              name="Functional Cookies"
              description="Remember your personalized settings such as language preference and theme selection. Some features may not work without these cookies."
            />
          </div>
        </Section>

        <Section title="3. Third-Party Cookies">
          <p>
            Our site may contain cookies from the following third-party
            services:
          </p>
          <ul>
            <li>
              <strong>Analytics:</strong> To collect anonymous usage statistics
            </li>
            <li>
              <strong>Performance monitoring:</strong> To track page load times
              and errors
            </li>
          </ul>
        </Section>

        <Section title="4. Managing Cookies">
          <p>
            You can manage or delete cookies through your browser settings.
            Disabling cookies may result in some features of our site not
            working properly.
          </p>
          <p>Your browser settings typically offer the following options:</p>
          <ul>
            <li>Accept or reject all cookies</li>
            <li>Receive a notification when a cookie is placed</li>
            <li>Automatically delete cookies at the end of a session</li>
            <li>Block cookies from specific sites</li>
          </ul>
        </Section>

        <Section title="5. Data Protection">
          <p>
            Data collected through cookies is processed and protected under
            our Privacy Policy. No personally identifiable information is
            collected through cookies (except for essential session cookies).
          </p>
        </Section>

        <Section title="6. Changes">
          <p>
            We may update this cookie policy from time to time. Changes will
            be published on this page.
          </p>
        </Section>

        <Section title="7. Contact">
          <p>
            For questions about our cookie policy, please contact us at
            privacy@rivoapp.com.
          </p>
        </Section>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="mb-4 text-lg font-[510]"
        style={{ color: "var(--mkt-text-primary)" }}
      >
        {title}
      </h2>
      <div className="legal-body flex flex-col gap-3">{children}</div>
    </section>
  );
}

function CookieType({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div
      className="rounded-lg p-4"
      style={{
        background: "var(--mkt-bg-panel)",
        border: "1px solid var(--mkt-border-subtle)",
      }}
    >
      <h3
        className="mb-2 text-sm font-[510]"
        style={{ color: "var(--mkt-text-primary)" }}
      >
        {name}
      </h3>
      <p className="text-sm" style={{ color: "var(--mkt-text-tertiary)" }}>
        {description}
      </p>
    </div>
  );
}
