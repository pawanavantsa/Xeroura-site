"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Softer hover glow on dark sections (e.g. culture band) */
  tone?: "light" | "dark";
};

export function MotionCard({
  children,
  className = "",
  delay = 0,
  tone = "light",
}: MotionCardProps) {
  const reduced = useReducedMotion();
  const hoverShadow =
    tone === "dark"
      ? "0 20px 50px rgba(0, 212, 216, 0.22)"
      : "0 24px 60px rgba(0, 212, 216, 0.18)";

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, rotateX: -6 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        reduced
          ? undefined
          : {
              y: -6,
              boxShadow: hoverShadow,
              transition: { duration: 0.25 },
            }
      }
      style={{ transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
