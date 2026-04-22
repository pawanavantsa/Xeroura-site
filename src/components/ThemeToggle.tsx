"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 text-brand-navy shadow-sm transition hover:border-brand-accent/50 hover:text-brand-primary dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-brand-accent/60 dark:hover:text-brand-accent"
      aria-label={
        !mounted ? "Toggle color theme" : isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      title={!mounted ? "Theme" : isDark ? "Light mode" : "Dark mode"}
    >
      {!mounted ? (
        <span className="block h-5 w-5 rounded-full bg-slate-200/80 dark:bg-slate-700" />
      ) : (
        <motion.span
          key={isDark ? "dark" : "light"}
          initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="flex h-5 w-5 items-center justify-center"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      )}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M21 14.5A8.5 8.5 0 019.5 3a8.4 8.4 0 003.5 15.5 8.5 8.5 0 008-4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
