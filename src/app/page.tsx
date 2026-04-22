import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HeroCopy } from "@/components/HeroCopy";
import { HeroLogo } from "@/components/HeroLogo";
import { MotionCard } from "@/components/MotionCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TechMarquee } from "@/components/TechMarquee";
import { VisualBento } from "@/components/VisualBento";
import { site } from "@/lib/site";

const problems = [
  {
    title: "Talent shortage & unstable workforce",
    problem:
      "Companies struggle to find skilled developers, AI engineers, and IT professionals. Retention is low, onboarding is slow, and project timelines get delayed.",
    bullets: [
      "Staff augmentation with vetted IT talent",
      "Third-party employment services for MNCs & Tier-1/Tier-2 companies",
      "Fast onboarding with complete HR & compliance support",
      "Long-term employee continuity through our client network",
    ],
  },
  {
    title: "Slow digital transformation & outdated systems",
    problem:
      "Businesses still rely on outdated software, manual processes, and legacy systems that limit growth and efficiency.",
    bullets: [
      "AI-driven automation tools",
      "Custom software development",
      "Cloud migration & modernization",
      "End-to-end digital transformation consulting",
    ],
  },
  {
    title: "Lack of innovation & product execution",
    problem:
      "Companies have ideas but lack the technical expertise, product strategy, or engineering bandwidth to turn them into real products.",
    bullets: [
      "AI product development (SaaS & apps)",
      "Prototype-to-production execution",
      "Dedicated product engineering teams",
      "Employee-driven innovation culture",
    ],
  },
] as const;

const services = [
  {
    title: "AI & product development",
    description:
      "We design and develop AI-powered products, SaaS platforms, and mobile applications that solve real-world challenges with automation, intelligence, and scalability.",
    href: "/products",
    tone: "glow" as const,
  },
  {
    title: "Software development & IT services",
    description:
      "We build secure, scalable, and high-performance digital solutions tailored to business needs.",
    href: "/services",
    tone: "poly" as const,
  },
  {
    title: "Staff augmentation & workforce",
    description:
      "We support MNCs and Tier-1/Tier-2 companies with skilled IT professionals and seamless third-party employment services.",
    href: "/services#workforce",
    tone: "poly" as const,
  },
];

