import type { Metadata } from "next";
import {
  campsiteRegions,
  campsiteStats,
} from "@/lib/campsite-guide-data";
import {
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";

const siteUrl = "https://afft.club";

const campsiteFaqs = [
  {
    question: "第一次露营，应该先看 Sabah West Coast Division 哪个 district？",
    answer:
      "如果想车程短，可以先看 Kota Kinabalu / Kokol 或 Tuaran / Kiulu。Kokol 比较像近郊山上营地，Kiulu 比较偏山谷和河边感觉。",
  },
  {
    question: "为什么 Kundasang 的营地放在 Ranau？",
    answer:
      "因为 Kundasang 属于 Ranau district。为了符合 West Coast Division 的分组，Kundasang 和 Mesilau 一带的营地会放在 Ranau 页面。",
  },
  {
    question: "Kota Belud、Ranau、Papar 应该怎么选？",
    answer:
      "Kota Belud 适合河边和神山景；Ranau 适合 Kundasang 高地、凉爽天气和 Glamping；Papar 适合海边日落、河边家庭活动和往南短途路线。",
  },
  {
    question: "这个页面是营地预订系统吗？",
    answer:
      "不是。这个页面是 AFFT 的营地筛选和建议入口，帮助客人先了解区域、照片、车程、适合对象和装备方向，最后通过 WhatsApp 询问 AFFT。",
  },
];

const districtGuides = [
  {
    regionId: "kota-kinabalu",
    title: "Kota Kinabalu 与 Kokol 近郊营地",
    text: "适合短车程、第一次露营、山上空气和快速过夜安排。",
  },
  {
    regionId: "tuaran",
    title: "Tuaran 与 Kiulu 河边营地",
    text: "适合山谷、河边活动、乡村感和不想跑太远的轻露营。",
  },
  {
    regionId: "kota-belud",
    title: "Kota Belud 河边与神山景营地",
    text: "适合更强户外感、朋友家庭、清澈河流和 Mount Kinabalu 景色。",
  },
  {
    regionId: "ranau",
    title: "Ranau、Kundasang 与 Mesilau 高地营地",
    text: "适合凉爽天气、Glamping、日出、神山景和高地慢旅行。",
  },
  {
    regionId: "papar",
    title: "Papar 海边与河边营地",
    text: "适合海边日落、南向短途路线、家庭河边活动和低地露营。",
  },
] as const;

export const metadata: Metadata = {
  title: "沙巴西海岸省营地指南 | AFFT",
  description:
    "AFFT 沙巴 West Coast Division 营地指南，先按 district 选择，再查看每个营地照片、适合对象、装备建议和 WhatsApp 咨询入口。",
  alternates: {
    canonical: "/zh/camping-spots",
    languages: {
      en: "/camping-spots",
      "zh-Hans": "/zh/camping-spots",
    },
  },
};

export default function ZhCampingSpotsPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "沙巴西海岸省营地指南 | AFFT",
      url: `${siteUrl}/zh/camping-spots`,
      description: metadata.description,
      inLanguage: "zh-Hans",
      isPartOf: {
        "@type": "WebSite",
        name: "AFFT",
        url: siteUrl,
      },
      about: [
        "沙巴露营",
        "Sabah West Coast Division campsites",
        "Kota Kinabalu campsite",
        "Kundasang campsite",
        "Kiulu campsite",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Sabah West Coast Division 营地 district",
      itemListElement: campsiteRegions.map((region, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${region.profile.zhLabel} 营地`,
        url: `${siteUrl}/zh/camping-spots/${region.id}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: campsiteFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section
        className="relative bg-cover bg-center px-6 py-8 md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,20,15,.98), rgba(16,20,15,.78), rgba(16,20,15,.36)), url(/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-cover.webp)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav enHref="/camping-spots" />

          <div className="grid gap-10 py-18 lg:grid-cols-[1.05fr_0.95fr] lg:items-end md:py-24">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                沙巴西海岸省营地指南
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                先选 West Coast district，再看营地照片和建议。
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76 md:text-xl">
                Camp Spots 只整理 Sabah West Coast Division 的营地。Kokol 归在 Kota
                Kinabalu，Kiulu 归在 Tuaran，Kundasang 归在 Ranau，另外还有 Kota
                Belud 和 Papar。
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={makeWhatsappLink(
                    "你好 AFFT，我想请你帮我选择 Sabah West Coast Division 适合的营地。"
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
                >
                  WhatsApp 问 AFFT
                </a>
                <a
                  href="#areas"
                  className="rounded-full border border-white/30 bg-black/25 px-8 py-4 font-bold text-white"
                >
                  查看 District
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard value={String(campsiteStats.regions)} label="个 district" />
              <StatCard value={String(campsiteStats.total)} label="个营地" />
              <StatCard value="WhatsApp" label="协助安排" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 pt-2 md:px-10">
        <ZhSectionHeading
          small="营地搜索指南"
          big="用 district、车程和露营感觉来找营地。"
          text="这个页面是给搜索 Kota Kinabalu、Kokol、Kiulu、Kota Belud、Kundasang、Ranau 和 Papar 营地的客人使用。先选对 district，再继续看营地卡片。"
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {districtGuides.map((guide) => {
            const region = campsiteRegions.find(
              (item) => item.id === guide.regionId
            );

            if (!region) {
              return null;
            }

            return (
              <a
                key={guide.regionId}
                href={`/zh/camping-spots/${region.id}`}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-[#F3922B]/45"
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F3922B]">
                  {region.spots.length} 个营地
                </p>
                <h2 className="mt-3 text-xl font-bold">{guide.title}</h2>
                <p className="mt-3 leading-7 text-white/68">{guide.text}</p>
              </a>
            );
          })}
        </div>
      </section>

      <section id="areas" className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <ZhSectionHeading
          small="选择 District"
          big="按 West Coast Division 的 district 来分组。"
          text="点进 district 后，会先看到该区的营地照片和卡片。再点单个营地，才进入 AFFT 的实用建议和更多资料。"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {campsiteRegions.map((region) => (
            <RegionCard key={region.id} region={region} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <ZhSectionHeading
          small="常见问题"
          big="先看答案，再进入营地卡片。"
          text="这些答案帮助客人更快决定要继续浏览哪个 district，再通过 WhatsApp 询问 AFFT。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {campsiteFaqs.map((item) => (
            <article
              key={item.question}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-xl font-bold">{item.question}</h2>
              <p className="mt-3 leading-7 text-white/70">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-[#182015] p-7 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
            AFFT 怎么帮你
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <InfoBlock
              title="先选 District"
              text="先按 West Coast district 缩小范围，再用车程、山景、河边、海边、凉爽高地或近郊过夜来比较。"
            />
            <InfoBlock
              title="再看营地"
              text="每个 district 页面会用照片卡片展示营地，方便你快速比较感觉和适合对象。"
            />
            <InfoBlock
              title="最后问 AFFT"
              text="把日期、人数和舒适度要求发给我们，我们帮你确认营地、装备、交通和天气适合度。"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-10">
        <ZhPageFinalCta
          title="还不确定哪个 District 适合？"
          text="发送日期、人数和舒适度要求给 AFFT，我们会先帮你判断应该从哪个 West Coast district 开始看。"
          message="你好 AFFT，我想请你帮我选择适合的 Sabah West Coast Division 营地。"
          buttonLabel="WhatsApp 询问营地"
        />
      </section>

      <ZhSiteFooter />
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
      href={`/zh/camping-spots/${region.id}`}
      className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/45"
    >
      <div className="grid h-44 grid-cols-3 gap-1 bg-black/25 p-1">
        {previewPhotos.length > 0 ? (
          previewPhotos.map((photo, index) => (
            <img
              key={`${photo}-${index}`}
              src={photo}
              alt={`${region.profile.zhLabel} 营地预览 ${index + 1}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full rounded-[1rem] object-cover"
            />
          ))
        ) : (
          <div className="col-span-3 flex items-center justify-center rounded-[1rem] bg-[#182015] text-sm font-bold text-white/55">
            营地照片整理中
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F3922B]">
            {region.spots.length} 个营地
          </p>
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/60">
            {region.profile.driveFromKK}
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold">{region.profile.zhLabel}</h2>
        <p className="mt-3 min-h-[84px] leading-7 text-white/68">
          {region.profile.zhSummary}
        </p>
        <span className="mt-5 inline-flex font-bold text-[#F3922B] group-hover:text-white">
          查看这个 district
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
