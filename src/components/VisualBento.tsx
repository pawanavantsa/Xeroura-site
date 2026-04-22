"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { unsplash } from "@/lib/media";

const tiles = [
  {
    title: "Collaboration at scale",
    subtitle: "Hybrid squads across product, delivery, and support.",
    src: unsplash.heroCollaboration,
    alt: "Team collaborating around laptops in a modern office",
    span: "md:col-span-2 md:row-span-1",
    height: "min-h-[220px] sm:min-h-[260px]",
  },
  {
    title: "AI-native workflows",
    subtitle: "Automation that respects human judgment.",
    src: unsplash.aiNeural,
    alt: "Abstract visualization suggesting AI and neural networks",
    span: "md:col-span-1",
    height: "min-h-[200px]",
  },
  {
    title: "Secure infrastructure",
    subtitle: "Cloud-ready patterns you can operate.",
    src: unsplash.cloudServer,
    alt: "Earth at night from space illustrating global connectivity",
    span: "md:col-span-1",
    height: "min-h-[200px]",
  },
  {
    title: "Engineering craft",
    subtitle: "From prototype to production with clarity.",
    src: unsplash.codingDesk,
    alt: "Laptop on a desk with code on screen",
    span: "md:col-span-2",
    height: "min-h-[200px] sm:min-h-[220px]",
  },
] as const;

export function VisualBento() {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
      {tiles.map((tile, i) => (
        <motion.div
          key={tile.title}
          className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 shadow-card dark:border-slate-700/90 ${tile.span} ${tile.height}`}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={tile.src}
            alt={tile.alt}
            fill
            className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="font-display text-lg font-semibold text-white">{tile.title}</p>
            <p className="mt-1 max-w-md text-sm text-slate-200/90">{tile.subtitle}</p>
          </div>
          <motion.span
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-accent/25 blur-2xl"
            animate={{ opacity: [0.35, 0.65, 0.4], scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
}
