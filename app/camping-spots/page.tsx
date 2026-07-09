import type { Metadata } from "next";
import {
  campsiteRegionTabs,
  campsiteRegions,
  campsiteStats,
  makeCampsiteWhatsappLink,
  type CampsiteSpot,
} from "@/lib/campsite-guide-data";
import {
  PageFinalCta,
  SectionHeading,
  SiteFooter,
  SiteTopNav,
} from "@/components/V3PageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";

export const metadata: Metadata = {
  title: "Sabah Campsite Guide Near Kota Kinabalu | AFFT",
  description:
    "A practical AFFT guide to campsites around KK-Kokol, Kota Belud, Kundasang, Ranau, Kiulu and Papar. Ask AFFT for camping packages, Rent It gear and transport fit.",
  alternates: {
    canonical: "/camping-spots",
    languages: {
      en: "/camping-spots",
      "zh-Hans": "/zh/camping-spots",
    },
  },
  openGraph: {
    title: "Sabah Campsite Guide Near Kota Kinabalu | AFFT",
    description:
      "Browse nearby campsite directions by region, driving time, guest fit and gear suggestions.",
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

          <div className="grid gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end md:py-28">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                Sabah Campsite Guide
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                Choose the campsite area before choosing the gear.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76 md:text-xl">
                A practical AFFT guide for campsites around KK-Kokol, Kota Belud,
                Kundasang, Ranau, Kiulu and Papar. Use it to compare drive time,
                guest fit and what to ask on WhatsApp.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={makeWhatsappLink(
                    "Hi AFFT, I want help choosing a campsite near Kota Kinabalu."
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
                >
                  WhatsApp AFFT
                </a>
                <a
                  href="#regions"
                  className="rounded-full border border-white/30 bg-black/25 px-8 py-4 font-bold text-white"
                >
                  Browse Regions
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard value={String(campsiteStats.total)} label="spots in guide" />
              <StatCard value={String(campsiteStats.regions)} label="AFFT area filters" />
              <StatCard
                value={String(campsiteStats.webBacked)}
                label="source-backed highlights"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="regions" className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <SectionHeading
          small="Area Filters"
          big="Use the same simple browsing logic as Rent It Series."
          text="The guide is arranged by area first, then each campsite card gives drive time, guest fit, gear advice and a WhatsApp enquiry path."
        />

        <div className="flex flex-wrap gap-3">
          {campsiteRegionTabs.map((region) => (
            <a
              key={region.id}
              href={region.id === "all" ? "#all" : `#${region.id}`}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-[#F3922B]/50 hover:text-[#F3922B]"
            >
              {region.label}
            </a>
          ))}
        </div>
      </section>

      <section id="all" className="bg-[#182015] px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            small="How To Read This Guide"
            big="It is a campsite direction tool, not a fixed booking engine."
            text="Fees, access rules and campsite conditions can change. AFFT should confirm the date, route, gear and weather fit before guests decide."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <InfoBlock
              title="Photos"
              text="External photos are treated as reference only unless the campsite or owner gives permission. AFFT photos should replace them later."
            />
            <InfoBlock
              title="Gear Fit"
              text="Each region is connected to camping packages, Rent It gear and private transport so the page can generate WhatsApp enquiries."
            />
            <InfoBlock
              title="Fees"
              text="CSV fees are treated as guidance from March 2025. Visitors should ask AFFT to confirm current charges before travel."
            />
          </div>
        </div>
      </section>

      {campsiteRegions.map(({ id, profile, spots }) => (
        <section key={id} id={id} className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                {profile.eyebrow}
              </p>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">{profile.label}</h2>
              <p className="mt-5 text-lg leading-8 text-white/70">{profile.summary}</p>
              <div className="mt-6 grid gap-3">
                <InfoPill label="From KK" value={profile.driveFromKK} />
                <InfoPill label="Best for" value={profile.bestFor} />
                <InfoPill label="Gear idea" value={profile.gearSuggestion} />
              </div>
            </div>

            <div className="grid gap-4">
              {spots.map((spot) => (
                <CampsiteCard key={spot.name} spot={spot} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-4 md:px-10">
        <PageFinalCta
          title="Want AFFT to match the campsite, gear and transport?"
          text="Send your date, group size, preferred area and comfort level. AFFT can suggest the practical campsite direction and what gear to rent."
          message="Hi AFFT, I want help matching a campsite, gear and transport for a Sabah camping trip."
          buttonLabel="WhatsApp AFFT About Campsites"
        />
      </section>

      <SiteFooter />
    </main>
  );
}

function CampsiteCard({ spot }: { spot: CampsiteSpot }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#F3922B] px-3 py-1 text-xs font-bold text-black">
              {spot.driveFromKK}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/70">
              {spot.sourceStatus === "web"
                ? "Web checked"
                : spot.sourceStatus === "community"
                  ? "Photo reference"
                  : "CSV base"}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-bold">{spot.name}</h3>
          <p className="mt-2 text-sm text-white/55">{spot.location}</p>
        </div>

        <a
          href={makeCampsiteWhatsappLink(spot.name)}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-full border border-[#F3922B]/50 px-5 py-3 text-sm font-bold text-[#F3922B] transition hover:bg-[#F3922B] hover:text-black"
        >
          Ask AFFT
        </a>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <DetailItem label="Best for" value={spot.bestFor} />
        <DetailItem label="Highlight" value={spot.highlight} />
        <DetailItem label="Watch out" value={spot.watchOut} />
        <DetailItem label="Gear suggestion" value={spot.gearSuggestion} />
      </div>

      <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 text-sm text-white/62 md:grid-cols-3">
        <p>
          <span className="font-bold text-white">Camp fee:</span> {spot.feeNote}
        </p>
        <p>
          <span className="font-bold text-white">Entrance:</span> {spot.entranceNote}
        </p>
        <p>
          <span className="font-bold text-white">Photo:</span> {spot.photoNote}
        </p>
      </div>

      <div className="mt-4 text-sm text-white/50">
        Source:{" "}
        {spot.sourceUrl ? (
          <a
            href={spot.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#F3922B] hover:text-white"
          >
            {spot.sourceLabel}
          </a>
        ) : (
          spot.sourceLabel
        )}
      </div>

      {spot.facebookUrl ? (
        <div className="mt-3 rounded-2xl border border-[#F3922B]/20 bg-black/20 p-4 text-sm leading-7 text-white/65">
          <p>
            <span className="font-bold text-white">Facebook public info:</span>{" "}
            {spot.facebookSummary}
          </p>
          <a
            href={spot.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex font-bold text-[#F3922B] hover:text-white"
          >
            Open Facebook Page
          </a>
        </div>
      ) : null}
    </article>
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

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
        {label}
      </p>
      <p className="mt-2 text-white/75">{value}</p>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F3922B]">
        {label}
      </p>
      <p className="mt-2 leading-7 text-white/70">{value}</p>
    </div>
  );
}
