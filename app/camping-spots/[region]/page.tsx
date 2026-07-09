import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  campsiteRegions,
  makeCampsiteWhatsappLink,
} from "@/lib/campsite-guide-data";
import {
  PageFinalCta,
  SectionHeading,
  SiteFooter,
  SiteTopNav,
} from "@/components/V3PageSections";

const siteUrl = "https://afft.club";

type PageProps = {
  params: Promise<{
    region: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return campsiteRegions.map((region) => ({
    region: region.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region: regionId } = await params;
  const region = campsiteRegions.find((item) => item.id === regionId);

  if (!region) {
    return {
      title: "Sabah Campsites | AFFT",
    };
  }

  return {
    title: `${region.profile.label} Campsites | AFFT Sabah Guide`,
    description: `${region.profile.summary} Compare campsite photos, drive time, best fit, gear advice and WhatsApp planning with AFFT.`,
    alternates: {
      canonical: `/camping-spots/${region.id}`,
      languages: {
        en: `/camping-spots/${region.id}`,
        "zh-Hans": `/zh/camping-spots/${region.id}`,
      },
    },
  };
}

export default async function CampsiteRegionPage({ params }: PageProps) {
  const { region: regionId } = await params;
  const region = campsiteRegions.find((item) => item.id === regionId);

  if (!region) {
    notFound();
  }

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${region.profile.label} Campsites | AFFT Sabah Guide`,
      url: `${siteUrl}/camping-spots/${region.id}`,
      description: `${region.profile.summary} Compare campsite photos, drive time, best fit, gear advice and WhatsApp planning with AFFT.`,
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        name: "AFFT",
        url: siteUrl,
      },
      about: [
        `${region.profile.label} campsite`,
        "Sabah camping",
        "West Coast Division campsites",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Camp Spots",
          item: `${siteUrl}/camping-spots`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${region.profile.label} Campsites`,
          item: `${siteUrl}/camping-spots/${region.id}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${region.profile.label} campsite list`,
      itemListElement: region.spots.map((spot, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: spot.name,
        url: `${siteUrl}${spot.href}`,
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-[#10140F] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SiteTopNav zhHref={`/zh/camping-spots/${region.id}`} />

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <a href="/camping-spots" className="text-sm font-bold text-[#F3922B]">
                Back to West Coast districts
              </a>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                {region.profile.eyebrow}
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                {region.profile.label} campsites
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
                {region.profile.summary}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoPill label="From KK" value={region.profile.driveFromKK} />
              <InfoPill label="Campsites" value={String(region.spots.length)} />
              <InfoPill label="Good for" value={region.profile.bestFor} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <SectionHeading
          small="Campsites In This District"
          big="Open a campsite card to see AFFT's advice."
          text="Photos and names are shown first for quick browsing. The detail page gives fit, watch-outs, gear ideas, fees and WhatsApp enquiry."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {region.spots.map((spot) => (
            <CampsiteTile key={spot.slug} spot={spot} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-4 md:px-10">
        <PageFinalCta
          title={`Need help choosing within ${region.profile.label}?`}
          text="Send AFFT your date, group size and comfort level. We can help shortlist a West Coast campsite and suggest what gear to bring or rent."
          message={`Hi AFFT, I want help choosing a campsite in ${region.profile.label}.`}
          buttonLabel="WhatsApp AFFT About This District"
        />
      </section>

      <SiteFooter />
    </main>
  );
}

function CampsiteTile({
  spot,
}: {
  spot: (typeof campsiteRegions)[number]["spots"][number];
}) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/45">
      <a href={spot.href} className="block">
        {spot.photoUrl ? (
          <img
            src={spot.photoUrl}
            alt={`${spot.name} campsite photo`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-52 w-full bg-black/25 object-cover"
          />
        ) : (
          <MissingPhotoFrame label={spot.name} />
        )}

        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#F3922B] px-3 py-1 text-xs font-bold text-black">
              {spot.driveFromKK}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/60">
              {spot.sourceStatus === "web"
                ? "Public info"
                : spot.sourceStatus === "community"
                  ? "Photo available"
                  : spot.sourceStatus === "map"
                    ? "Map listed"
                    : "Listed spot"}
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold">{spot.name}</h2>
          <p className="mt-2 text-sm text-white/55">{spot.location}</p>
          <p className="mt-4 min-h-[72px] leading-7 text-white/68">
            {spot.highlight}
          </p>
          <span className="mt-5 inline-flex font-bold text-[#F3922B] group-hover:text-white">
            View AFFT advice
          </span>
        </div>
      </a>

      <div className="border-t border-white/10 px-5 pb-5 pt-4">
        <a
          href={makeCampsiteWhatsappLink(spot.name)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full justify-center rounded-full border border-[#F3922B]/50 px-5 py-3 text-sm font-bold text-[#F3922B] transition hover:bg-[#F3922B] hover:text-black"
        >
          Ask AFFT about this campsite
        </a>
      </div>
    </article>
  );
}

function MissingPhotoFrame({ label }: { label: string }) {
  return (
    <div className="relative flex h-52 items-center justify-center bg-[#182015] text-5xl font-bold text-white/20">
      <span>{label.slice(0, 2)}</span>
      <span className="absolute bottom-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
        Photo pending
      </span>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
        {label}
      </p>
      <p className="mt-2 leading-7 text-white/75">{value}</p>
    </div>
  );
}
