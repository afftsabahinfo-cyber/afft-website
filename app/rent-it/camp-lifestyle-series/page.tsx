import {
  campLifestyleItems,
  makeWhatsappLink,
  seriesPageSummaries,
} from "@/lib/rent-it-data";
import {
  RentItBackLink,
  RentItCatalogTable,
  RentItInfoCard,
  RentItInlineCta,
} from "@/components/rent-it-shared";

const summary = seriesPageSummaries["camp-lifestyle-series"];

export default function CampLifestyleSeriesPage() {
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
                "Hi AFFT, I want help with the Camp Lifestyle Series."
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              WhatsApp AFFT
            </a>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,#734C24,#182015_60%,#10140F)] p-8">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/70">
              Featured Lifestyle Anchor
            </p>
            <h2 className="mt-4 text-4xl font-bold">{summary.featuredTitle}</h2>
            <p className="mt-4 font-bold text-[#F3922B]">{summary.featuredPrice}</p>
            <p className="mt-5 text-white/70">{summary.featuredText}</p>

            <div className="mt-8 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4 text-white/70">
                Coffee rituals that make the campsite feel more intentional.
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4 text-white/70">
                Cooking pieces that add more premium visual identity.
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4 text-white/70">
                Lighting and tools that improve comfort without overbuilding the setup.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <RentItInfoCard title="Best For" text={summary.bestFor} />
          <RentItInfoCard
            title="Featured Piece"
            text={`${summary.featuredTitle} · ${summary.featuredPrice}`}
          />
          <RentItInfoCard title="Price Range" text={summary.priceRange} />
        </div>

        <section className="mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-3xl font-bold">Camp Lifestyle Price Guide</h2>
          <p className="mt-4 max-w-4xl text-white/70">
            This series supports slower mornings, better cooking corners and a
            more styled campsite. It works especially well when paired with
            Premium Camp or Tent Experience bookings.
          </p>

          <div className="mt-8">
            <RentItCatalogTable items={campLifestyleItems} />
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <RentItInfoCard
            title="Coffee First"
            text="Bialetti and the Outdoor Coffee Set are good entry points for guests who want a slower camp mood."
          />
          <RentItInfoCard
            title="Cooking Upgrade"
            text="The Flat Burner and Setsuen Pot help the campsite feel cleaner, more premium and easier to share."
          />
          <RentItInfoCard
            title="Best Pairing"
            text="This series pairs naturally with Premium Camp furniture or Tent Experience bookings."
          />
        </section>

        <div className="mt-16">
          <RentItInlineCta
            title="Need help choosing a lifestyle setup?"
            text="Tell AFFT whether you want coffee, cooking or visual campsite mood and we can suggest the right combination."
            message="Hi AFFT, help me choose a Camp Lifestyle Series setup."
            secondaryHref="/rent-it"
            secondaryLabel="Back to Rent It"
          />
        </div>
      </section>
    </main>
  );
}
