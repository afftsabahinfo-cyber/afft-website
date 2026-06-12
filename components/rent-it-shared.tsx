import { AfftLogoMark } from "@/components/AfftBrand";
import type { CatalogItem, TentShowcaseItem } from "@/lib/rent-it-data";
import { makeWhatsappLink } from "@/lib/rent-it-data";

export function RentItBackLink({
  href = "/",
  label = "Back to AFFT.CLUB",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 text-sm font-bold text-[#F3922B] hover:opacity-80"
    >
      <AfftLogoMark className="h-8 w-8 shrink-0" decorative />
      <span>{label}</span>
    </a>
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
    <div className="overflow-x-auto">
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
              <td className="px-4 py-4 font-semibold text-white">{item.title}</td>
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

export function RentItTentGrid({
  tents,
}: {
  tents: TentShowcaseItem[];
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {tents.map((tent, index) => (
        <article
          key={tent.title}
          className={`rounded-[2rem] border p-6 ${
            index === 1
              ? "border-[#F3922B]/40 bg-[#1F2B1A]"
              : "border-white/10 bg-white/5"
          }`}
        >
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
            {tent.bestFor.join(" / ")}
          </p>
          <h3 className="mt-4 text-3xl font-bold">{tent.title}</h3>
          <p className="mt-3 text-white/80">{tent.capacity}</p>
          <p className="mt-5 text-white/70">{tent.description}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <PriceBox label="1 Day" value={tent.day1} />
            <PriceBox label="2 Days" value={tent.day2} />
            <PriceBox label="3 Days" value={tent.day3} />
          </div>

          <a
            href={makeWhatsappLink(`Hi AFFT, I want details for ${tent.title}.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block font-bold text-[#F3922B]"
          >
            Ask About This Tent &rarr;
          </a>
        </article>
      ))}
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
