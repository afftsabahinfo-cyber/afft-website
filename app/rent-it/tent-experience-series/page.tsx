import {
  makeWhatsappLink,
  seriesPageSummaries,
  tentShowcaseItems,
} from "@/lib/rent-it-data";
import {
  RentItBackLink,
  RentItInfoCard,
  RentItInlineCta,
  RentItTentGrid,
} from "@/components/rent-it-shared";

const summary = seriesPageSummaries["tent-experience-series"];

export default function TentExperienceSeriesPage() {
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
                "Hi AFFT, I want help with the Tent Experience Series."
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
                className="h-[320px] w-full object-cover bg-white md:h-[360px]"
              />
            ) : (
              <div className="min-h-[320px] bg-[linear-gradient(145deg,#734C24,#10140F_65%,#182015)] md:min-h-[360px]" />
            )}
            <div className="border-t border-white/10 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/70">
                Featured Tent Anchor
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
            title="Featured Tent"
            text={`${summary.featuredTitle} · ${summary.featuredPrice}`}
          />
          <RentItInfoCard title="Price Range" text={summary.priceRange} />
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold md:text-4xl">
            Tent Experience lineup
          </h2>
          <p className="mt-4 max-w-4xl text-white/70">
            These tents should be presented as premium stay options because the
            visual identity, capacity and booking value are much higher than
            standard utility gear.
          </p>

          <div className="mt-10">
            <RentItTentGrid tents={tentShowcaseItems} />
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <RentItInfoCard
            title="Couple Bookings"
            text="Black Dog 星宿 5.9 is the stronger fit for visual glamping and quieter luxury stays."
          />
          <RentItInfoCard
            title="Family and Groups"
            text="Black Dog Modular Tent System or Mobi Garden should be matched to group size and campsite layout."
          />
          <RentItInfoCard
            title="Before Booking"
            text="Contact AFFT with group size, vehicle type, campsite size and trip style for the right tent recommendation."
          />
        </section>

        <div className="mt-16">
          <RentItInlineCta
            title="Need help choosing the right tent?"
            text="Tell AFFT your group size, trip mood and campsite plan. We can recommend the right tent system and supporting gear."
            message="Hi AFFT, help me choose a Tent Experience Series setup."
            secondaryHref="/rent-it"
            secondaryLabel="Back to Rent It"
          />
        </div>
      </section>
    </main>
  );
}
