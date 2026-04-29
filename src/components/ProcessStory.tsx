"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { MotionCard } from "@/components/MotionCard";
import { Reveal } from "@/components/Reveal";

type Step = {
  title: string;
  description: string;
  impact: string;
};

type ProcessStoryProps = {
  steps: readonly Step[];
};

export function ProcessStory({ steps }: ProcessStoryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const lineHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[0.35fr_1fr]">
      <div className="lg:sticky lg:top-28 lg:h-[26rem]">
        <div className="relative h-full rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-card dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Transformation Flow
          </p>
          <h3 className="mt-2 font-display text-xl font-bold text-brand-navy dark:text-slate-100">
            How we improve AI process maturity
          </h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Each stage closes a specific operational gap so your teams can move from experiments
            to repeatable impact.
          </p>
          <div className="relative mt-6 h-36 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <div className="absolute bottom-0 left-8 top-0 w-px bg-slate-200 dark:bg-slate-700" />
            <motion.div
              className="absolute bottom-0 left-8 top-0 w-px bg-gradient-to-b from-brand-primary via-brand-accent to-cyan-200"
              style={reduced ? undefined : { height: lineHeight }}
            />
            <ol className="space-y-4 px-6 py-4">
              {steps.map((step, index) => (
                <li key={step.title} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-brand-accent/40 bg-white text-xs font-semibold text-brand-primary dark:bg-slate-900">
                    {index + 1}
                  </span>
                  {step.title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        {steps.map((step, index) => (
          <Reveal key={step.title} delayMs={index * 90}>
            <MotionCard className="h-full">
              <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900/60">
                <div className="mb-4 inline-flex rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary dark:bg-brand-primary/20 dark:text-cyan-200">
                  Stage {index + 1}
                </div>
                <h4 className="font-display text-xl font-semibold text-brand-navy dark:text-slate-100">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
                <p className="mt-4 border-l-2 border-brand-accent pl-3 text-sm font-medium text-slate-800 dark:text-slate-200">
                  {step.impact}
                </p>
              </article>
            </MotionCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
