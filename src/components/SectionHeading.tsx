import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  /** Use on dark sections (e.g. navy background) */
  theme?: "default" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "default",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  const isLight = theme === "light";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-3xl font-bold tracking-tight sm:text-4xl ${
          isLight ? "text-white" : "text-brand-navy dark:text-slate-100"
        }`}
      >
        {isLight ? (
          title
        ) : (
          <span className="text-gradient">{title}</span>
        )}
      </h2>
      {description ? (
        <div
          className={`mt-4 text-base leading-relaxed ${isLight ? "text-slate-300" : "text-slate-600 dark:text-slate-400"}`}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
}
