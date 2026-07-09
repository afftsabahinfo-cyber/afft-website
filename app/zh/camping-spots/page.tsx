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
  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
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
              <StatCard value={String(campsiteStats.regions)} label="个区域" />
              <StatCard value={String(campsiteStats.total)} label="个营地" />
              <StatCard value="WhatsApp" label="协助安排" />
            </div>
          </div>
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
          查看这个区域
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
