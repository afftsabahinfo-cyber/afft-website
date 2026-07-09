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
                scenery, comfort level and what gear or transport you may need.
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
              <StatCard value={String(campsiteStats.regions)} label="area filters" />
              <StatCard
                value={String(campsiteStats.webBacked)}
                label="checked highlights"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="regions" className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <SectionHeading
          small="Browse By Area"
          big="Find a campsite that fits your group and comfort level."
          text="Start with the area, drive time and outdoor setting. Then send your date and group size to AFFT so we can help match the campsite, gear and transport."
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
            small="Before You Go"
            big="Different campsite areas need different planning."
            text="Highland, river, beach and hill camps all feel different. Use this guide to shortlist an area, then ask AFFT to confirm access, fees, weather and gear needs."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <InfoBlock
              title="Choose by mood"
              text="Compare mountain views, cool highlands, riverside spaces, beach sunsets and easy overnight options near Kota Kinabalu."
            />
            <InfoBlock
              title="Plan the setup"
              text="Tell us if you need tents, chairs, lights, cooking gear, creator gear or private transport for the campsite you like."
            />
            <InfoBlock
              title="Ask before travel"
              text="Campsite rules and conditions can change. Send us your date and group size so we can help you check the practical details."
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
  const previewImageUrl = getFacebookPreviewImage(spot.facebookUrl);

  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
      {previewImageUrl ? (
        <div className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
          <img
            src={previewImageUrl}
            alt={`${spot.name} public Facebook page photo`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-44 w-full object-cover transition duration-300 hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#F3922B] px-3 py-1 text-xs font-bold text-black">
              {spot.driveFromKK}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/70">
              {spot.sourceStatus === "web"
                ? "Public info"
                : spot.sourceStatus === "community"
                  ? "Photo available"
                  : "Listed spot"}
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
        <div className="rounded-2xl border border-[#F3922B]/25 bg-[#F3922B]/10 p-4 md:col-span-2">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F3922B]">
            Travel Fit
          </p>
          <p className="mt-2 leading-7 text-white/76">{getAfftView(spot)}</p>
        </div>
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
        More info:{" "}
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
        <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs leading-6 text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <span>Public campsite updates may change from time to time.</span>
          <a
            href={spot.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-white/55 underline underline-offset-4 hover:text-[#F3922B]"
          >
            View public campsite page
          </a>
        </div>
      ) : null}
    </article>
  );
}

function getAfftView(spot: CampsiteSpot) {
  return `${spot.name} is about ${spot.driveFromKK}. It is best to confirm the route, weather, group comfort and gear setup before you lock in the plan.`;
}

function getFacebookPreviewImage(facebookUrl?: string) {
  if (!facebookUrl) {
    return null;
  }

  try {
    const url = new URL(facebookUrl);

    if (!url.hostname.includes("facebook.com") || url.pathname.startsWith("/search")) {
      return null;
    }

    const directId = url.searchParams.get("id");
    const pageSlug = url.pathname.split("/").filter(Boolean)[0];
    const pageIdentifier = directId ?? pageSlug;

    if (!pageIdentifier || pageIdentifier === "profile.php") {
      return null;
    }

    return `https://graph.facebook.com/${encodeURIComponent(
      pageIdentifier
    )}/picture?type=large`;
  } catch {
    return null;
  }
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
