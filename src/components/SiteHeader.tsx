"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { logoSrc } from "@/lib/media";
import { navLinks, site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [homeScrollProgress, setHomeScrollProgress] = useState(0);
  /** Desktop/tablet: hide header logo while hero floating logo is visible; mobile keeps header readable. */
  const [isMdUp, setIsMdUp] = useState(false);
  const isHome = pathname === "/";
  const hideLogoOnHero = isHome && homeScrollProgress < 0.82 && isMdUp;

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsMdUp(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setHomeScrollProgress(1);
      return;
    }

    const onProgress = (event: Event) => {
      const detail = (event as CustomEvent<number>).detail;
      if (typeof detail === "number") {
        setHomeScrollProgress(detail);
      }
    };

    window.addEventListener("home-logo-progress", onProgress as EventListener);
    return () => window.removeEventListener("home-logo-progress", onProgress as EventListener);
  }, [isHome]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <motion.span
            id="home-header-logo-anchor"
            className="relative h-10 w-28 shrink-0 sm:h-11 sm:w-32"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            animate={{ opacity: homeScrollProgress < 0.985 && isHome ? 0 : 1, scale: hideLogoOnHero ? 0.94 : 1 }}
            style={{ visibility: hideLogoOnHero ? "hidden" : "visible" }}
          >
            <Image
              src={logoSrc}
              alt={`${site.name} logo`}
              fill
              className="object-contain object-left drop-shadow-[0_6px_20px_rgba(10,61,145,0.2)] dark:drop-shadow-[0_6px_28px_rgba(0,212,216,0.35)]"
              priority
              sizes="128px"
            />
          </motion.span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span
              className={`truncate font-display font-bold text-brand-navy transition-all dark:text-slate-100 ${
                hideLogoOnHero ? "text-lg sm:text-xl" : "text-sm sm:text-base"
              }`}
            >
              {site.name}
            </span>
            <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:inline">
              AI-first products & services
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-brand-primary dark:text-brand-accent"
                    : "text-slate-600 hover:text-brand-accent dark:text-slate-400 dark:hover:text-brand-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full bg-gradient-to-r from-brand-primary to-brand-accent px-4 py-2 text-sm font-semibold text-white shadow-glow-sm transition hover:shadow-glow md:inline-flex"
          >
            Get in Touch
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-brand-navy dark:border-slate-600 dark:text-slate-200 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 rounded bg-brand-primary transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 rounded bg-brand-primary transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 rounded bg-brand-primary transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-slate-100 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 md:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-primary dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-brand-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
