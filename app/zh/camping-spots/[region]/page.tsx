import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  campsiteRegions,
  makeZhCampsiteWhatsappLink,
} from "@/lib/campsite-guide-data";
import {
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";

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
      title: "沙巴营地指南 | AFFT",
    };
  }

  return {
    title: `${region.profile.zhLabel} 营地 | AFFT 沙巴指南`,
    description: region.profile.zhSummary,
    alternates: {
      canonical: `/zh/camping-spots/${region.id}`,
      languages: {
        en: `/camping-spots/${region.id}`,
        "zh-Hans": `/zh/camping-spots/${region.id}`,
      },
    },
  };
}

export default async function ZhCampsiteRegionPage({ params }: PageProps) {
  const { region: regionId } = await params;
  const region = campsiteRegions.find((item) => item.id === regionId);

  if (!region) {
    notFound();
  }

  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav enHref={`/camping-spots/${region.id}`} />

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <a href="/zh/camping-spots" className="text-sm font-bold text-[#F3922B]">
                返回 West Coast district
              </a>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                {region.profile.eyebrow}
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                {region.profile.zhLabel} 营地
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
                {region.profile.zhSummary}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoPill label="从 KK 出发" value={region.profile.driveFromKK} />
              <InfoPill label="营地数量" value={String(region.spots.length)} />
              <InfoPill label="适合对象" value={region.profile.zhBestFor} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <ZhSectionHeading
          small="这个 district 的营地"
          big="点进营地卡片，查看 AFFT 的实用建议。"
          text="这里先显示照片和营地名称，方便快速浏览。单个营地页会再说明适合对象、注意事项、装备建议、费用和 WhatsApp 咨询入口。"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {region.spots.map((spot) => (
            <CampsiteTile key={spot.slug} spot={spot} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-4 md:px-10">
        <ZhPageFinalCta
          title={`想在 ${region.profile.zhLabel} 里面选一个营地？`}
          text="发送日期、人数和舒适度要求给 AFFT，我们可以帮你缩小 West Coast 营地选择，并建议需要准备什么装备。"
          message={`你好 AFFT，我想请你帮我选择 ${region.profile.zhLabel} 的营地。`}
          buttonLabel="WhatsApp 问这个 District"
        />
      </section>

      <ZhSiteFooter />
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
      <a href={spot.zhHref} className="block">
        {spot.photoUrl ? (
          <img
            src={spot.photoUrl}
            alt={`${spot.name} 营地照片`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-52 w-full bg-black/25 object-cover"
          />
        ) : (
          <div className="flex h-52 items-center justify-center bg-[#182015] text-5xl font-bold text-white/20">
            {spot.name.slice(0, 2)}
          </div>
        )}

        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#F3922B] px-3 py-1 text-xs font-bold text-black">
              {spot.driveFromKK}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/60">
              {spot.sourceStatus === "web"
                ? "公开资料"
                : spot.sourceStatus === "community"
                  ? "有照片"
                  : "营地名单"}
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold">{spot.name}</h2>
          <p className="mt-2 text-sm text-white/55">{spot.location}</p>
          <p className="mt-4 min-h-[72px] leading-7 text-white/68">
            {regionHighlight(spot)}
          </p>
          <span className="mt-5 inline-flex font-bold text-[#F3922B] group-hover:text-white">
            查看 AFFT 建议
          </span>
        </div>
      </a>

      <div className="border-t border-white/10 px-5 pb-5 pt-4">
        <a
          href={makeZhCampsiteWhatsappLink(spot.name)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full justify-center rounded-full border border-[#F3922B]/50 px-5 py-3 text-sm font-bold text-[#F3922B] transition hover:bg-[#F3922B] hover:text-black"
        >
          WhatsApp 问这个营地
        </a>
      </div>
    </article>
  );
}

function regionHighlight(spot: (typeof campsiteRegions)[number]["spots"][number]) {
  const region = campsiteRegions.find((item) => item.id === spot.region);
  return region?.profile.zhHighlight ?? spot.highlight;
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
