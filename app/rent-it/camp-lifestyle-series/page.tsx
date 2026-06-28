import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Camp Lifestyle Gear Rental Sabah | AFFT Rent It",
  description:
    "Rent camp lifestyle gear for Sabah camping, coffee, lights, projector nights and outdoor comfort. WhatsApp AFFT for the right setup.",
  alternates: {
    canonical: "/rent-it/camp-lifestyle-series",
  },
  openGraph: {
    title: "Camp Lifestyle Gear Rental Sabah | AFFT Rent It",
    description:
      "Coffee, lighting, projector and campsite lifestyle gear for slower Sabah outdoor trips.",
    images: [
      {
        url: "/images/rent-it-camp-lifestyle-series-cover.webp",
        alt: "AFFT Camp Lifestyle Series cover",
      },
    ],
  },
};

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

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            {summary.heroImage ? (
              <img
                src={summary.heroImage}
                alt={summary.heroImageAlt ?? summary.featuredTitle}
                className="h-[320px] w-full bg-white object-contain p-3 md:h-[420px]"
              />
            ) : (
              <div className="min-h-[320px] bg-[linear-gradient(145deg,#734C24,#182015_60%,#10140F)] md:min-h-[360px]" />
            )}
            <div className="border-t border-white/10 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/70">
                Featured Lifestyle Anchor
              </p>
              <h2 className="mt-4 text-4xl font-bold">{summary.featuredTitle}</h2>
              <p className="mt-4 font-bold text-[#F3922B]">{summary.featuredPrice}</p>
              <p className="mt-5 text-white/70">{summary.featuredText}</p>

              <div className="mt-8 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/15 p-4 text-white/70">
                  Projector nights for glamping stays, family downtime and slower campsite entertainment.
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/15 p-4 text-white/70">
                  Power support for phones, cameras, lights and small outdoor devices.
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/15 p-4 text-white/70">
                  Adventure lights for campsite glow, night movement and premium outdoor mood.
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/15 p-4 text-white/70">
                  Walkie talkies for long standby and far connection between guests.
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/15 p-4 text-white/70">
                  Binoculars for nature view checking, bird seeking and campsite spotting.
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/15 p-4 text-white/70">
                  Compact warmth, coffee and simple meals that make the setup feel more complete.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <RentItInfoCard title="Best For" text={summary.bestFor} />
          <RentItInfoCard
            title="Featured Piece"
            text={`${summary.featuredTitle} / ${summary.featuredPrice}`}
          />
          <RentItInfoCard title="Price Range" text={summary.priceRange} />
        </div>

        <section className="mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-3xl font-bold">Camp Lifestyle Price Guide</h2>
          <p className="mt-4 max-w-4xl text-white/70">
            This series supports slower mornings, better cooking corners and a
            more styled campsite, with portable power for simple outdoor device
            support, premium adventure lighting for night mood, walkie talkies for
            group coordination and binoculars for nature viewing. It works
            especially well when paired with Premium Camp or Tent Experience
            bookings.
          </p>

          <div className="mt-8">
            <RentItCatalogTable items={campLifestyleItems} />
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <RentItInfoCard
            title="Power Support"
            text="Anker Solix C300 DC Power Station is useful for charging phones, cameras, lights and small campsite devices."
          />
          <RentItInfoCard
            title="Adventure Lighting"
            text="Outask TD-2 and Finel N7 give stronger campsite glow for night movement, setup photos and premium outdoor mood."
          />
          <RentItInfoCard
            title="Group Communication"
            text="Xiao Mi Walkie Talkies help guests stay connected with long standby and far connection support."
          />
          <RentItInfoCard
            title="Nature View"
            text="Celestron Outland X is useful for nature view checking, bird seeking and quick outdoor spotting."
          />
          <RentItInfoCard
            title="Movie Setup"
            text="Yaber T2 Plus Projector is a stronger add-on for guests who want movie nights, family downtime or glamping entertainment."
          />
          <RentItInfoCard
            title="Warmth & Coffee"
            text="Grandburn Heater, Bialetti and the cooking pieces build around the projector for a more complete lifestyle setup."
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
