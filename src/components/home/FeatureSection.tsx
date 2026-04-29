import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

type FeatureSectionProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  children: ReactNode;
  className?: string;
};

export function FeatureSection({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: FeatureSectionProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