const culture = [
  "Employee-first innovation",
  "Long-term employment support",
  "A workplace built on passion",
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-mesh dark:bg-hero-mesh-dark">
        <HeroBackdrop />
        <div className="pointer-events-none absolute inset-0 grid-glow opacity-60" aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-14 lg:px-8 lg:py-24">
          <HeroLogo />
          <HeroCopy />
        </div>
      </section>

      <section className="border-y border-slate-100 bg-gradient-subtle py-16 dark:border-slate-800 dark:bg-gradient-subtle-dark sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="About us"
              title="Build with purpose. Innovate with clarity."
              description={
                <>
                  {site.legalName} is a forward-thinking technology company focused on
                  building intelligent digital solutions for the modern world. We operate
                  through a unique hybrid model that blends AI product development,
                  client-driven project execution, and end-to-end IT services.{" "}
                  <Link
                    href="/about"
                    className="font-semibold text-brand-primary underline-offset-4 hover:text-brand-accent hover:underline"
                  >
                    Read our story
                  </Link>
                </>
              }
            />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal emphasis>
            <SectionHeading
              eyebrow="How we show up"
              title="Designed for teams shipping under pressure"
              description="A visual snapshot of the collaboration, craft, and infrastructure mindset we bring to every engagement."
            />
          </Reveal>
          <div className="mt-10">
            <VisualBento />
          </div>
          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">
            Photos from{" "}
            <Link
              href="https://unsplash.com/license"
              className="font-medium text-brand-primary hover:text-brand-accent hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Unsplash
            </Link>{" "}
            (Unsplash License).
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Industry realities"
              title="Problems we solve for modern IT"
              description="Three recurring challenges—and how Xeroura helps you move faster with less friction."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {problems.map((item, i) => (
              <MotionCard key={item.title} delay={i * 0.1} className="h-full">
                <article className="group h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition hover:border-brand-accent/40 hover:shadow-glow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-accent/40">
                  <div className="mb-4 inline-flex rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary dark:bg-brand-primary/20 dark:text-cyan-200">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-brand-navy dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">The problem: </span>
                    {item.problem}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-accent">
                    Xeroura&apos;s solution
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      <section className="poly-pattern border-y border-slate-100 bg-slate-50/80 py-16 dark:border-slate-800 dark:bg-slate-900/50 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Capability across the stack"
              description="From intelligent products to dependable delivery teams, we meet you where you are—and take you where you need to go."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {services.map((s, i) => (
              <MotionCard key={s.title} delay={i * 0.12} className="h-full">
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-white bg-white/90 p-6 shadow-card backdrop-blur transition hover:shadow-glow-sm dark:border-slate-800 dark:bg-slate-900/70 ${
                    s.tone === "glow" ? "grid-glow" : ""
                  }`}
                >
                  <div
                    className={`mb-4 h-1 w-14 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent ${s.tone === "glow" ? "shadow-glow-sm" : ""}`}
                  />
                  <h3 className="font-display text-lg font-semibold text-brand-navy dark:text-slate-100">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {s.description}
                  </p>
                  <Link
                    href={s.href}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-accent"
                  >
                    Learn more
                    <span aria-hidden>→</span>
                  </Link>
                </article>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Operating model"
              title="Our hybrid model"
              description="A balanced, future-proof structure combining product innovation, client projects, and IT services & workforce solutions—so you get stability, innovation, and continuous opportunity creation."
            />
          </Reveal>
          <Reveal delayMs={120}>
            <ul className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900/60">
              {["Product innovation", "Client projects", "IT services & workforce solutions"].map(
                (line) => (
                  <li
                    key={line}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 text-sm font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent text-xs font-bold text-white">
                      ✓
                    </span>
                    {line}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-brand-navy py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Culture"
              title="Built for people who build"
              description="Xeroura is designed to be a great place to work and a strong company in numbers."
              align="center"
              theme="light"
            />
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {culture.map((c, i) => (
              <MotionCard key={c} delay={i * 0.08} tone="dark">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center text-sm font-medium leading-snug text-slate-100 backdrop-blur transition hover:border-brand-accent/50 hover:shadow-glow-sm">
                  {c}
                </div>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Stack"
              title="Technologies we work with"
              description="Modern, proven tooling across cloud, data, and intelligent systems."
            />
          </Reveal>
          <TechMarquee />
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border-gradient bg-gradient-to-br from-white via-slate-50 to-white p-[1px] shadow-card">
              <div className="rounded-[1.4rem] bg-white px-6 py-10 dark:bg-slate-900 sm:px-10 sm:py-12">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                      Products
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-bold text-brand-navy dark:text-slate-100">
                      Intelligent products for real operations
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                      Explore LiveBot for on-screen employee assistance and Xeroura AI for
                      unified customer service automation.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <ButtonLink href="/products">View products</ButtonLink>
                      <ButtonLink href="/careers" variant="secondary">
                        Join the team
                      </ButtonLink>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <MotionCard delay={0}>
                      <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition hover:shadow-glow-sm dark:border-slate-700 dark:bg-slate-800/50">
                        <p className="text-xs font-bold uppercase tracking-wide text-brand-accent">
                          LiveBot
                        </p>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                          On-screen AI assistance that keeps teams productive without breaking
                          flow.
                        </p>
                      </div>
                    </MotionCard>
                    <MotionCard delay={0.1}>
                      <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition hover:shadow-glow-sm dark:border-slate-700 dark:bg-slate-800/50">
                        <p className="text-xs font-bold uppercase tracking-wide text-brand-primary">
                          Xeroura AI
                        </p>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                          SaaS automation for customer service across IT and non-IT sectors.
                        </p>
                      </div>
                    </MotionCard>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
