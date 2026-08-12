import type { Metadata } from "next";
import { RentItCatalogNoScriptFallback } from "@/components/RentItCatalogNoScriptFallback";
import { RentItLivePriceGuide } from "@/components/RentItLivePriceGuide";
import {
  RentItSeriesFeaturedProduct,
  RentItSeriesMetrics,
} from "@/components/RentItSeriesLiveSummary";
import {
  makeWhatsappLink,
  seriesPageSummaries,
} from "@/lib/rent-it-data";
import { RentItBackLink, RentItInlineCta } from "@/components/rent-it-shared";

const summary = seriesPageSummaries["premium-camp-series"];

export const metadata: Metadata = {
  title: "Premium Camp Gear Rental Sabah | AFFT Rent It",
  description:
    "Rent Helinox, Snow Peak and premium camp furniture for cleaner Sabah camping comfort. WhatsApp AFFT to choose the right setup.",
  alternates: {
    canonical: "/rent-it/premium-camp-series",
    languages: {
      en: "/rent-it/premium-camp-series",
      "zh-Hans": "/zh/rent-it/premium-camp-series",
      "x-default": "/rent-it/premium-camp-series",
    },
  },
  openGraph: {
    title: "Premium Camp Gear Rental Sabah | AFFT Rent It",
    description:
      "Premium camp furniture and comfort systems for Sabah glamping and outdoor stays.",
    images: [
      {
        url: "/images/rent-it-premium-camp-series-cover.webp",
        alt: "AFFT Premium Camp Series cover",
      },
    ],
  },
};

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

          <RentItSeriesFeaturedProduct
            label="Featured Premium Setup"
            preferredSlug="helinox-solo-full-set"
            series="Premium Camp Series"
          />
        </div>

        <RentItSeriesMetrics series="Premium Camp Series" />

        <RentItLivePriceGuide
          description="Browse every active Premium Camp product and its current approved public price. Compare furniture, sleep and premium cooking pieces before asking AFFT for a complete setup."
          series="Premium Camp Series"
        />
        <RentItCatalogNoScriptFallback series="Premium Camp Series" />

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
