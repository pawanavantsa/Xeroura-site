import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";

export function HomeCta() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border-gradient bg-gradient-to-br from-white via-slate-50 to-white p-[1px] shadow-card">
            <div className="rounded-[1.4rem] bg-white px-6 py-10 dark:bg-slate-900 sm:px-10 sm:py-12">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                    Start your transformation
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold text-brand-navy dark:text-slate-100">
                    Ready to improve your AI process quality?
                  </h2>
                  <p className="mt-3 text-slate-600 dark:text-slate-400">
                    Let&apos;s map your current bottlenecks and design a practical AI operating
                    model with measurable outcomes.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <ButtonLink href="/contact" className="hover:scale-[1.04]">
                      Book a strategy call
                    </ButtonLink>
                    <ButtonLink href="/products" variant="secondary">
                      View products
                    </ButtonLink>
                    <ButtonLink href="/careers" variant="secondary">
                      Join our team
                    </ButtonLink>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition hover:-translate-y-[5px] hover:shadow-glow-sm dark:border-slate-700 dark:bg-slate-800/50">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-accent">Services</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      Product development, modernization, and workforce programs tailored to your
                      process maturity.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition hover:-translate-y-[5px] hover:shadow-glow-sm dark:border-slate-700 dark:bg-slate-800/50">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-primary">Products</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      LiveBot and Xeroura AI accelerate adoption with practical, user-centered
                      interfaces.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
