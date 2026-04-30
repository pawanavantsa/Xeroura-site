"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { logoSrc } from "@/lib/media";

export default function HomePage() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroHeaderProgress, setHeroHeaderProgress] = useState(0);
  const [logoTarget, setLogoTarget] = useState({ left: 52, y: 40, width: 128 });
  const [viewportSize, setViewportSize] = useState({ width: 1440, height: 900 });
  const offerings = [
    {
      title: "AI & Product Development",
      body: "Design and launch AI-powered SaaS platforms, copilots, and automation products that drive measurable outcomes.",
      tag: "Products",
      points: ["AI copilots and assistants", "Workflow automation", "SaaS platform acceleration"],
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Software Development & IT Services",
      body: "Modernize enterprise systems with secure, scalable engineering across cloud, data, integration, and operations.",
      tag: "Engineering",
      points: ["Cloud-native architecture", "Data and API integration", "Reliability and security"],
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Staff Augmentation & Workforce",
      body: "Embed vetted talent and delivery pods to close skill gaps, speed execution, and build long-term capability.",
      tag: "Workforce",
      points: ["Vetted engineering talent", "Capability pods", "Rapid onboarding model"],
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateProgress = () => {
      const distance = Math.max(container.clientHeight * 0.8, 1);
      const next = Math.max(0, Math.min(1, container.scrollTop / distance));
      setHeroHeaderProgress(next);
      window.dispatchEvent(new CustomEvent("home-logo-progress", { detail: next }));
    };

    updateProgress();
    container.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      container.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const updateLogoTarget = () => {
      const anchor = document.getElementById("home-header-logo-anchor");
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      setLogoTarget({
        left: rect.left,
        y: rect.top + rect.height / 2,
        width: rect.width,
      });
    };

    updateLogoTarget();
    const updateViewport = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateViewport();
    window.addEventListener("resize", updateLogoTarget);
    window.addEventListener("resize", updateViewport);
    return () => {
      window.removeEventListener("resize", updateLogoTarget);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const transitionProgress = Math.min(heroHeaderProgress / 0.94, 1);
  const isCompactWidth = viewportSize.width < 768;
  const startWidth = isCompactWidth ? Math.min(300, viewportSize.width * 0.82) : 920;
  const startLeft = viewportSize.width * 0.5 - startWidth / 2 - 16;
  const startY = viewportSize.height * 0.5;
  const logoWidth = startWidth - (startWidth - logoTarget.width) * transitionProgress;
  const logoLeft = startLeft + (logoTarget.left - startLeft) * transitionProgress;
  const logoY =
    startY + (logoTarget.y - startY) * transitionProgress;
  const logoOpacity = 0.3 + 0.7 * transitionProgress;
  const showTransitionLogo = heroHeaderProgress < 0.985;

  return (
    <div
      id="home-snap-container"
      ref={containerRef}
      className="h-[calc(100dvh-68px)] min-h-0 snap-y snap-proximity overflow-x-hidden overflow-y-auto overscroll-contain [touch-action:pan-y] [-webkit-overflow-scrolling:touch] md:snap-mandatory md:h-[calc(100svh-68px)]"
    >
      <div
        aria-hidden
        className="pointer-events-none fixed z-[5]"
        style={{
          left: `${logoLeft}px`,
          top: `${logoY}px`,
          width: `${logoWidth}px`,
          maxWidth: "min(920px, calc(100vw - 1rem))",
          opacity: showTransitionLogo ? logoOpacity : 0,
          transform: "translateY(-50%)",
          transition: reduced ? "opacity 0.15s linear" : "opacity 0.08s linear",
          willChange: "transform, width, opacity",
        }}
      >
        <Image src={logoSrc} alt="" width={920} height={346} className="h-auto w-full object-left object-contain" priority />
      </div>

      <section
        data-snap-section
        className="relative flex h-[calc(100dvh-68px)] max-h-[calc(100dvh-68px)] min-h-[calc(100dvh-68px)] shrink-0 snap-start snap-always items-center justify-center overflow-hidden bg-[#03070f] px-4 py-10 sm:px-6 md:h-auto md:max-h-none md:min-h-[calc(100svh-68px)] lg:px-8"
      >
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,212,216,0.24),transparent_55%)]"
          animate={reduced ? { opacity: 0.4 } : { opacity: [0.28, 0.5, 0.32] }}
          transition={{ duration: 6, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-display text-5xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Build the future of business
            <br />
            with <span className="text-white">human + AI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-200"
          >
            Xeroura combines AI product development, enterprise software delivery, and workforce
            transformation to help teams scale with speed and confidence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.24, ease: "easeOut" }}
            className="mt-8 flex justify-center"
          >
            <ButtonLink href="/contact">Build with Xeroura</ButtonLink>
          </motion.div>
        </div>
      </section>

      <section
        data-snap-section
        className="relative flex min-h-[calc(100dvh-68px)] snap-start snap-always items-start overflow-hidden bg-[#f5f7fb] px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20 md:min-h-[calc(100svh-68px)] lg:px-8 lg:pt-20"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#03070f]/30 via-[#03070f]/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-300/35 via-slate-200/15 to-transparent" />
        <motion.div
          className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-brand-accent/10 blur-3xl"
          animate={reduced ? { opacity: 0.3 } : { opacity: [0.2, 0.45, 0.25], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
          animate={reduced ? { opacity: 0.28 } : { opacity: [0.2, 0.4, 0.22], scale: [1.02, 1, 1.06] }}
          transition={{ duration: 8, delay: 0.4, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
        />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-6xl"
        >
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="text-center font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl"
          >
            How We <span className="text-brand-accent">Partner</span>
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="mx-auto mt-5 max-w-3xl text-center text-xl text-slate-500"
          >
            Xeroura partners with enterprises to launch AI products, modernize software systems,
            and scale execution capacity through integrated delivery.
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-3 md:mt-10"
          >
            {["AI-first strategy", "Enterprise-grade execution", "Scale-ready talent model"].map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                {pill}
              </span>
            ))}
          </motion.div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{
              duration: 0.65,
              delay: 0.16,
              ease: "easeOut",
              staggerChildren: reduced ? 0 : 0.1,
              delayChildren: reduced ? 0 : 0.08,
            }}
            className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3"
          >
            {offerings.map((item, idx) => (
              <motion.article
                key={item.title}
                initial={reduced ? false : { opacity: 0, y: 34, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{
                  duration: 0.6,
                  delay: reduced ? 0 : 0.16 + idx * 0.08,
                  ease: "easeOut",
                }}
                whileHover={
                  reduced
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.01,
                        boxShadow: "0 24px 55px rgba(15,23,42,0.14)",
                      }
                }
                className="group relative min-h-[380px] overflow-hidden rounded-3xl border border-white/15 bg-slate-950 p-7 shadow-[0_24px_60px_rgba(2,8,23,0.35)] transition-shadow md:min-h-[420px]"
                style={{ backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/88 to-slate-900/70 transition-opacity duration-300 group-hover:opacity-90" />
                <div className="relative z-10">
                  <span className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
                    {item.tag}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-200/90">{item.body}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-200/90">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section
        data-snap-section
        className="flex min-h-[calc(100dvh-68px)] snap-start snap-always items-center overflow-x-hidden bg-white px-4 py-12 sm:px-6 md:min-h-[calc(100svh-68px)] lg:px-8"
      >
        <div className="mx-auto grid w-full max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)] lg:items-start lg:gap-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.35 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduced ? 0 : 0.11,
                  delayChildren: reduced ? 0 : 0.05,
                },
              },
            }}
            className="max-w-2xl text-left lg:max-w-none lg:pr-4 lg:pt-4"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: reduced ? { duration: 0.2 } : { duration: 0.55, ease: "easeOut" },
                },
              }}
              className="text-base font-semibold uppercase tracking-[0.18em] text-brand-accent sm:text-lg"
            >
              Delivery shift
            </motion.p>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: reduced ? { duration: 0.2 } : { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="mt-4 font-display text-5xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-[3.35rem] lg:leading-[1.06]"
            >
              <span className="text-brand-accent">AI Changing</span>
              <br />
              Software Development
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: reduced ? { duration: 0.2 } : { duration: 0.58, ease: "easeOut" },
                },
              }}
              className="mt-6 text-xl leading-relaxed text-slate-600 sm:text-[1.35rem] sm:leading-relaxed"
            >
              Generative models sit beside engineers, support, and product—so roadmaps, quality, and
              operating cadence all need to move together. Xeroura helps you modernize without losing
              velocity.
            </motion.p>
            <motion.ul
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: reduced ? { duration: 0.2 } : { duration: 0.55, ease: "easeOut" },
                },
              }}
              className="mt-8 space-y-4 border-l-2 border-slate-300 pl-6 text-slate-700"
            >
              <li className="text-lg leading-snug sm:text-xl sm:leading-snug">
                <span className="font-semibold text-slate-900">Operational AI</span> — copilots and
                automation embedded in real workflows, not slide decks.
              </li>
              <li className="text-lg leading-snug sm:text-xl sm:leading-snug">
                <span className="font-semibold text-slate-900">Engineering velocity</span> — cloud,
                data, and integration patterns that keep releases predictable.
              </li>
              <li className="text-lg leading-snug sm:text-xl sm:leading-snug">
                <span className="font-semibold text-slate-900">Delivery model</span> — hybrid pods
                that blend product, platform, and talent so capacity matches demand.
              </li>
            </motion.ul>
          </motion.div>

          <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:ml-auto lg:max-w-[480px]">
            <div className="relative aspect-[4/6] w-full sm:aspect-[5/7]">
              {[
                {
                  src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
                  alt: "Generative AI and neural abstraction",
                  className: "left-0 top-0 z-[1] w-[80%] shadow-[0_20px_50px_rgba(15,23,42,0.12)]",
                  restRotate: -2,
                },
                {
                  src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
                  alt: "Developer workspace and code",
                  className: "left-[12%] top-[22%] z-[2] w-[78%] shadow-[0_24px_55px_rgba(15,23,42,0.14)]",
                  restRotate: 1.5,
                },
                {
                  src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
                  alt: "Team collaboration and delivery",
                  className: "left-[22%] top-[44%] z-[3] w-[76%] shadow-[0_28px_60px_rgba(15,23,42,0.16)]",
                  restRotate: -0.5,
                },
              ].map((card, idx) => (
                <motion.div
                  key={card.alt}
                  initial={{
                    opacity: 0,
                    x: reduced ? 0 : 36 + idx * 8,
                    y: reduced ? 0 : 20 + idx * 12,
                    rotate: reduced ? 0 : idx === 0 ? -6 : idx === 1 ? 5 : -4,
                    scale: 0.94,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: reduced ? 0 : card.restRotate,
                    scale: 1,
                  }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 0.9,
                    delay: reduced ? 0 : 0.08 + idx * 0.12,
                  }}
                  className={`absolute overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 ${card.className}`}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 480px"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        data-snap-section
        className="flex min-h-[calc(100dvh-68px)] snap-start snap-always items-center overflow-x-hidden bg-[#05070f] px-4 py-12 sm:px-6 md:min-h-[calc(100svh-68px)] lg:px-8"
      >
        <div className="mx-auto grid w-full max-w-6xl items-start gap-12 lg:grid-cols-[minmax(260px,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14">
          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:mx-0 lg:mr-auto">
            <div className="relative aspect-[3/5] w-full sm:aspect-[10/17]">
              {[
                {
                  src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
                  alt: "Engineering team collaborating on product delivery",
                  className: "left-0 top-0 z-[1] w-[72%] shadow-[0_22px_55px_rgba(0,0,0,0.45)] ring-1 ring-white/10",
                  restRotate: -2,
                },
                {
                  src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
                  alt: "Cross-functional team planning engineering delivery",
                  className: "left-[16%] top-[26%] z-[2] w-[72%] shadow-[0_28px_65px_rgba(0,0,0,0.5)] ring-1 ring-white/10",
                  restRotate: 1.5,
                },
              ].map((card, idx) => (
                <motion.div
                  key={card.alt}
                  initial={{
                    opacity: 0,
                    x: reduced ? 0 : -28 - idx * 10,
                    y: reduced ? 0 : 24 + idx * 10,
                    rotate: reduced ? 0 : idx === 0 ? 5 : -4,
                    scale: 0.94,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: reduced ? 0 : card.restRotate,
                    scale: 1,
                  }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{
                    type: "spring",
                    stiffness: 105,
                    damping: 21,
                    mass: 0.88,
                    delay: reduced ? 0 : 0.06 + idx * 0.12,
                  }}
                  className={`absolute overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 ${card.className}`}
                >
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 1024px) 45vw, 360px"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduced ? 0 : 0.12,
                  delayChildren: reduced ? 0 : 0.06,
                },
              },
            }}
            className="text-left lg:max-w-none lg:pl-2"
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: reduced ? { duration: 0.2 } : { duration: 0.62, ease: "easeOut" },
                },
              }}
              className="font-display text-4xl font-bold leading-tight text-slate-100 sm:text-5xl lg:text-[3.1rem] lg:leading-[1.08]"
            >
              <span className="text-brand-accent">Xeroura</span> helps you execute
              <br />
              AI-first delivery
              <br />
              with confidence
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: reduced ? { duration: 0.2 } : { duration: 0.58, ease: "easeOut" },
                },
              }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              We align strategy, engineering, and workforce capability so your teams can deliver
              continuously in an AI-native world.
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: reduced ? { duration: 0.2 } : { duration: 0.55, ease: "easeOut" },
                },
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <ButtonLink href="/services">Explore Services</ButtonLink>
              <Link
                href="/products"
                className="inline-flex items-center rounded-full border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition-all hover:-translate-y-1 hover:border-brand-accent hover:text-brand-accent"
              >
                View Products
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
