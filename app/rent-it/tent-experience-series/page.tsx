import type { Metadata } from "next";
import { RentItCatalogNoScriptFallback } from "@/components/RentItCatalogNoScriptFallback";
import { RentItLivePriceGuide } from "@/components/RentItLivePriceGuide";
import {
  RentItSeriesFeaturedProduct,
  RentItSeriesMetrics,
} from "@/components/RentItSeriesLiveSummary";
import { makeWhatsappLink, seriesPageSummaries } from "@/lib/rent-it-data";
import { RentItBackLink, RentItInlineCta } from "@/components/rent-it-shared";

const summary = seriesPageSummaries["tent-experience-series"];

export const metadata: Metadata = {
  title: "Tent Rental Sabah | AFFT Rent It",
  description:
    "Rent Black Dog, Mobi Garden and tent experience systems for Sabah camping, glamping and group outdoor stays. WhatsApp AFFT for fit and availability.",
  alternates: {
    canonical: "/rent-it/tent-experience-series",
    languages: {
      en: "/rent-it/tent-experience-series",
      "zh-Hans": "/zh/rent-it/tent-experience-series",
      "x-default": "/rent-it/tent-experience-series",
    },
  },
  openGraph: {
    title: "Tent Rental Sabah | AFFT Rent It",
    description:
      "Tent systems that feel like outdoor stays, not just shelter.",
    images: [
      {
        url: "/images/rent-it-tent-experience-series-cover.webp",
        alt: "AFFT Tent Experience Series cover",
      },
    ],
  },
};

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

          <RentItSeriesFeaturedProduct
            label="Featured Tent Anchor"
            preferredSlug="black-dog-modular-tent-system"
            series="Tent Experience Series"
          />
        </div>

        <RentItSeriesMetrics series="Tent Experience Series" />

        <RentItLivePriceGuide
          description="Browse every active Tent Experience product and its current approved public price. Confirm group size, campsite fit and vehicle compatibility with AFFT before booking."
          series="Tent Experience Series"
        />
        <RentItCatalogNoScriptFallback series="Tent Experience Series" />

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
