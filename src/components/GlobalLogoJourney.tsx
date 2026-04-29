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
import { usePathname } from "next/navigation";
import { logoSrc } from "@/lib/media";

export function GlobalLogoJourney() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 75, damping: 24 });

  // Meaningful movement: from structured/start to dynamic/scale as users scroll.
  const x = useTransform(progress, [0, 0.35, 0.7, 1], ["-8%", "6%", "15%", "22%"]);
  const y = useTransform(progress, [0, 0.4, 1], ["2%", "9%", "18%"]);
  const rotate = useTransform(progress, [0, 0.45, 1], [-7, 1, 8]);
  const scale = useTransform(progress, [0, 0.5, 1], [1.04, 0.96, 0.9]);
  const glowStrength = useTransform(progress, [0, 0.5, 1], [0.12, 0.3, 0.18]);
  const glow = useMotionTemplate`0 0 90px rgba(0, 212, 216, ${glowStrength})`;

  const onHome = pathname === "/";
  const baseOpacity = onHome ? 0.2 : 0.13;
  const opacityByScroll = useTransform(progress, [0, 1], [baseOpacity + 0.03, baseOpacity]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-[4.4rem] z-0 hidden h-[70vh] overflow-hidden md:block"
      style={
        reduced
          ? { opacity: baseOpacity }
          : { opacity: opacityByScroll }
      }
    >
      <motion.div
        className="relative mx-auto h-[32rem] w-[48rem] max-w-none lg:h-[38rem] lg:w-[56rem]"
        style={
          reduced
            ? undefined
            : {
                x,
                y,
                rotate,
                scale,
                filter: glow,
              }
        }
      >
        <motion.div
          className="absolute -inset-10 rounded-full bg-gradient-to-r from-brand-primary/15 via-brand-accent/20 to-cyan-100/5 blur-3xl"
          animate={reduced ? { opacity: 0.3 } : { opacity: [0.22, 0.5, 0.3], scale: [0.96, 1.06, 1] }}
          transition={{ duration: 8, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
        />
        <Image
          src={logoSrc}
          alt=""
          fill
          className="object-contain"
          sizes="900px"
          priority={false}
        />
      </motion.div>
    </motion.div>
  );
}
