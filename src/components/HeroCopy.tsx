"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/site";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroCopy() {
  return (
    <motion.div
      className="flex-1 text-center lg:text-left"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={item}
        className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary"
      >
        {site.legalName}
      </motion.p>
      <motion.h1
        variants={item}
        className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-brand-navy dark:text-slate-100 sm:text-5xl lg:text-[3.25rem]"
      >
        Engineering intelligent digital futures
      </motion.h1>
      <motion.p
        variants={item}
        className="mt-3 text-lg font-medium text-brand-primary/90"
      >
        {site.tagline}
      </motion.p>
      <motion.p
        variants={item}
        className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 lg:mx-0"
      >
        {site.legalName} is a hybrid IT company delivering AI-driven products, enterprise-grade
        software solutions, and workforce services that empower businesses to scale with
        confidence.
      </motion.p>
      <motion.div
        variants={item}
        className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
      >
        <ButtonLink href="/contact">Get in Touch</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          Explore services
        </ButtonLink>
      </motion.div>
    </motion.div>
  );
}
