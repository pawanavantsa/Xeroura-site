import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description: `LiveBot and Xeroura AI — intelligent, scalable products from ${site.legalName}.`,
};

const products = [
  {
    name: "LiveBot",
    tag: "On-screen AI assistance for employees",
    overview:
      "LiveBot is an AI-powered on-screen assistant that helps employees instantly find solutions while working. It provides real-time guidance, troubleshooting, and workflow support without interrupting productivity.",
    features: [
      "On-screen AI chat window",
      "Instant problem resolution",
      "Context-aware suggestions",
      "Internal knowledge base integration",
      "Reduced dependency on senior staff",
      "Productivity boost across teams",
    ],
    accent: "from-brand-accent to-cyan-300",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect
          x="6"
          y="10"
          width="36"
          height="28"
          rx="8"
          className="stroke-brand-accent"
          strokeWidth="2"
          filter="url(#glow)"
        />
        <path
          d="M14 22h20M14 28h12"
          className="stroke-brand-primary"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Xeroura AI",
    tag: "Unified SaaS for customer services (IT & non-IT)",
    overview:
      "Xeroura AI is a powerful SaaS platform designed to automate customer service operations across IT and non-IT sectors. AI bots respond to customer tickets, resolve issues, and escalate only when human intervention is required.",
    features: [
      "AI ticket response system",
      "Smart escalation engine",
      "Multi-industry support",
      "Unified dashboard",
      "Self-service portal",
      "Analytics & reporting",
    ],
    accent: "from-brand-primary to-indigo-500",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden>
        <rect x="6" y="8" width="36" height="10" rx="2" className="stroke-brand-primary" strokeWidth="2" />
        <rect x="6" y="22" width="16" height="18" rx="2" className="stroke-brand-accent" strokeWidth="2" />
        <rect x="26" y="22" width="16" height="8" rx="2" className="stroke-brand-primary/60" strokeWidth="2" />
        <path d="M26 34h16" className="stroke-brand-primary/40" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

export default function ProductsPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-100 bg-hero-mesh py-14 dark:border-slate-800 dark:bg-hero-mesh-dark sm:py-20">
        <div className="pointer-events-none absolute inset-0 grid-glow opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Products
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-brand-navy dark:text-slate-100 sm:text-5xl">
              Intelligent, scalable, user-centric digital products
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              {site.legalName} builds products designed to solve real-world challenges—from
              frontline employee assistance to customer operations at scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact">Request a demo</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Custom engineering
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
          {products.map((p, index) => (
            <Reveal key={p.name} delayMs={index * 100}>
              <article className="grid gap-10 rounded-3xl border border-slate-100 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-900/60 lg:grid-cols-[0.35fr_1fr] lg:p-10">
                <div className="flex flex-col items-start gap-4">
                  <div className="animate-float rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-glow-sm dark:border-slate-700 dark:bg-slate-800/50">
                    {p.icon}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-brand-navy dark:text-slate-100">
                      {p.name}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-brand-primary">{p.tag}</p>
                  </div>
                  <div
                    className={`mt-2 h-1 w-full max-w-[10rem] rounded-full bg-gradient-to-r ${p.accent}`}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Overview
                  </h3>
                  <p className="mt-2 text-slate-600 leading-relaxed dark:text-slate-400">{p.overview}</p>
                  <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-brand-accent">
                    Key features
                  </h3>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
