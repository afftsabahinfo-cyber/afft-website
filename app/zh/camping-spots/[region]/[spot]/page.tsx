import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  campsiteRegionProfiles,
  campsiteRegions,
  campsiteSpots,
  getCampsiteSpot,
  getZhCampsitePhotoCredit,
  makeZhCampsiteWhatsappLink,
  type CampsiteSpot,
} from "@/lib/campsite-guide-data";
import {
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";

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
      title: "沙巴营地 | AFFT",
    };
  }

  const isClosed = spot.status === "closed";

  return {
    title: isClosed
      ? `${spot.name} 已关闭 | AFFT 沙巴营地指南`
      : `${spot.name} | AFFT 沙巴营地指南`,
    description: isClosed
      ? `${spot.name} 已标记为关闭。可以询问 AFFT 推荐其他还在营业的 Kokol 或 Kota Kinabalu 山区营地。`
      : `${spot.name} 的车程、适合对象、装备建议和 AFFT WhatsApp 咨询建议。`,
    alternates: {
      canonical: spot.zhHref,
      languages: {
        en: spot.href,
        "zh-Hans": spot.zhHref,
      },
    },
    openGraph: {
      title: `${spot.name} | AFFT 沙巴营地指南`,
      description: spot.highlight,
      images: spot.photoUrl
        ? [
            {
              url: spot.photoUrl,
              alt: `${spot.name} 营地照片`,
            },
          ]
        : undefined,
    },
  };
}

