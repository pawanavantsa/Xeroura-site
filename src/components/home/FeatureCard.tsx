import type { ReactNode } from "react";
import { MotionCard } from "@/components/MotionCard";

type FeatureCardProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function FeatureCard({ children, delay = 0, className = "" }: FeatureCardProps) {
  return (
    <MotionCard delay={delay} className={className}>
      <article className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-[5px] hover:shadow-glow-sm dark:border-slate-800 dark:bg-slate-900/60">
        {children}
      </article>
    </MotionCard>
  );
}
