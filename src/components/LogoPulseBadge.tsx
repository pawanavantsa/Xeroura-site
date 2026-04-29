"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { logoSrc } from "@/lib/media";

export function LogoPulseBadge() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto h-16 w-32 sm:mx-0 sm:h-20 sm:w-40"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute -inset-3 rounded-full bg-gradient-to-r from-brand-primary/20 via-brand-accent/25 to-cyan-200/20 blur-2xl"
        animate={reduced ? { opacity: 0.45 } : { opacity: [0.35, 0.7, 0.4], scale: [0.95, 1.08, 1] }}
        transition={{ duration: 5, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative h-full w-full"
        animate={reduced ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={logoSrc}
          alt="Xeroura animated logo accent"
          fill
          className="object-contain drop-shadow-[0_10px_28px_rgba(10,61,145,0.22)] dark:drop-shadow-[0_12px_34px_rgba(0,212,216,0.28)]"
          sizes="160px"
        />
      </motion.div>
    </motion.div>
  );
}
