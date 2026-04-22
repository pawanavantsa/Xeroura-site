import type { Metadata } from "next";
import { CareersForm } from "@/components/CareersForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join ${site.legalName} — submit your profile for current and future opportunities.`,
};

export default function CareersPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-100 bg-hero-mesh py-14 dark:border-slate-800 dark:bg-hero-mesh-dark sm:py-20">
        <div className="pointer-events-none absolute inset-0 grid-glow opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Careers
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-brand-navy dark:text-slate-100 sm:text-5xl">
              Join a team that builds the future
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              We welcome passionate developers, designers, analysts, and innovators who want to
              work on meaningful technology. Even if hiring is not active, you can submit your
              details for future opportunities.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <CareersForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
