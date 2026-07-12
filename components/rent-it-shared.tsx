import { AfftBrand } from "@/components/AfftBrand";
import { MobileNav } from "@/components/MobileNav";
import type { CatalogItem, TentShowcaseItem } from "@/lib/rent-it-data";
import {
  getRentItItemImage,
  makeWhatsappLink,
  normalizeRentItTitle,
  whatsapp,
} from "@/lib/rent-it-data";

const rentItNavLinks = [
  { label: "Camping", href: "/camping" },
  { label: "Camp Spots", href: "/camping-spots" },
  { label: "Rent It", href: "/rent-it" },
  { label: "Private Tours", href: "/private-tours" },
  { label: "Car Rental", href: "/car-rental" },
  { label: "About", href: "/about" },
  { label: "Stories", href: "/customer-stories" },
  { label: "FAQ", href: "/faq" },
];

export function RentItBackLink({
  href = "/",
  label = "Back to AFFT.CLUB",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <nav className="relative z-50 flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-white/10 bg-[#10140F]/88 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur md:px-5">
      <AfftBrand
        href={href}
        className="shrink-0"
        markClassName="h-10 w-10 md:h-12 md:w-12"
        ariaLabel={label}
        label="AFFT.CLUB"
        labelClassName="hidden text-sm tracking-[0.18em] sm:block md:text-base"
      />

      <div className="hidden flex-wrap gap-5 text-sm text-white/80 lg:flex">
        {rentItNavLinks.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-white">
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <MobileNav links={rentItNavLinks} />
        <a
          href="/zh/rent-it"
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

export function RentItInfoCard({
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

export function RentItInlineCta({
  title = "Need help choosing gear?",
  text = "Talk to AFFT and get the right setup for your trip, content plan or campsite mood.",
  buttonLabel = "WhatsApp AFFT",
  message,
  secondaryHref,
  secondaryLabel,
}: {
  title?: string;
  text?: string;
  buttonLabel?: string;
  message: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#182015] p-8 md:flex md:items-center md:justify-between md:gap-8">
      <div>
        <h3 className="text-2xl font-bold md:text-3xl">{title}</h3>
        <p className="mt-3 max-w-2xl text-white/70">{text}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
        <a
          href={makeWhatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
        >
          {buttonLabel}
        </a>
        {secondaryHref && secondaryLabel ? (
          <a
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-bold text-white"
          >
            {secondaryLabel}
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function RentItCatalogTable({
  items,
}: {
  items: CatalogItem[];
}) {
  return (
    <div className="overflow-x-auto pb-44">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-white/10 text-white/70">
          <tr>
            <th className="px-4 py-4 font-semibold uppercase tracking-[0.2em]">Product</th>
            <th className="px-4 py-4 font-semibold uppercase tracking-[0.2em]">1 Day</th>
            <th className="px-4 py-4 font-semibold uppercase tracking-[0.2em]">2 Days</th>
            <th className="px-4 py-4 font-semibold uppercase tracking-[0.2em]">3 Days</th>
            <th className="px-4 py-4 font-semibold uppercase tracking-[0.2em]">Best For</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.title} className="border-b border-white/5 align-top">
              <td className="px-4 py-4 font-semibold text-white">
                <div className="flex items-center gap-3">
                  <RentItProductImagePreview title={item.title} />
                  <span>{item.title}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-white/75">{item.day1}</td>
              <td className="px-4 py-4 text-white/75">{item.day2}</td>
              <td className="px-4 py-4 text-white/75">{item.day3}</td>
              <td className="px-4 py-4 text-white/60">{item.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RentItProductImagePreview({
  title,
  ariaLabel = `View image for ${title}`,
}: {
  title: string;
  ariaLabel?: string;
}) {
  const image = getRentItItemImage(title);

  if (!image) {
    return null;
  }

  return (
    <span
      tabIndex={0}
      aria-label={ariaLabel}
      className="group/preview relative inline-flex h-11 w-11 shrink-0 cursor-zoom-in items-center justify-center overflow-visible rounded-xl border border-white/10 bg-white p-1 outline-none ring-[#F3922B] transition hover:border-[#F3922B]/50 focus:ring-2"
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-contain"
      />
      <span className="pointer-events-none invisible absolute left-0 top-12 z-50 w-44 rounded-2xl border border-white/15 bg-[#10140F] p-2 opacity-0 shadow-2xl shadow-black/50 transition group-hover/preview:visible group-hover/preview:opacity-100 group-focus/preview:visible group-focus/preview:opacity-100">
        <img
          src={image}
          alt={title}
          className="h-32 w-full rounded-xl bg-white object-contain p-2"
        />
        <span className="mt-2 block px-1 pb-1 text-xs font-semibold leading-5 text-white/80">
          {title}
        </span>
      </span>
    </span>
  );
}

export function RentItTentGrid({
  tents,
}: {
  tents: TentShowcaseItem[];
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {tents.map((tent, index) => {
        const displayTitle = normalizeRentItTitle(tent.title);

        return (
          <article
            key={tent.title}
            className={`overflow-hidden rounded-[2rem] border ${
              index === 1
                ? "border-[#F3922B]/40 bg-[#1F2B1A]"
                : "border-white/10 bg-white/5"
            }`}
          >
            {tent.image ? (
              <img
                src={tent.image}
                alt={displayTitle}
                className="h-56 w-full bg-white object-contain p-2"
              />
            ) : null}

            <div className="p-6">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
                {tent.bestFor.join(" / ")}
              </p>
              <h3 className="mt-4 text-3xl font-bold">{displayTitle}</h3>
              <p className="mt-3 text-white/80">{tent.capacity}</p>
              <p className="mt-5 text-white/70">{tent.description}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <PriceBox label="1 Day" value={tent.day1} />
                <PriceBox label="2 Days" value={tent.day2} />
                <PriceBox label="3 Days" value={tent.day3} />
              </div>

              <a
                href={makeWhatsappLink(`Hi AFFT, I want details for ${displayTitle}.`)}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block font-bold text-[#F3922B]"
              >
                Ask About This Tent &rarr;
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function PriceBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-white/50">{label}</p>
      <p className="mt-2 font-bold text-[#F3922B]">{value}</p>
    </div>
  );
}
