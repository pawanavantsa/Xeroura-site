"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** Slightly stronger motion for hero / feature blocks */
  emphasis?: boolean;
  direction?: "up" | "down" | "left" | "right";
};

function createVariants(
  emphasis: boolean,
  direction: NonNullable<RevealProps["direction"]>,
  reduced: boolean,
): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: (delay: number) => ({
        opacity: 1,
        transition: { duration: 0.2, delay: delay / 1000 },
      }),
    };
  }

  const distance = emphasis ? 52 : 40;
  const x =
    direction === "left" ? distance : direction === "right" ? -distance : 0;
  const y =
    direction === "up" ? distance : direction === "down" ? -distance : 0;

  return {
    hidden: {
      opacity: 0,
      x,
      y,
      filter: emphasis ? "blur(8px)" : "blur(6px)",
    },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: emphasis ? 0.9 : 0.72,
        delay: delay / 1000,
        ease: "easeOut",
      },
    }),
  };
}

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  emphasis = false,
  direction = "up",
}: RevealProps) {
  const reduced = Boolean(useReducedMotion());

  return (
    <motion.div
      className={className}
      custom={delayMs}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px -12% 0px", amount: 0.2 }}
      variants={createVariants(emphasis, direction, reduced)}
    >
      {children}
    </motion.div>
  );
}
