/** Themed validation / API error — matches site cards; avoids native browser constraint popups. */
export function FormInlineError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="rounded-2xl border border-rose-200/90 bg-rose-50/95 px-4 py-3 text-sm font-medium leading-relaxed text-rose-900 shadow-sm dark:border-brand-accent/30 dark:bg-gradient-to-br dark:from-slate-950/90 dark:to-[#050a14]/95 dark:text-rose-50 dark:shadow-card"
    >
      {message}
    </p>
  );
}
