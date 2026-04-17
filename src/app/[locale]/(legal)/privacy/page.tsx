import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Rivo",
  description:
    "Rivo privacy policy. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-[720px]">
      <header className="mb-12">
        <p className="mkt-label mb-4">Privacy Policy</p>
        <h1 className="mkt-title-section text-3xl md:text-4xl">
          Privacy Policy
        </h1>
        <p
          className="mt-4 text-sm"
          style={{ color: "var(--mkt-text-quaternary)" }}
        >
          Last updated: April 17, 2026
        </p>
      </header>

      <div className="legal-content flex flex-col gap-10">
        <Section title="1. Overview">
          <p>
            Rivo (&quot;we&quot;, &quot;our&quot;, or &quot;the Company&quot;)
            is committed to protecting the privacy of our users. This Privacy
            Policy explains how we collect, use, store, and protect your
            personal data when you use the Rivo mobile application
            (&quot;App&quot;) and our website (&quot;Site&quot;).
          </p>
        </Section>

        <Section title="2. Data We Collect">
          <ul>
            <li>
              <strong>Account information:</strong> Name, email address,
              password (hashed)
            </li>
            <li>
              <strong>Profile preferences:</strong> Risk profile selection
              (Conservative, Balanced, Aggressive), areas of interest
            </li>
            <li>
              <strong>Usage data:</strong> In-app interactions, session
              duration, preferred features
            </li>
            <li>
              <strong>Device information:</strong> Operating system, device
              model, unique device identifier
            </li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Data">
          <p>We use the data we collect for the following purposes:</p>
          <ul>
            <li>
              Generating daily audio briefs tailored to your risk profile
            </li>
            <li>Delivering personalized market analysis</li>
            <li>Improving app performance and user experience</li>
            <li>Identifying and resolving technical issues</li>
            <li>Fulfilling our legal obligations</li>
          </ul>
        </Section>

        <Section title="4. Data Sharing">
          <p>
            We do not sell your personal data to third parties. Your data may
            only be shared in the following circumstances:
          </p>
          <ul>
            <li>
              With our service providers (hosting, analytics) under
              contractual obligations
            </li>
            <li>With authorized authorities when required by law</li>
            <li>With your explicit consent</li>
          </ul>
        </Section>

        <Section title="5. Data Security">
          <p>
            We implement industry-standard security measures to protect your
            data. All data transfers are encrypted using SSL/TLS. Passwords
            are hashed using the bcrypt algorithm.
          </p>
        </Section>

        <Section title="6. Data Retention">
          <p>
            We retain your personal data for as long as your account is active
            or as needed to provide our services. When you delete your account,
            your data will be permanently removed from our systems within 30
            days.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p>You have the following rights regarding your personal data:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of inaccurate or incomplete data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to or restrict the processing of your data</li>
            <li>Request data portability</li>
          </ul>
        </Section>

        <Section title="8. Changes">
          <p>
            We may update this policy from time to time. We will notify you of
            significant changes through the App or via email.
          </p>
        </Section>

        <Section title="9. Contact">
          <p>
            For questions about our privacy policy, please contact us at
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
