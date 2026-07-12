"use client";

import { useState } from "react";

export type MobileNavLink = { label: string; href: string };

export function MobileNav({ links, label = "Menu" }: { links: MobileNavLink[]; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-site-menu"
        onClick={() => setOpen((value) => !value)}
        className="rounded-full border border-white/20 px-4 py-3 text-sm font-bold text-white"
      >
        {open ? "Close" : label}
      </button>
      {open ? (
        <div id="mobile-site-menu" className="absolute right-0 top-14 z-[70] grid min-w-64 gap-1 rounded-3xl border border-white/15 bg-[#10140F] p-3 shadow-2xl">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