export default async function ZhCampsiteSpotPage({ params }: PageProps) {
  const { region: regionId, spot: spotSlug } = await params;
  const spot = getCampsiteSpot(regionId, spotSlug);
  const region = campsiteRegions.find((item) => item.id === regionId);
  const profile = campsiteRegionProfiles[regionId as keyof typeof campsiteRegionProfiles];

  if (!spot || !region || !profile) {
    notFound();
  }

  const isClosed = spot.status === "closed";
  const nearbySpots = region.spots
    .filter((item) => item.slug !== spot.slug)
    .slice(0, 3);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: isClosed
        ? `${spot.name} 已关闭 | AFFT 沙巴营地指南`
        : `${spot.name} | AFFT 沙巴营地指南`,
      url: `${siteUrl}${spot.zhHref}`,
      description: isClosed
        ? `${spot.name} 已标记为关闭。可以询问 AFFT 推荐其他还在营业的 Kokol 或 Kota Kinabalu 山区营地。`
        : `${spot.name} 的车程、适合对象、装备建议和 AFFT WhatsApp 咨询建议。`,
      inLanguage: "zh-Hans",
      isPartOf: {
        "@type": "WebSite",
        name: "AFFT",
        url: siteUrl,
      },
      about: ["沙巴露营", `${spot.name} 营地`, `${profile.zhLabel} 营地`],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Camp Spots",
          item: `${siteUrl}/zh/camping-spots`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${profile.zhLabel} 营地`,
          item: `${siteUrl}/zh/camping-spots/${region.id}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: spot.name,
          item: `${siteUrl}${spot.zhHref}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Campground",
      name: spot.name,
      url: `${siteUrl}${spot.zhHref}`,
      image: spot.photoUrl,
      description: profile.zhHighlight,
      address: {
        "@type": "PostalAddress",
        addressLocality: spot.location,
        addressRegion: "Sabah",
        addressCountry: "MY",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: `${profile.zhLabel}, Sabah West Coast Division`,
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "目前状态",
          value: isClosed ? "已关闭" : "出发前向营地方确认",
        },
        {
          "@type": "PropertyValue",
          name: "从 Kota Kinabalu 出发",
          value: spot.driveFromKK,
        },
        {
          "@type": "PropertyValue",
          name: "适合对象",
          value: profile.zhBestFor,
        },
        {
          "@type": "PropertyValue",
          name: "AFFT 装备建议",
          value: profile.zhGearSuggestion,
        },
      ],
    },
  ];

  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav enHref={spot.href} />

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <a
                href={`/zh/camping-spots/${region.id}`}
                className="text-sm font-bold text-[#F3922B]"
              >
                返回 {profile.zhLabel} 营地
              </a>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                {profile.zhLabel} 营地
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                {spot.name}
              </h1>
              <p className="mt-4 text-white/55">{spot.location}</p>
              {isClosed ? (
                <div className="mt-5 inline-flex rounded-full border border-red-400/45 bg-red-500/12 px-4 py-2 text-sm font-bold text-red-100">
                  已关闭
                </div>
              ) : null}
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
                {isClosed
                  ? getZhClosedAfftFitText(spot, profile.zhLabel)
                  : getZhAfftFitText(spot)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={
                    isClosed
                      ? makeZhCampsiteWhatsappLink(
                          `${profile.zhLabel} 还在营业的替代营地`
                        )
                      : makeZhCampsiteWhatsappLink(spot.name)
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#F3922B] px-7 py-4 font-bold text-black"
                >
                  {isClosed ? "WhatsApp 问替代营地" : "WhatsApp 问这个营地"}
                </a>
                <a
                  href={`/zh/camping-spots/${region.id}`}
                  className="rounded-full border border-white/15 px-7 py-4 font-bold text-white"
                >
                  返回 district 列表
                </a>
              </div>
            </div>

            <figure className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              {spot.photoUrl ? (
                <>
                  <img
                    src={spot.photoUrl}
                    alt={`${spot.name} 营地照片`}
                    referrerPolicy="no-referrer"
                    className="h-[360px] w-full object-cover md:h-[460px]"
                  />
                  <PhotoCredit text={getZhCampsitePhotoCredit(spot)} />
                </>
              ) : (
                <MissingPhotoFrame
                  label={spot.name}
                  className="h-[360px] text-6xl md:h-[460px]"
                />
              )}
            </figure>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] bg-[#182015] p-8 md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              AFFT 建议
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              这个营地应该怎么判断
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              {getZhAfftAdvice(spot)}
            </p>
          </article>

          <div className="grid gap-4">
            {isClosed ? <InfoPill label="目前状态" value="已关闭" /> : null}
            <InfoPill label="从 KK 出发" value={spot.driveFromKK} />
            <InfoPill label="适合对象" value={profile.zhBestFor} />
            <InfoPill label="装备建议" value={profile.zhGearSuggestion} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-10 md:grid-cols-2 md:px-10 xl:grid-cols-4">
        <DetailBlock
          title={isClosed ? "目前状态" : "亮点"}
          text={
            isClosed
              ? (spot.zhStatusNote ?? "这个营地目前已标记为关闭。")
              : profile.zhHighlight
          }
        />
        <DetailBlock title="注意" text={profile.zhWatchOut} />
        <DetailBlock title="营地费" text={spot.feeNote} />
        <DetailBlock title="入场费" text={spot.entranceNote} />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 md:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
            公开资料
          </p>
          <p className="mt-4 leading-7 text-white/65">
            {isClosed
              ? "这个营地目前不再当成 AFFT 可推荐选项，因为公开资料显示已经关闭。出发前请先询问 AFFT 其他还在营业的替代营地。"
              : "营地规则、费用和营位状态可能会变。出发前建议先通过 WhatsApp 让 AFFT 协助确认实际细节。"}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {spot.sourceUrl ? (
              <a
                href={spot.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/70 hover:text-white"
              >
                查看资料来源
              </a>
            ) : null}
            {spot.facebookUrl ? (
              <a
                href={spot.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/70 hover:text-white"
              >
                查看营地公开页面
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {nearbySpots.length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          <ZhSectionHeading
            small="同一 district"
            big={`${profile.zhLabel} 的其他营地`}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {nearbySpots.map((item) => (
              <a
                key={item.slug}
                href={item.zhHref}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/45"
              >
                {item.photoUrl ? (
                  <figure className="relative">
                    <img
                      src={item.photoUrl}
                      alt={`${item.name} 营地照片`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-36 w-full object-cover"
                    />
                    <PhotoCredit text={getZhCampsitePhotoCredit(item)} compact />
                  </figure>
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
        <ZhPageFinalCta
          title={
            isClosed
              ? `${spot.name} 已标记为关闭。`
              : `想确认 ${spot.name} 适不适合？`
          }
          text={
            isClosed
              ? "发送日期、人数和舒适度要求给 AFFT，我们可以推荐其他还在营业的 Kokol 或 Kota Kinabalu 山区营地。"
              : "发送日期、人数、舒适度要求和需要的装备给 AFFT，我们可以帮你判断这个营地是否适合你的计划。"
          }
          message={
            isClosed
              ? `你好 AFFT，我看到 ${spot.name} 已关闭。可以推荐其他还在营业的 Kokol 或 Kota Kinabalu 山区营地吗？`
              : `你好 AFFT，我想确认 ${spot.name} 适不适合我的露营计划。`
          }
          buttonLabel={isClosed ? "WhatsApp 问替代营地" : "WhatsApp 问这个营地"}
        />
      </section>

      <ZhSiteFooter />
    </main>
  );
}

function PhotoCredit({
  text,
  compact = false,
}: {
  text?: string;
  compact?: boolean;
}) {
  if (!text) {
    return null;
  }

  return (
    <figcaption
      className={`absolute left-3 right-3 rounded-full bg-black/55 px-3 py-1 font-bold text-white/70 backdrop-blur ${
        compact ? "bottom-3 text-[9px]" : "bottom-4 text-[11px]"
      }`}
    >
      {text}
    </figcaption>
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
      <span className="absolute bottom-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-white/55">
        照片待补
      </span>
    </div>
  );
}

function getZhAfftFitText(spot: CampsiteSpot) {
  return `${spot.name} 从 KK 出发大约是 ${spot.driveFromKK}。进入这个页面后，可以先看适合对象、注意事项和装备方向，再让 AFFT 协助确认。`;
}

function getZhClosedAfftFitText(spot: CampsiteSpot, regionLabel: string) {
  return `${spot.name} 已根据 AFFT 最新检查标记为关闭。保留这个页面，是为了避免客人继续安排一个已经不可用的营地。你可以询问 AFFT 其他还在营业的 ${regionLabel} 替代营地。`;
}

function getZhAfftAdvice(spot: CampsiteSpot) {
  return `这个营地建议按日期、天气和团队舒适度来判断。AFFT 会先看路程、营位空间、下雨风险、舒适度和装备需求，再建议 ${spot.name} 是否适合你的行程。`;
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
