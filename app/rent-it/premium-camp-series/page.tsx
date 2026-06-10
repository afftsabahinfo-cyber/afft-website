import {
  helinoxNotes,
  helinoxTiers,
  makeWhatsappLink,
  premiumCampItems,
  seriesPageSummaries,
} from "@/lib/rent-it-data";
import {
  RentItBackLink,
  RentItCatalogTable,
  RentItInfoCard,
  RentItInlineCta,
} from "@/components/rent-it-shared";

const summary = seriesPageSummaries["premium-camp-series"];

export default function PremiumCampSeriesPage() {
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
                "Hi AFFT, I want help with the Premium Camp Series."
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              WhatsApp AFFT
            </a>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            {summary.featuredImage ? (
              <img
                src={summary.featuredImage}
                alt={summary.featuredTitle}
                className="h-full w-full object-cover bg-white"
              />
            ) : (
              <div className="h-full min-h-[360px] bg-[linear-gradient(145deg,#734C24,#10140F_65%,#182015)]" />
            )}
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <RentItInfoCard title="Best For" text={summary.bestFor} />
          <RentItInfoCard
            title="Featured Setup"
            text={`${summary.featuredTitle} · ${summary.featuredPrice}`}
          />
          <RentItInfoCard title="Price Range" text={summary.priceRange} />
        </div>

        <section className="mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-3xl font-bold">Premium Camp Price Guide</h2>
          <p className="mt-4 max-w-4xl text-white/70">
            This series is where AFFT moves away from ordinary camp utility and
            into comfort, lighter premium styling and better rest. Helinox is
            the strongest sales anchor here, but the smaller Snow Peak pieces
            help guests build complete lounge-style setups.
          </p>

          <div className="mt-8">
            <RentItCatalogTable items={premiumCampItems} />
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-[#F3922B]/20 bg-[#182015] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                Helinox Spotlight
              </p>
              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                Not a basic chair rental. A premium solo outdoor system.
              </h2>
              <p className="mt-5 text-white/70">
                Helinox carries both brand value and experience value. Guests
                are renting the lightness, the cleaner styling and the more
                premium solo camp feeling, not just a seat and a frame.
              </p>

              <div className="mt-6 space-y-3">
                {helinoxNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/70"
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {helinoxTiers.map((tier) => (
                <article
                  key={tier.title}
                  className={`rounded-[1.75rem] border p-5 ${
                    tier.title.includes("Full Set")
                      ? "border-[#F3922B]/35 bg-white/10"
                      : "border-white/10 bg-black/20"
                  }`}
                >
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
                    {tier.price}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">{tier.title}</h3>
                  <p className="mt-3 text-white/65">{tier.includes}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-16">
          <RentItInlineCta
            title="Need help choosing a premium camp setup?"
            text="Tell AFFT whether you want seating, sleep comfort or the full Helinox experience and we can recommend the right level."
            message="Hi AFFT, help me choose a Premium Camp Series setup."
            secondaryHref="/rent-it"
            secondaryLabel="Back to Rent It"
          />
        </div>
      </section>
    </main>
  );
}
