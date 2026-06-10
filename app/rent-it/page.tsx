import {
  catalogSections,
  comingSoonItems,
  featuredPicks,
  helinoxNotes,
  helinoxTiers,
  makeWhatsappLink,
  rentItMainSeries,
  rentItStats,
  tentShowcaseItems,
} from "@/lib/rent-it-data";
import {
  RentItBackLink,
  RentItCatalogTable,
  RentItInlineCta,
  RentItTentGrid,
} from "@/components/rent-it-shared";

export default function RentItLandingPage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
        <RentItBackLink />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              AFFT Rent It Series
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
              Use the best. Do not own the whole setup.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/72 md:text-xl">
              AFFT Rent It Series is built as a premium outdoor rental system for
              Sabah road trips, creator weekends, glamping stays and group camp
              plans. The page leads with experience first, then category, then
              featured products, then the full price guide.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={makeWhatsappLink(
                  "Hi AFFT, I want help choosing from the Rent It Series."
                )}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
              >
                WhatsApp Booking
              </a>
              <a
                href="#price-guide"
                className="rounded-full border border-white/20 px-8 py-4 font-bold text-white"
              >
                View Full Price Guide
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {rentItStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-3xl font-bold text-[#F3922B]">{stat.value}</p>
                  <p className="mt-2 text-sm text-white/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {rentItMainSeries.map((series) => (
              <a
                key={series.slug}
                href={series.route}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
              >
                <img
                  src={series.image}
                  alt={series.imageAlt}
                  className="h-44 w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
                    {series.startingFrom}
                  </p>
                  <h2 className="mt-4 text-3xl font-bold">{series.title}</h2>
                  <p className="mt-4 text-white/70">{series.hook}</p>
                  <p className="mt-4 text-sm text-white/55">{series.bestFor}</p>
                  <span className="mt-6 inline-block font-bold text-[#F3922B]">
                    Open Series &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <section className="mt-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                Featured Rent It Picks
              </p>
              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                Lead the page with the products that sell the idea fastest.
              </h2>
            </div>
            <p className="max-w-xl text-white/65">
              The strongest products should be seen before the full catalog so
              the page feels premium instead of reading like a crowded list.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {featuredPicks.map((pick) => (
              <a
                key={pick.title}
                href={pick.route}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
              >
                {pick.image ? (
                  <img
                    src={pick.image}
                    alt={pick.title}
                    className="h-52 w-full object-cover bg-white"
                  />
                ) : (
                  <div className="flex h-52 items-end bg-[linear-gradient(145deg,#734C24,#182015_60%,#10140F)] p-6">
                    <p className="max-w-[12rem] text-2xl font-bold leading-tight">
                      {pick.title}
                    </p>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-xl font-bold">{pick.title}</h3>
                  <p className="mt-2 font-bold text-[#F3922B]">{pick.price}</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    {pick.description}
                  </p>
                  <span className="mt-5 inline-block text-sm font-bold text-[#F3922B]">
                    View Product Context &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="mt-16">
          <RentItInlineCta
            message="Hi AFFT, I need help choosing the right Rent It setup."
            secondaryHref="#price-guide"
            secondaryLabel="Jump to Price Guide"
          />
        </div>

        <section id="price-guide" className="mt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              Full Price Guide
            </p>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Keep the full catalog in the back half of the page.
            </h2>
            <p className="mt-5 text-white/70">
              This is where customers compare details after the page has already
              sold the overall experience. The 4 main series link onward to
              their own detail pages, while Experience Set stays as a bundle
              section inside the main Rent It page.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {catalogSections.map((section) => (
              <article
                key={section.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8"
              >
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-3xl font-bold">{section.title}</h3>
                    <p className="mt-2 text-white/60">
                      Product | 1 Day | 2 Days | 3 Days | Best For
                    </p>
                  </div>
                  {section.route !== "/rent-it" ? (
                    <a
                      href={section.route}
                      className="inline-flex rounded-full border border-white/15 px-5 py-3 font-bold text-white"
                    >
                      Open Series Page
                    </a>
                  ) : null}
                </div>
                <RentItCatalogTable items={section.items} />
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] border border-[#F3922B]/20 bg-[#182015] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                Helinox Spotlight
              </p>
              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                Premium camp value should be explained, not hidden in a table.
              </h2>
              <p className="mt-5 text-white/70">
                Helinox is not ordinary camp furniture. Guests are paying for a
                lighter, cleaner and more premium solo outdoor experience, so
                the system deserves its own spotlight before customers decide.
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

        <section className="mt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              Tent Experience Series
            </p>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Tents should feel like premium stays, not just another table row.
            </h2>
            <p className="mt-5 text-white/70">
              Tent products carry higher value and a stronger booking decision,
              so they are displayed as larger cards with capacity, use case and
              pricing visible at a glance.
            </p>
          </div>

          <div className="mt-10">
            <RentItTentGrid tents={tentShowcaseItems} />
          </div>
        </section>

        <div className="mt-16">
          <RentItInlineCta
            title="Need help choosing a tent or premium setup?"
            text="Tell AFFT your group size, trip type and campsite plan. We can recommend the right tent, furniture or creator package."
            message="Hi AFFT, I need help choosing a tent or premium setup."
            secondaryHref="/"
            secondaryLabel="Back Home"
          />
        </div>

        <section id="coming-soon" className="mt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              Coming Soon
            </p>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Keep future additions at the bottom so the current catalog stays clean.
            </h2>
            <p className="mt-5 text-white/70">
              These are planned V3 additions that show the system is growing
              without confusing the current rental catalog.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {comingSoonItems.map((item) => (
              <article
                key={item}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
              >
                <p className="text-xl font-bold">{item}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
