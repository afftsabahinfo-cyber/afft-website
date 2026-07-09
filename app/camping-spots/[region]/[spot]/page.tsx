import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  campsiteRegions,
  campsiteSpots,
  getCampsiteSpot,
  makeCampsiteWhatsappLink,
  type CampsiteSpot,
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
    spot: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return campsiteSpots.map((spot) => ({
    region: spot.region,
    spot: spot.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, spot: spotSlug } = await params;
  const spot = getCampsiteSpot(region, spotSlug);

  if (!spot) {
    return {
      title: "Sabah Campsite | AFFT",
    };
  }

  return {
    title: `${spot.name} | AFFT Sabah Campsite Guide`,
    description: `${spot.name} campsite fit, drive time, gear suggestion and AFFT WhatsApp planning advice.`,
    alternates: {
      canonical: spot.href,
      languages: {
        en: spot.href,
        "zh-Hans": spot.zhHref,
      },
    },
    openGraph: {
      title: `${spot.name} | AFFT Sabah Campsite Guide`,
      description: spot.highlight,
      images: spot.photoUrl
        ? [
            {
              url: spot.photoUrl,
              alt: `${spot.name} campsite photo`,
            },
          ]
        : undefined,
    },
  };
}

export default async function CampsiteSpotPage({ params }: PageProps) {
  const { region: regionId, spot: spotSlug } = await params;
  const spot = getCampsiteSpot(regionId, spotSlug);
  const region = campsiteRegions.find((item) => item.id === regionId);

  if (!spot || !region) {
    notFound();
  }

  const nearbySpots = region.spots
    .filter((item) => item.slug !== spot.slug)
    .slice(0, 3);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${spot.name} | AFFT Sabah Campsite Guide`,
      url: `${siteUrl}${spot.href}`,
      description: `${spot.name} campsite fit, drive time, gear suggestion and AFFT WhatsApp planning advice.`,
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        name: "AFFT",
        url: siteUrl,
      },
      about: ["Sabah camping", `${spot.name} campsite`, `${region.profile.label} campsite`],
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
        {
          "@type": "ListItem",
          position: 3,
          name: spot.name,
          item: `${siteUrl}${spot.href}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Campground",
      name: spot.name,
      url: `${siteUrl}${spot.href}`,
      image: spot.photoUrl,
      description: spot.highlight,
      address: {
        "@type": "PostalAddress",
        addressLocality: spot.location,
        addressRegion: "Sabah",
        addressCountry: "MY",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: `${region.profile.label}, Sabah West Coast Division`,
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Drive from Kota Kinabalu",
          value: spot.driveFromKK,
        },
        {
          "@type": "PropertyValue",
          name: "Best for",
          value: spot.bestFor,
        },
        {
          "@type": "PropertyValue",
          name: "AFFT gear suggestion",
          value: spot.gearSuggestion,
        },
      ],
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
          <SiteTopNav zhHref={spot.zhHref} />

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <a
                href={`/camping-spots/${region.id}`}
                className="text-sm font-bold text-[#F3922B]"
              >
                Back to {region.profile.label} campsites
              </a>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                {region.profile.label} campsite
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                {spot.name}
              </h1>
              <p className="mt-4 text-white/55">{spot.location}</p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
                {getAfftFitText(spot)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={makeCampsiteWhatsappLink(spot.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#F3922B] px-7 py-4 font-bold text-black"
                >
                  WhatsApp AFFT About This Campsite
                </a>
                <a
                  href={`/camping-spots/${region.id}`}
                  className="rounded-full border border-white/15 px-7 py-4 font-bold text-white"
                >
                  View District List
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              {spot.photoUrl ? (
                <img
                  src={spot.photoUrl}
                  alt={`${spot.name} campsite photo`}
                  referrerPolicy="no-referrer"
                  className="h-[360px] w-full object-cover md:h-[460px]"
                />
              ) : (
                <MissingPhotoFrame
                  label={spot.name}
                  className="h-[360px] text-6xl md:h-[460px]"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] bg-[#182015] p-8 md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              AFFT Advice
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              How to think about this campsite
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              {getAfftAdvice(spot)}
            </p>
          </article>

          <div className="grid gap-4">
            <InfoPill label="From KK" value={spot.driveFromKK} />
            <InfoPill label="Best for" value={spot.bestFor} />
            <InfoPill label="Gear idea" value={spot.gearSuggestion} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-10 md:grid-cols-2 md:px-10 xl:grid-cols-4">
        <DetailBlock title="Highlight" text={spot.highlight} />
        <DetailBlock title="Watch out" text={spot.watchOut} />
        <DetailBlock title="Camp fee" text={spot.feeNote} />
        <DetailBlock title="Entrance" text={spot.entranceNote} />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 md:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
            Public Information
          </p>
          <p className="mt-4 leading-7 text-white/65">
            Campsite rules, fees and available lots can change. Ask AFFT to help
            confirm the practical details before you travel.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {spot.sourceUrl ? (
              <a
                href={spot.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/70 hover:text-white"
              >
                View listed source
              </a>
            ) : null}
            {spot.facebookUrl ? (
              <a
                href={spot.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/70 hover:text-white"
              >
                View public campsite page
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {nearbySpots.length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          <SectionHeading
            small="Same District"
            big={`Other ${region.profile.label} campsites`}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {nearbySpots.map((item) => (
              <a
                key={item.slug}
                href={item.href}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/45"
              >
                {item.photoUrl ? (
                  <img
                    src={item.photoUrl}
                    alt={`${item.name} campsite photo`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-36 w-full object-cover"
                  />
                ) : (
                  <MissingPhotoFrame label={item.name} className="h-36 text-3xl" />
                )}
                <div className="p-5">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="mt-2 text-sm text-white/55">{item.location}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-10">
        <PageFinalCta
          title={`Want to check ${spot.name}?`}
          text="Send your date, group size, comfort level and gear needs. AFFT can help you check if this campsite fits your plan."
          message={`Hi AFFT, I want to check whether ${spot.name} is suitable for my camping trip.`}
          buttonLabel="WhatsApp AFFT About This Campsite"
        />
      </section>

      <SiteFooter />
    </main>
  );
}

function MissingPhotoFrame({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center bg-[#182015] font-bold text-white/20 ${className}`}
    >
      <span>{label.slice(0, 2)}</span>
      <span className="absolute bottom-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
        Photo pending
      </span>
    </div>
  );
}

function getAfftFitText(spot: CampsiteSpot) {
  return `${spot.name} is about ${spot.driveFromKK}. Open this page to see the practical fit, watch-outs and gear direction before you ask AFFT to confirm.`;
}

function getAfftAdvice(spot: CampsiteSpot) {
  return `This campsite should be checked by date, weather and group comfort. AFFT looks at the route, setup space, rain risk, comfort level and gear needs before suggesting whether ${spot.name} fits your trip.`;
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
        {label}
      </p>
      <p className="mt-2 leading-7 text-white/75">{value}</p>
    </div>
  );
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-white/70">{text}</p>
    </article>
  );
}
