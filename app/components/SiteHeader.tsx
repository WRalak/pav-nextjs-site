"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/manifesto", label: " Manifesto" },
  { href: "/ideology", label: "Ideology & Principles" },
  { href: "/vision-mission", label: "Vision & Mission" },
  { href: "/corruption", label: "Position on Corruption" },
  { href: "/leader", label: "Word from the Leader" },
];

export function SiteHeader({ headerLogo }: { headerLogo: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-purple-void/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={headerLogo}
            alt="PAV seal"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <span className="font-display text-lg tracking-tight text-white">
            People&rsquo;s Alternative Voice
          </span>
        </Link>

        <nav className="hidden flex-nowrap items-center gap-5 xl:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 whitespace-nowrap text-sm text-white/75 transition-colors hover:text-gold-bright"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/join"
            className="shrink-0 whitespace-nowrap rounded-full bg-gold-horn px-4 py-2 text-sm font-medium text-purple-void transition-colors hover:bg-gold-bright"
          >
            Join PAV
          </Link>
        </nav>

        <button
          className="flex flex-col gap-1.5 xl:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-4 bg-white" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 xl:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-white/80 hover:text-gold-bright"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/join"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-gold-horn px-4 py-2 text-center text-sm font-medium text-purple-void"
          >
            Join PAV
          </Link>
        </nav>
      )}
    </header>
  );
}
