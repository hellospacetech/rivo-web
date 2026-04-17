import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Rivo",
  description:
    "Rivo terms of service. The terms and conditions that apply when using our app and services.",
};

export default function TermsPage() {
  return (
    <article className="max-w-[720px]">
      <header className="mb-12">
        <p className="mkt-label mb-4">Terms of Service</p>
        <h1 className="mkt-title-section text-3xl md:text-4xl">
          Terms of Service
        </h1>
        <p
          className="mt-4 text-sm"
          style={{ color: "var(--mkt-text-quaternary)" }}
        >
          Last updated: April 17, 2026
        </p>
      </header>

      <div className="legal-content flex flex-col gap-10">
        <Section title="1. Acceptance">
          <p>
            By using the Rivo mobile application (&quot;App&quot;) or website
            (&quot;Site&quot;), you agree to these Terms of Service. If you do
            not accept these terms, please do not use our services.
          </p>
        </Section>

        <Section title="2. Service Description">
          <p>
            Rivo is an information platform that aggregates market news,
            analyzes it using artificial intelligence, and generates
            easy-to-understand reports for investors based on their risk
            profile. Rivo does not provide investment advisory services.
          </p>
        </Section>

        <Section title="3. Account Responsibility">
          <ul>
            <li>You are responsible for the security of your account</li>
            <li>
              You are responsible for all activity conducted through your
              account
            </li>
            <li>
              You must notify us immediately in the event of unauthorized
              access
            </li>
            <li>
              You must not share your account credentials with third parties
            </li>
          </ul>
        </Section>

        <Section title="4. Acceptable Use">
          <p>When using our services, you must adhere to the following rules:</p>
          <ul>
            <li>Comply with all applicable laws and regulations</li>
            <li>
              Not interfere with other users&apos; ability to use the services
            </li>
            <li>
              Not attempt to gain unauthorized access to the system
            </li>
            <li>Not engage in content scraping or automated data collection</li>
          </ul>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            All content, designs, logos, text, graphics, and software on the
            App and Site are the intellectual property of Rivo. Unauthorized
            copying, distribution, or modification of this content is
            prohibited.
          </p>
        </Section>

        <Section title="6. Investment Disclaimer">
          <p>
            Content provided by Rivo is for informational purposes only and
            does not constitute investment advice. Investment decisions are
            entirely the responsibility of the user. Rivo accepts no liability
            for investments made based on the information provided.
          </p>
        </Section>

        <Section title="7. Service Modifications">
          <p>
            Rivo reserves the right to modify, suspend, or discontinue its
            services without prior notice. No liability is accepted toward
            users for such changes.
          </p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            Rivo does not guarantee that the services will be uninterrupted or
            error-free. We are not liable for indirect, incidental, or special
            damages arising from the use of our services.
          </p>
        </Section>

        <Section title="9. Termination">
          <p>
            Rivo may suspend or terminate your account without prior notice in
            the event of a violation of these terms. You may delete your
            account at any time through the App.
          </p>
        </Section>

        <Section title="10. Governing Law">
          <p>
            These terms are governed by the laws of the Republic of Turkey.
            The courts and enforcement offices of Istanbul shall have
            jurisdiction over any disputes.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            For questions about these terms, please contact us at
            legal@rivoapp.com.
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
