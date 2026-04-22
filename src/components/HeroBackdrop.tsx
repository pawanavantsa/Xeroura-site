"use client";

import { motion } from "framer-motion";

const orbs = [
  { className: "left-[10%] top-[18%] h-72 w-72 bg-brand-primary/25 blur-3xl", delay: 0 },
  { className: "right-[5%] top-[8%] h-80 w-80 bg-brand-accent/30 blur-3xl", delay: 0.4 },
  { className: "left-[35%] bottom-[5%] h-64 w-64 bg-cyan-300/20 blur-3xl", delay: 0.8 },
];

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${o.className}`}
          initial={{ opacity: 0.4, scale: 0.92 }}
          animate={{
            opacity: [0.35, 0.55, 0.4],
            scale: [0.95, 1.05, 0.98],
            x: [0, i % 2 === 0 ? 18 : -14, 0],
            y: [0, i % 2 === 0 ? -12 : 16, 0],
          }}
          transition={{
            duration: 14 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: o.delay,
          }}
        />
      ))}
      <Particles />
    </div>
  );
}

function Particles() {
  const dots = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    top: `${(i * 23) % 100}%`,
    size: 2 + (i % 3),
    duration: 10 + (i % 7),
    delay: (i % 10) * 0.35,
  }));

  return (
    <>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-brand-accent/40 shadow-[0_0_12px_rgba(0,212,216,0.45)]"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
          }}
          animate={{ opacity: [0.15, 0.85, 0.2], y: [0, -18, 0] }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: d.delay,
          }}
        />
      ))}
    </>
  );
}
