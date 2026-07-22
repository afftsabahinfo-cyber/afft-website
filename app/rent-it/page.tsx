import type { Metadata } from "next";
import { RentItCatalogNoScriptFallback } from "@/components/RentItCatalogNoScriptFallback";
import { RentItCatalogStats } from "@/components/RentItCatalogStats";
import { RentItLivePriceGuide } from "@/components/RentItLivePriceGuide";
import { RentItSeriesCards } from "@/components/RentItSeriesCards";
import { RentItBackLink, RentItInlineCta } from "@/components/rent-it-shared";
import { makeWhatsappLink } from "@/lib/rent-it-data";

export const metadata: Metadata = {
  title: "AFFT Rent It Series | Sabah Gear Rental",
  description:
    "Rent creator gear, camp lifestyle gear, premium camp furniture, ready-paired experience sets and tent systems for Sabah trips. WhatsApp AFFT for availability and setup advice.",
  alternates: {
    canonical: "/rent-it",
  },
  openGraph: {
    title: "AFFT Rent It Series | Sabah Gear Rental",
    description:
      "Premium outdoor gear, creator tools and tent experiences without owning the whole setup.",
    images: [
      {
        url: "/images/rent-it-creator-series-cover.webp",
        alt: "AFFT Rent It Creator Series cover",
      },
    ],
  },
};

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
              Rent the gear you need for Sabah road trips, creator weekends,
              glamping stays and campsite plans. Browse by series, compare
              prices and WhatsApp AFFT for availability, trip fit and setup
              advice.
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
                WhatsApp AFFT
              </a>
              <a
                href="#price-guide"
                className="rounded-full border border-white/20 px-8 py-4 font-bold text-white"
              >
                View Full Price Guide
              </a>
            </div>

            <RentItCatalogStats />
          </div>

          <RentItSeriesCards />
        </div>

        <div className="mt-16">
          <RentItInlineCta
            message="Hi AFFT, I need help choosing the right Rent It setup."
            secondaryHref="#price-guide"
            secondaryLabel="View Live Price Guide"
          />
        </div>

        <RentItLivePriceGuide />
        <RentItCatalogNoScriptFallback />

        <div className="mt-16">
          <RentItInlineCta
            title="Need help choosing from the live catalog?"
            text="Tell AFFT your trip type, group size and dates. We can recommend the right product or bundle and confirm the final quotation."
            message="Hi AFFT, I need help choosing from the current Rent It catalog."
            secondaryHref="/"
            secondaryLabel="Back Home"
          />
        </div>
      </section>
    </main>
  );
}
