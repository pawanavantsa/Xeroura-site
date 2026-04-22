"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** Slightly stronger motion for hero / feature blocks */
  emphasis?: boolean;
};

function createVariants(emphasis: boolean): Variants {
  return {
    hidden: {
      opacity: 0,
      y: emphasis ? 36 : 22,
      filter: emphasis ? "blur(8px)" : "blur(6px)",
    },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: emphasis ? 0.75 : 0.6,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };
}

export function Reveal({ children, className = "", delayMs = 0, emphasis = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      custom={delayMs}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px -12% 0px", amount: 0.2 }}
      variants={createVariants(emphasis)}
    >
      {children}
    </motion.div>
  );
}
