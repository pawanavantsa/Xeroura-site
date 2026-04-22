import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `AI & product development, software delivery, and workforce solutions from ${site.legalName}.`,
};

const pillars = [
  {
    title: "AI & product development",
    body: "We design and develop AI-powered products, SaaS platforms, and mobile applications that solve real-world challenges with automation, intelligence, and scalability.",
  },
  {
    title: "Software development & IT services",
    body: "We build secure, scalable, and high-performance digital solutions tailored to business needs—from modernization to cloud-native platforms.",
  },
  {
    title: "Staff augmentation & workforce solutions",
    body: "We support MNCs and Tier-1/Tier-2 companies with skilled IT professionals and seamless third-party employment services.",
    id: "workforce" as const,
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="poly-pattern border-b border-slate-100 bg-slate-50/80 py-14 dark:border-slate-800 dark:bg-slate-900/50 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Services
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-brand-navy dark:text-slate-100 sm:text-5xl">
              Enterprise delivery with an AI-first mindset
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              {site.legalName} combines product thinking, robust engineering, and dependable
              workforce programs so your teams can scale without compromising quality.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact">Start a conversation</ButtonLink>
              <ButtonLink href="/products" variant="secondary">
                See our products
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="End-to-end support for ambitious teams"
              description="Whether you need a dedicated squad, a greenfield build, or long-term talent continuity—we structure delivery around outcomes."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delayMs={i * 80}>
                <article
                  id={p.id}
                  className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow-sm dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent" />
                  <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-14 dark:border-slate-800 dark:bg-slate-950 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Hybrid model"
              title="Innovation, execution, and continuity—together"
              description="Our balanced structure combines product innovation, client projects, and IT services & workforce solutions. That mix keeps teams sharp, delivery predictable, and opportunities compounding."
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
