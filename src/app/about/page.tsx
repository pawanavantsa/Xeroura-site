import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.legalName}: our hybrid model, vision, mission, and how we build intelligent digital solutions.`,
};

export default function AboutPage() {
  return (
    <div className="bg-gradient-subtle dark:bg-slate-950">
      <section className="border-b border-slate-100 bg-white/80 py-14 dark:border-slate-800 dark:bg-slate-950/90 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              About Xeroura
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-brand-navy dark:text-slate-100 sm:text-5xl">
              Forward-thinking technology for the modern world
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {site.legalName} is a forward-thinking technology company focused on building
              intelligent digital solutions for the modern world. We operate through a unique
              hybrid model that blends AI product development, client-driven project execution,
              and end-to-end IT services.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Principles"
              title="Build with purpose. Innovate with clarity. Deliver with excellence."
              description={
                <>
                  We believe in creating a workspace where ideas thrive, employees grow,
                  and clients experience technology that truly transforms their business. Our
                  approach is simple on paper—disciplined in execution.
                </>
              }
            />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-14 dark:border-slate-800 dark:bg-slate-950 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <article className="h-full rounded-2xl border border-slate-100 bg-slate-50/60 p-8 shadow-card dark:border-slate-800 dark:bg-slate-900/50">
              <h2 className="font-display text-2xl font-bold text-brand-navy dark:text-slate-100">Vision</h2>
              <p className="mt-4 text-slate-600 leading-relaxed dark:text-slate-400">
                To build a future-ready technology ecosystem where innovation, AI-driven
                products, and human potential come together — empowering businesses, clients,
                and employees to grow without limits.
              </p>
            </article>
          </Reveal>
          <Reveal delayMs={100}>
            <article className="h-full rounded-2xl border border-slate-100 bg-slate-50/60 p-8 shadow-card dark:border-slate-800 dark:bg-slate-900/50">
              <h2 className="font-display text-2xl font-bold text-brand-navy dark:text-slate-100">Mission</h2>
              <p className="mt-4 text-slate-600 leading-relaxed dark:text-slate-400">
                Our mission is to deliver intelligent digital solutions through a hybrid model
                that blends AI product development, client-focused project execution, and
                high-quality IT services. We aim to create a workplace where ideas are
                nurtured, employees thrive, and clients experience measurable impact.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-brand-navy dark:text-slate-100">
              Ready to work with us?
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Tell us about your roadmap—we&apos;ll help you ship, scale, and support it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact">Contact</ButtonLink>
              <ButtonLink href="/careers" variant="secondary">
                Careers
              </ButtonLink>
            </div>
            <p className="mt-8 text-sm text-slate-500 dark:text-slate-500">
              Prefer email?{" "}
              <Link className="font-semibold text-brand-primary hover:text-brand-accent" href={`mailto:${site.email}`}>
                {site.email}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
