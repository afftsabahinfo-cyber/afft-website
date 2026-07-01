import { AfftBrand } from "@/components/AfftBrand";
import { makeWhatsappLink, whatsapp } from "@/lib/rent-it-data";

const navLinks = [
  { label: "Camping", href: "/camping" },
  { label: "Rent It", href: "/rent-it" },
  { label: "Private Tours", href: "/private-tours" },
  { label: "Car Rental", href: "/car-rental" },
  { label: "About", href: "/about" },
  { label: "Stories", href: "/customer-stories" },
  { label: "FAQ", href: "/faq" },
];

export function SiteTopNav() {
  return (
    <nav className="relative z-50 flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-white/10 bg-[#10140F]/88 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur md:px-5">
      <AfftBrand
        href="/"
        className="shrink-0"
        markClassName="h-10 w-10 md:h-12 md:w-12"
        labelClassName="hidden text-sm tracking-[0.22em] sm:block md:text-base"
      />

      <div className="hidden flex-wrap gap-5 text-sm text-white/80 lg:flex">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-white">
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <a
          href="/zh"
          className="rounded-full border border-white/20 px-4 py-3 text-sm font-bold text-white"
        >
          ZH
        </a>
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#F3922B] px-5 py-3 text-sm font-bold text-black"
        >
          WhatsApp
        </a>
      </div>
    </nav>
  );
}

export function SectionHeading({
  small,
  big,
  text,
}: {
  small: string;
  big: string;
  text?: string;
}) {
  return (
    <div className="mb-10 max-w-4xl">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
        {small}
      </p>
      <h2 className="text-4xl font-bold md:text-5xl">{big}</h2>
      {text ? <p className="mt-4 text-lg text-white/70">{text}</p> : null}
    </div>
  );
}

export function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-white/70">{text}</p>
    </div>
  );
}

export function FaqCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-bold">{question}</h3>
      <p className="mt-3 text-white/70">{answer}</p>
    </article>
  );
}

export function PageFinalCta({
  title,
  text,
  message,
  buttonLabel = "WhatsApp AFFT",
}: {
  title: string;
  text: string;
  message: string;
  buttonLabel?: string;
}) {
  return (
    <section className="rounded-[2rem] bg-[#F3922B] p-8 text-black md:p-12">
      <h2 className="text-4xl font-bold md:text-5xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-lg">{text}</p>
      <a
        href={makeWhatsappLink(message)}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex rounded-full bg-black px-8 py-4 font-bold text-white"
      >
        {buttonLabel}
      </a>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/30 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">
        <div>
          <AfftBrand
            href="/"
            className="gap-4"
            markClassName="h-14 w-14"
            labelClassName="text-lg tracking-[0.26em] md:text-xl"
          />
          <p className="mt-3 text-white/70">
            Sabah outdoor experiences, camping packages, Rent It gear and
            private travel support.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Explore</h4>
          <div className="grid gap-2 text-white/70">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Contact</h4>
          <p className="text-white/70">WhatsApp</p>
          <a href={whatsapp} className="text-[#F3922B]">
            +60 11-1159 8920
          </a>
          <p className="mt-3 text-white/70">afft.sabah.info@gmail.com</p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Company Information</h4>
          <p className="text-white/70">ADVENTURE FRONTIER FREEDOM TRAVEL</p>
          <p className="text-white/70">Registered 2024</p>
          <p className="text-white/70">(202401014720 (1560570-W))</p>
          <p className="text-white/70">KPL/LN: 12014</p>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-white/40">
        Registered 2024 · Copyright 2024-2026 AFFT.CLUB. All Rights Reserved.
      </div>
    </footer>
  );
}
