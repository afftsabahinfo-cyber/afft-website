import type { Metadata } from "next";
import { RentItCatalogNoScriptFallback } from "@/components/RentItCatalogNoScriptFallback";
import { RentItLivePriceGuide } from "@/components/RentItLivePriceGuide";
import {
  RentItSeriesFeaturedProduct,
  RentItSeriesMetrics,
} from "@/components/RentItSeriesLiveSummary";
import { makeWhatsappLink, seriesPageSummaries } from "@/lib/rent-it-data";
import { RentItBackLink, RentItInlineCta } from "@/components/rent-it-shared";

const summary = seriesPageSummaries["creator-series"];

export const metadata: Metadata = {
  title: "Creator Gear Rental Sabah | AFFT Rent It",
  description:
    "Rent DJI Pocket 4, DJI Action 6, Mic 3 and creator kits for Sabah travel content. WhatsApp AFFT for availability and setup advice.",
  alternates: {
    canonical: "/rent-it/creator-series",
    languages: {
      en: "/rent-it/creator-series",
      "zh-Hans": "/zh/rent-it/creator-series",
      "x-default": "/rent-it/creator-series",
    },
  },
  openGraph: {
    title: "Creator Gear Rental Sabah | AFFT Rent It",
    description:
      "Travel-ready creator tools for Sabah vlogs, road trips and outdoor stories.",
    images: [
      {
        url: "/images/rent-it-creator-series-cover.webp",
        alt: "AFFT Creator Series cover",
      },
    ],
  },
};

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

          <RentItSeriesFeaturedProduct
            label="Featured Creator Kit"
            preferredSlug="dji-pocket-4-creator-combo"
            series="Creator Series"
          />
        </div>

        <RentItSeriesMetrics series="Creator Series" />

        <RentItLivePriceGuide
          description="Browse every active Creator Series product and its current approved public price. Choose a simple entry point or ask AFFT which bundle fits your shoot."
          series="Creator Series"
        />
        <RentItCatalogNoScriptFallback series="Creator Series" />

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
