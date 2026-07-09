import type { Metadata } from "next";
import {
  campsiteRegions,
  campsiteStats,
  makeCampsiteWhatsappLink,
} from "@/lib/campsite-guide-data";
import {
  PageFinalCta,
  SectionHeading,
  SiteFooter,
  SiteTopNav,
} from "@/components/V3PageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";

export const metadata: Metadata = {
  title: "West Coast Division Campsite Guide | AFFT Sabah",
  description:
    "Browse West Coast Division campsite districts around Kota Kinabalu, Tuaran, Kota Belud, Ranau and Papar, then ask AFFT to match the campsite, gear and transport.",
  alternates: {
    canonical: "/camping-spots",
    languages: {
      en: "/camping-spots",
      "zh-Hans": "/zh/camping-spots",
    },
  },
  openGraph: {
    title: "West Coast Division Campsite Guide | AFFT Sabah",
    description:
      "Start with West Coast districts, then open each district to compare campsite photos, fit and AFFT planning advice.",
    images: [
      {
        url: "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-cover.webp",
        alt: "AFFT campsite guide in Sabah",
      },
    ],
  },
};

export default function CampingSpotsPage() {
  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative bg-cover bg-center px-6 py-8 md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,20,15,.98), rgba(16,20,15,.78), rgba(16,20,15,.36)), url(/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-cover.webp)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <SiteTopNav zhHref="/zh/camping-spots" />

          <div className="grid gap-10 py-18 lg:grid-cols-[1.05fr_0.95fr] lg:items-end md:py-24">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                West Coast Division Campsite Guide
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                Pick a West Coast district, then choose the campsite.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76 md:text-xl">
                Browse campsites inside Sabah&apos;s West Coast Division: Kota
                Kinabalu, Tuaran, Kota Belud, Ranau and Papar. Kokol sits under
                Kota Kinabalu, Kiulu under Tuaran, and Kundasang under Ranau.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={makeWhatsappLink(
                    "Hi AFFT, I want help choosing a campsite in Sabah West Coast Division."
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
                >
                  WhatsApp AFFT
                </a>
                <a
                  href="#areas"
                  className="rounded-full border border-white/30 bg-black/25 px-8 py-4 font-bold text-white"
                >
                  View Districts
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard value={String(campsiteStats.regions)} label="areas" />
              <StatCard value={String(campsiteStats.total)} label="campsites" />
              <StatCard value="WhatsApp" label="planning support" />
            </div>
          </div>
        </div>
      </section>

      <section id="areas" className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <SectionHeading
          small="Choose Your District"
          big="Grouped by West Coast Division districts."
          text="Tap a district card to see the campsites inside. The next page shows campsite photos first, then each campsite opens into AFFT's practical advice."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {campsiteRegions.map((region) => (
            <RegionCard key={region.id} region={region} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-[#182015] p-7 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
            How AFFT Helps
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <InfoBlock
              title="Shortlist the district"
              text="Choose by West Coast district first, then compare drive time, mountain view, river setting, beach sunset or cooler highland weather."
            />
            <InfoBlock
              title="Open campsite cards"
              text="Each district page shows campsite photos and basic fit so you can compare quickly."
            />
            <InfoBlock
              title="Ask AFFT"
              text="Send your date and group size. AFFT can help check campsite fit, gear, private transport and weather comfort."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-10">
        <PageFinalCta
          title="Need help choosing the right campsite district?"
          text="Send your date, group size and comfort level. AFFT can suggest which West Coast district to open first and what gear to prepare."
          message="Hi AFFT, I want help choosing the right West Coast Division campsite for my Sabah camping trip."
          buttonLabel="WhatsApp AFFT About Campsites"
        />
      </section>

      <SiteFooter />
    </main>
  );
}

function RegionCard({ region }: { region: (typeof campsiteRegions)[number] }) {
  const previewPhotos = region.spots
    .map((spot) => spot.photoUrl)
    .filter((photo): photo is string => Boolean(photo))
    .slice(0, 3);

  return (
    <a
      href={`/camping-spots/${region.id}`}
      className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/45"
    >
      <div className="grid h-44 grid-cols-3 gap-1 bg-black/25 p-1">
        {previewPhotos.length > 0 ? (
          previewPhotos.map((photo, index) => (
            <img
              key={`${photo}-${index}`}
              src={photo}
              alt={`${region.profile.label} campsite preview ${index + 1}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full rounded-[1rem] object-cover"
            />
          ))
        ) : (
          <div className="col-span-3 flex items-center justify-center rounded-[1rem] bg-[#182015] text-sm font-bold text-white/55">
            Campsite photos coming soon
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F3922B]">
            {region.spots.length} campsites
          </p>
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/60">
            {region.profile.driveFromKK}
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold">{region.profile.label}</h2>
        <p className="mt-3 min-h-[84px] leading-7 text-white/68">
          {region.profile.summary}
        </p>
        <span className="mt-5 inline-flex font-bold text-[#F3922B] group-hover:text-white">
          View campsites
        </span>
      </div>
    </a>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
      <p className="text-4xl font-bold text-[#F3922B]">{value}</p>
      <p className="mt-2 text-sm text-white/65">{label}</p>
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-white/70">{text}</p>
    </div>
  );
}
