import Image from "next/image";
import Link from "next/link";
import { logoSrc } from "@/lib/media";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-brand-navy text-slate-200 dark:border-slate-800/80 dark:bg-[#020617]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex max-w-md flex-col gap-3">
          <div className="relative h-11 w-36">
            <Image
              src={logoSrc}
              alt={`${site.name} logo`}
              fill
              className="object-contain object-left drop-shadow-[0_0_28px_rgba(0,212,216,0.35)]"
            />
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{site.tagline}.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-400 sm:items-end">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <Link href="/privacy-policy" className="text-slate-400 transition hover:text-brand-accent">
              Privacy Policy
            </Link>
            <span className="text-slate-600" aria-hidden>
              ·
            </span>
            <Link
              href="/terms-and-conditions"
              className="text-slate-400 transition hover:text-brand-accent"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
