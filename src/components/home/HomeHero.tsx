"use client";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HeroCopy } from "@/components/HeroCopy";
import { HeroLogo } from "@/components/HeroLogo";
import { StoryDeviceFrame } from "@/components/StoryDeviceFrame";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-hero-mesh dark:bg-hero-mesh-dark">
      <HeroBackdrop />
      <div className="pointer-events-none absolute inset-0 grid-glow opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
          <HeroLogo />
          <HeroCopy />
        </div>
        <StoryDeviceFrame />
      </div>
    </section>
  );
}
