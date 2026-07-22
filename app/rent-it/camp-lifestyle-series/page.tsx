import type { Metadata } from "next";
import { RentItCatalogNoScriptFallback } from "@/components/RentItCatalogNoScriptFallback";
import { RentItLivePriceGuide } from "@/components/RentItLivePriceGuide";
import {
  RentItSeriesFeaturedProduct,
  RentItSeriesMetrics,
} from "@/components/RentItSeriesLiveSummary";
import { makeWhatsappLink, seriesPageSummaries } from "@/lib/rent-it-data";
import { RentItBackLink, RentItInlineCta } from "@/components/rent-it-shared";

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

          <RentItSeriesFeaturedProduct
            label="Featured Lifestyle Anchor"
            preferredSlug="yaber-t2-plus-projector"
            series="Camp Lifestyle Series"
          />
        </div>

        <RentItSeriesMetrics series="Camp Lifestyle Series" />

        <RentItLivePriceGuide
          description="Browse every active Camp Lifestyle product and its current approved public price. Pair cooking, cooling, power, lighting and comfort gear to fit your campsite plan."
          series="Camp Lifestyle Series"
        />
        <RentItCatalogNoScriptFallback series="Camp Lifestyle Series" />

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
