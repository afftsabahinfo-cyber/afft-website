import { navItems } from '@/lib/site-data';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-afft-ink/70 backdrop-blur-xl">
      <div className="container-afft flex h-16 items-center justify-between text-white">
        <a href="#home" className="flex items-center gap-3 font-bold tracking-[0.22em]">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-afft-orange text-sm text-white">A</span>
          AFFT.CLUB
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-white/80 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">{item.label}</a>
          ))}
        </nav>
        <a href="https://wa.me/60100000000" className="rounded-full bg-afft-orange px-4 py-2 text-sm font-bold text-white shadow-soft transition hover:scale-105">
          WhatsApp
        </a>
      </div>
    </header>
  );
}
