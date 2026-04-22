import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-brand-navy dark:text-slate-100 sm:text-4xl">
        Terms &amp; Conditions
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">For {site.legalName}</p>
      <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
        Last updated: April 2026
      </p>

      <div className="mt-10 space-y-8 text-slate-600 dark:text-slate-400">
        <p>
          These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the Xeroura
          Technologies website, products, and services. By accessing our website or using our
          services, you agree to these Terms.
        </p>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">1. Use of website &amp; services</h2>
          <p className="mt-3">You agree to use our website and services only for lawful purposes. You must not:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Attempt unauthorized access</li>
            <li>Misuse or disrupt our systems</li>
            <li>Upload harmful or malicious content</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">2. Intellectual property</h2>
          <p className="mt-3">
            All content, branding, logos, product names (including LiveBot and Xeroura AI), and
            materials on this website are the property of {site.legalName}.
          </p>
          <p className="mt-3">
            You may not copy, reproduce, or distribute any content without written permission.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">3. User submissions</h2>
          <p className="mt-3">When submitting information through forms (Careers, Contact, etc.):</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>You confirm the information is accurate</li>
            <li>You grant us permission to store and review the data</li>
            <li>You agree not to upload harmful or illegal content</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">4. Product usage</h2>
          <p className="mt-3">For users of LiveBot and Xeroura AI:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Access is granted based on subscription or service agreements</li>
            <li>Misuse or unauthorized sharing of access credentials is prohibited</li>
            <li>We may suspend access for security or compliance reasons</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">5. Limitation of liability</h2>
          <p className="mt-3">{site.legalName} is not responsible for:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Losses caused by misuse of our services</li>
            <li>Third-party system failures</li>
            <li>Downtime due to maintenance or external factors</li>
          </ul>
          <p className="mt-3">We provide services &quot;as available&quot; and &quot;as is&quot;.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">6. Termination</h2>
          <p className="mt-3">We may suspend or terminate access to our services if:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Terms are violated</li>
            <li>Illegal activity is detected</li>
            <li>Security risks are identified</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">7. Governing law</h2>
          <p className="mt-3">
            These Terms are governed by the laws of India, specifically the jurisdiction of
            Hyderabad, Telangana.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">8. Contact us</h2>
          <p className="mt-3">
            For questions regarding these Terms, contact:{" "}
            <a className="font-semibold text-brand-primary hover:text-brand-accent" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
