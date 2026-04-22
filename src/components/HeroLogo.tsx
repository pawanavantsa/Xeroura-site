"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { logoSrc } from "@/lib/media";
import { site } from "@/lib/site";

export function HeroLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 0.96]);

  return (
    <motion.div
      ref={ref}
      className="relative w-full max-w-md lg:max-w-lg"
      style={{ y, rotate, scale }}
    >
      <motion.div
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-primary/25 via-transparent to-brand-accent/30 blur-2xl"
        animate={{ opacity: [0.55, 0.85, 0.6], scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative aspect-[5/3] w-full"
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={logoSrc}
            alt={`${site.name} — infinity mark blending engineering structure with intelligent energy`}
            fill
            priority
            className="object-contain drop-shadow-[0_20px_50px_rgba(10,61,145,0.25)] dark:drop-shadow-[0_24px_60px_rgba(0,212,216,0.3)]"
            sizes="(min-width: 1024px) 36rem, 90vw"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
