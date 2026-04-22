"use client";

import { motion } from "framer-motion";
import { techStack } from "@/lib/tech-stack";

const row = [...techStack, ...techStack, ...techStack];

export function TechMarquee() {
  return (
    <div className="relative mt-10 overflow-hidden py-2" aria-hidden={false}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-slate-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-slate-950" />
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="shrink-0 rounded-full border border-slate-200/90 bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm ring-1 ring-slate-100/80 dark:border-slate-600/80 dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700/80"
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
