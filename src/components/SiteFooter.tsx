import Image from "next/image";
import Link from "next/link";
import { logoSrc } from "@/lib/media";
import { navLinks, site } from "@/lib/site";

const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-brand-navy text-slate-200 dark:border-slate-800/80 dark:bg-[#020617]">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <div className="relative mb-4 h-12 w-40">
            <Image
              src={logoSrc}
              alt={`${site.name} logo`}
              fill
              className="object-contain object-left drop-shadow-[0_0_28px_rgba(0,212,216,0.35)]"
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            {site.tagline}. We engineer intelligent digital futures through AI
            products, enterprise software, and workforce solutions.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-slate-400 transition hover:text-brand-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Legal
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {legal.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-slate-400 transition hover:text-brand-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
