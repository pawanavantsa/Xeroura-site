import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-brand-navy dark:text-slate-100 sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">For {site.legalName}</p>
      <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
        Last updated: April 2026
      </p>

      <div className="mt-10 space-y-8 text-slate-600 dark:text-slate-400">
        <p>
          {site.legalName} (&quot;Xeroura&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;)
          is committed to protecting your privacy. This Privacy Policy explains how we collect,
          use, store, and safeguard your information when you interact with our website,
          products, services, and applications.
        </p>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">1. Information we collect</h2>
          <p className="mt-3">We may collect the following types of information:</p>
          <h3 className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-200">A. Personal information</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Employment details (submitted through the Careers form)</li>
            <li>Uploaded documents (resume, portfolio, etc.)</li>
          </ul>
          <h3 className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-200">B. Technical information</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Usage data</li>
            <li>Cookies and tracking data</li>
          </ul>
          <h3 className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-200">C. Service-related information</h3>
          <p className="mt-2">For users of our products (LiveBot, Xeroura AI):</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Login details</li>
            <li>Ticket data</li>
            <li>Interaction logs</li>
            <li>System usage patterns</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">2. How we use your information</h2>
          <p className="mt-3">We use collected information to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Provide and improve our services</li>
            <li>Respond to inquiries and support requests</li>
            <li>Process job applications</li>
            <li>Enhance user experience</li>
            <li>Maintain security and prevent misuse</li>
            <li>Improve product performance and analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">3. Data sharing</h2>
          <p className="mt-3">We do not sell your personal information. We may share data only with:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Trusted service providers</li>
            <li>Cloud hosting partners</li>
            <li>Compliance or legal authorities (only when required by law)</li>
          </ul>
          <p className="mt-3">All partners follow strict confidentiality and data-protection standards.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">4. Data security</h2>
          <p className="mt-3">We use industry-standard security measures to protect your information, including:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Encrypted storage</li>
            <li>Secure access controls</li>
            <li>Regular audits</li>
            <li>Restricted data access</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">5. Your rights</h2>
          <p className="mt-3">You may request:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Access to your data</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your data (where applicable)</li>
            <li>Withdrawal of consent</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">6. Third-party links</h2>
          <p className="mt-3">
            Our website may contain links to external sites. We are not responsible for their
            privacy practices.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">7. Updates to this policy</h2>
          <p className="mt-3">
            We may update this Privacy Policy periodically. Changes will be posted on this page
            with a revised &quot;Last Updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">8. Contact us</h2>
          <p className="mt-3">
            For privacy-related questions, contact us at:{" "}
            <a className="font-semibold text-brand-primary hover:text-brand-accent" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">
            9. Third-party photography on this website
          </h2>
          <p className="mt-3">
            Some visuals on our public website are stock photographs from{" "}
            <a
              className="font-semibold text-brand-primary hover:text-brand-accent"
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
            , used under the{" "}
            <a
              className="font-semibold text-brand-primary hover:text-brand-accent"
              href="https://unsplash.com/license"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash License
            </a>
            . Unsplash&apos;s terms govern use of those images; this policy otherwise applies to information we
            collect through our site and services as described above.
          </p>
        </section>
      </div>
    </article>
  );
}
