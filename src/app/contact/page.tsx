import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.legalName} — email, office address, and location in HITEC City, Hyderabad.`,
};

const mapSrc =
  "https://www.openstreetmap.org/export/embed.html?bbox=78.3660%2C17.4488%2C78.3762%2C17.4541&layer=mapnik&marker=17.451441%2C78.371071";

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-slate-100 bg-white py-14 dark:border-slate-800 dark:bg-slate-950 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Contact
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-navy dark:text-slate-100 sm:text-5xl">
              Let&apos;s build what&apos;s next
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Reach out for partnerships, services, product inquiries, or media. We respond to
              thoughtful messages quickly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="space-y-8">
              <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-6 shadow-card dark:border-slate-800 dark:bg-slate-900/50 sm:p-8">
                <h2 className="font-display text-lg font-semibold text-brand-navy dark:text-slate-100">
                  Email
                </h2>
                <a
                  className="mt-2 inline-flex text-sm font-semibold text-brand-primary hover:text-brand-accent"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-6 shadow-card dark:border-slate-800 dark:bg-slate-900/50 sm:p-8">
                <h2 className="font-display text-lg font-semibold text-brand-navy dark:text-slate-100">
                  Office address
                </h2>
                <address className="mt-3 not-italic text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {site.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
                  Coordinates: {site.address.lat}, {site.address.lng} (Awfis N Heights, HITEC
                  City)
                </p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-card dark:border-slate-800">
                <iframe
                  title="Xeroura office location map"
                  src={mapSrc}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
