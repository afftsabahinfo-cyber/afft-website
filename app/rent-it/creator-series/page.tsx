import {
  creatorSeriesItems,
  makeWhatsappLink,
  seriesPageSummaries,
} from "@/lib/rent-it-data";
import {
  RentItBackLink,
  RentItCatalogTable,
  RentItInfoCard,
  RentItInlineCta,
} from "@/components/rent-it-shared";

const summary = seriesPageSummaries["creator-series"];

export default function CreatorSeriesPage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
        <RentItBackLink href="/rent-it" label="Back to Rent It Series" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              {summary.eyebrow}
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
              {summary.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/72 md:text-xl">
              {summary.intro}
            </p>

            <a
              href={makeWhatsappLink(
                "Hi AFFT, I want help with the Creator Series."
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              WhatsApp AFFT
            </a>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            {summary.heroImage || summary.featuredImage ? (
              <img
                src={summary.heroImage ?? summary.featuredImage}
                alt={summary.heroImageAlt ?? summary.featuredTitle}
                className="h-[320px] w-full object-cover md:h-[360px]"
              />
            ) : (
              <div className="min-h-[320px] bg-[linear-gradient(145deg,#734C24,#10140F_65%,#182015)] md:min-h-[360px]" />
            )}
            <div className="border-t border-white/10 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/70">
                Featured Creator Kit
              </p>
              <h2 className="mt-4 text-4xl font-bold">{summary.featuredTitle}</h2>
              <p className="mt-4 font-bold text-[#F3922B]">{summary.featuredPrice}</p>
              <p className="mt-5 text-white/70">{summary.featuredText}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <RentItInfoCard title="Best For" text={summary.bestFor} />
          <RentItInfoCard
            title="Featured Kit"
            text={`${summary.featuredTitle} · ${summary.featuredPrice}`}
          />
          <RentItInfoCard title="Price Range" text={summary.priceRange} />
        </div>

        <section className="mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-3xl font-bold">Creator Series Price Guide</h2>
          <p className="mt-4 max-w-4xl text-white/70">
            This series should feel practical and premium at the same time.
            Give guests quick entry points, then let them move up into bundles
            when they want more coverage or more convenience.
          </p>

          <div className="mt-8">
            <RentItCatalogTable items={creatorSeriesItems} />
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <RentItInfoCard
            title="Light Travel Setup"
            text="Pocket 4 or Action 6 works for guests who want speed, small bag size and simple use."
          />
          <RentItInfoCard
            title="Audio Upgrade"
            text="Pocket 4 + Mic 3 is the easiest step up for cleaner spoken content and interviews."
          />
          <RentItInfoCard
            title="Flight Upgrade"
            text="Avata and Goggles turn the booking into a stronger cinematic travel package."
          />
        </section>

        <div className="mt-16">
          <RentItInlineCta
            title="Need help choosing a creator setup?"
            text="Tell AFFT whether the trip is for vlog, FPV, POV, couple content or road trip coverage and we can point you to the right kit."
            message="Hi AFFT, help me choose a Creator Series setup."
            secondaryHref="/rent-it"
            secondaryLabel="Back to Rent It"
          />
        </div>
      </section>
    </main>
  );
}
