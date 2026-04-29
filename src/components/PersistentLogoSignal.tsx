"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { logoSrc } from "@/lib/media";

/**
 * Persistent brand signal that remains visible while scrolling.
 * It is intentionally subtle so content remains primary.
 */
export function PersistentLogoSignal() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  const baseOpacity = useTransform(smooth, [0, 0.08, 0.7, 1], [0.22, 0.46, 0.5, 0.34]);
  const y = useTransform(smooth, [0, 1], [0, -26]);
  const rotate = useTransform(smooth, [0, 1], [0, 14]);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.92, 1, 0.95]);
  const glowOpacity = useTransform(smooth, [0, 0.4, 1], [0.2, 0.45, 0.3]);
  const glow = useMotionTemplate`0 0 70px rgba(0, 212, 216, ${glowOpacity})`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed bottom-6 right-4 z-30 hidden sm:block"
      style={reduced ? undefined : { y }}
    >
      <motion.div
        className="relative h-20 w-36 md:h-24 md:w-44"
        style={
          reduced
            ? { opacity: 0.34 }
            : {
                opacity: baseOpacity,
                rotate,
                scale,
                filter: glow,
              }
        }
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary/12 via-brand-accent/18 to-cyan-200/10 blur-2xl"
          animate={reduced ? { opacity: 0.35 } : { opacity: [0.22, 0.5, 0.28], scale: [0.96, 1.06, 1] }}
          transition={{ duration: 6, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
        />
        <Image
          src={logoSrc}
          alt=""
          fill
          className="object-contain"
          sizes="176px"
          priority={false}
        />
      </motion.div>
    </motion.div>
  );
}
