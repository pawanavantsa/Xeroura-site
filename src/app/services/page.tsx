import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `AI & product development, software delivery, and workforce solutions from ${site.legalName}.`,
};

const engagementModels = [
  {
    title: "Embedded squads",
    body: "Engineers and leads join your tools, ceremonies, and compliance guardrails—so delivery feels native to your org, not bolted on.",
  },
  {
    title: "Milestone delivery",
    body: "Clear scope slices, demos on a cadence, and explicit acceptance criteria—ideal when you need predictability alongside speed.",
  },
  {
    title: "Ramp & transition",
    body: "Structured onboarding, documentation, and handover so capability lands with your team and does not walk out the door on day one.",
  },
] as const;

const practices = [
  {
    title: "Architecture & security",
    detail: "Threat modeling, access patterns, and review gates suited to regulated and high-trust environments.",
  },
  {
    title: "Data & integrations",
    detail: "Pipelines, APIs, and observability so systems stay connected and measurable as they grow.",
  },
  {
    title: "Reliability & ownership",
    detail: "Runbooks, on-call expectations, and SLAs that match how your business actually operates.",
  },
] as const;

export default function ServicesPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 via-white to-slate-50/80 py-16 dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900/80 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,212,216,0.12), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(10,61,145,0.08), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">Services</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-brand-navy dark:text-slate-100 sm:text-5xl">
              Outcome-led partnerships—not generic staff aug
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {site.legalName} helps you ship and scale with clear ownership: how we engage, how we govern risk,
              and how we transfer capability back to your team when you are ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact">Start a conversation</ButtonLink>
              <ButtonLink href="/products" variant="secondary">
                View products
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Engagements"
              title="Ways we work with you"
              description="Pick the shape that matches your constraints—same standards across every model."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {engagementModels.map((p, i) => (
              <Reveal key={p.title} delayMs={i * 80}>
                <article
                  id={i === engagementModels.length - 1 ? "workforce" : undefined}
                  className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-slate-50/50 p-7 shadow-card transition hover:-translate-y-0.5 hover:border-brand-accent/30 hover:shadow-glow-sm dark:border-slate-800 dark:bg-slate-900/50"
                >
                  <div className="mb-4 h-1 w-14 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent" />
                  <h2 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">{p.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-subtle py-16 dark:bg-slate-950 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="How we run delivery"
              title="Engineering discipline you can audit"
              description="Under the hood, the same practices apply whether we are embedded, milestone-based, or helping you ramp internal capacity."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {practices.map((row, i) => (
              <Reveal key={row.title} delayMs={i * 70}>
                <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/60">
                  <h3 className="font-display text-lg font-semibold text-brand-navy dark:text-slate-100">{row.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{row.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delayMs={200}>
            <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-200/90 bg-white/90 p-8 dark:border-slate-800 dark:bg-slate-900/70 sm:flex-row sm:items-center">
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Product innovation, client programs, and workforce capacity sit in one operating fabric—so velocity
                does not trade off against continuity.
              </p>
              <ButtonLink href="/contact" variant="secondary">
                Talk through your context
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
