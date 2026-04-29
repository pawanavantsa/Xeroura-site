"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const cards = [
  {
    title: "For product teams",
    points: ["Operationalize AI ideas quickly", "Build model-backed workflows", "Ship measurable product value"],
  },
  {
    title: "For business leaders",
    points: ["Align AI with business priorities", "Improve team adoption and trust", "Scale with governance in place"],
  },
] as const;

const flowBlocks = [
  "Data audit",
  "Workflow mapping",
  "AI architecture",
  "Model integration",
  "Human-in-loop controls",
  "Automation rollout",
  "Adoption training",
  "Optimization loop",
] as const;

export function StoryDeviceFrame() {
  const reduced = useReducedMotion();

  return (
    <Reveal emphasis>
      <div className="relative mt-10 overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-white p-3 shadow-[0_20px_70px_rgba(5,28,59,0.15)] dark:border-slate-700 dark:bg-slate-900">
        <div className="rounded-[1.7rem] border border-slate-200/70 bg-slate-50/80 px-6 pb-8 pt-10 dark:border-slate-700 dark:bg-slate-950/80 sm:px-10">
          <motion.div
            className="absolute inset-x-0 -top-14 mx-auto h-28 w-[70%] rounded-full bg-gradient-to-r from-brand-primary/25 via-brand-accent/30 to-cyan-200/20 blur-3xl"
            animate={reduced ? { opacity: 0.35 } : { opacity: [0.3, 0.55, 0.35], scale: [0.98, 1.04, 1] }}
            transition={{ duration: 7, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
          />

          <div className="relative text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Choose your AI pathway
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold text-brand-navy dark:text-slate-100 sm:text-4xl">
              From ambition to operating advantage
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              We design AI process systems for both engineering execution and business adoption.
            </p>
          </div>

          <div className="relative mt-8 grid gap-4 md:grid-cols-2">
            {cards.map((card, index) => (
              <motion.article
                key={card.title}
                className="rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-[#031528] via-[#03203b] to-[#042847] p-5 text-slate-100 shadow-[0_14px_40px_rgba(0,0,0,0.28)]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduced ? undefined : { y: -4 }}
              >
                <h4 className="font-display text-xl font-semibold">{card.title}</h4>
                <ul className="mt-3 space-y-2 text-sm text-cyan-100/90">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <SeamlessBlockRail reduced={!!reduced} items={flowBlocks} speed={24} />
            <SeamlessBlockRail reduced={!!reduced} items={[...flowBlocks].reverse()} speed={28} reverse />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function SeamlessBlockRail({
  items,
  speed,
  reduced,
  reverse = false,
}: {
  items: readonly string[];
  speed: number;
  reduced: boolean;
  reverse?: boolean;
}) {
  const repeated = [...items, ...items];

  return (
    <div className="relative overflow-hidden rounded-xl border border-cyan-200/20 bg-[#041a31] py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#041a31] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#041a31] to-transparent" />
      <motion.div
        className="flex w-max gap-2 px-2"
        animate={
          reduced
            ? undefined
            : reverse
              ? { x: ["-50%", "0%"] }
              : { x: ["0%", "-50%"] }
        }
        transition={{
          duration: speed,
          repeat: reduced ? 0 : Infinity,
          ease: "linear",
        }}
      >
        {repeated.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="shrink-0 rounded-md border border-cyan-300/25 bg-gradient-to-r from-cyan-400/15 to-brand-primary/20 px-3 py-1.5 text-xs font-medium text-cyan-100"
          >
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
