import type { Metadata } from "next";
import {
  campsiteRegionProfiles,
  campsiteRegionTabs,
  campsiteRegions,
  campsiteStats,
  makeZhCampsiteWhatsappLink,
  type CampsiteSpot,
} from "@/lib/campsite-guide-data";
import {
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";

export const metadata: Metadata = {
  title: "沙巴营地指南 | AFFT",
  description:
    "AFFT 沙巴营地指南，按 KK-Kokol、Kota Belud、Kundasang、Ranau、Kiulu 和 Papar 分类，帮助访客通过 WhatsApp 询问营地、装备和交通。",
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

          <div className="grid gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end md:py-28">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                沙巴营地指南
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                先选适合的营地区域，再安排装备和交通。
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76 md:text-xl">
                这份指南按 KK-Kokol、Kota Belud、Kundasang、Ranau、Kiulu 和
                Papar 分类。你可以先比较车程、风景、适合对象和装备方向，
                再通过 WhatsApp 让 AFFT 协助确认实际安排。
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={makeWhatsappLink(
                    "你好 AFFT，我想请你帮我选择 Kota Kinabalu 附近的营地。"
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
                >
                  WhatsApp 问 AFFT
                </a>
                <a
                  href="#regions"
                  className="rounded-full border border-white/30 bg-black/25 px-8 py-4 font-bold text-white"
                >
                  查看区域
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard value={String(campsiteStats.total)} label="个营地资料" />
              <StatCard value={String(campsiteStats.regions)} label="个区域分类" />
              <StatCard
                value={String(campsiteStats.webBacked)}
                label="个网络确认重点"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="regions" className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <ZhSectionHeading
          small="区域分类"
          big="按区域快速找到适合你的露营地点。"
          text="先看车程、环境感觉和适合对象，再把日期、人数和舒适度要求发给 AFFT，我们会协助你配营地、装备和交通。"
        />

        <div className="flex flex-wrap gap-3">
          {campsiteRegionTabs.map((region) => (
            <a
              key={region.id}
              href={region.id === "all" ? "#all" : `#${region.id}`}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-[#F3922B]/50 hover:text-[#F3922B]"
            >
              {region.zhLabel}
            </a>
          ))}
        </div>
      </section>

      <section id="all" className="bg-[#182015] px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSectionHeading
            small="使用方式"
            big="不同营地，适合不同的旅行方式。"
            text="高地、河边、海边和山坡营地的天气、路况和舒适度都不一样。出发前可以让 AFFT 帮你确认当前费用、路况、营位和装备需求。"
          />

          <div className="grid gap-4 md:grid-cols-3">
            <InfoBlock
              title="看感觉"
              text="先用照片和区域说明判断你想要山景、河边、海边、凉爽高地，还是比较轻松的近郊过夜。"
            />
            <InfoBlock
              title="配装备"
              text="告诉我们你需要帐篷、营椅、灯、厨房组、拍摄设备或包车，我们会按营地环境建议组合。"
            />
            <InfoBlock
              title="出发前确认"
              text="营地规则、天气和收费可能会变。把日期和人数发给 AFFT，我们帮你确认比较稳妥。"
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
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                {profile.zhLabel}
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/70">
                {profile.zhSummary}
              </p>
              <div className="mt-6 grid gap-3">
                <InfoPill label="从 KK 出发" value={profile.driveFromKK} />
                <InfoPill label="适合对象" value={profile.zhBestFor} />
                <InfoPill label="装备建议" value={profile.zhGearSuggestion} />
              </div>
            </div>

            <div className="grid gap-4">
              {spots.map((spot) => (
                <ZhCampsiteCard key={spot.name} spot={spot} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-4 md:px-10">
        <ZhPageFinalCta
          title="想让 AFFT 帮你配营地、装备和交通？"
          text="发送日期、人数、想去的区域和舒适度要求给 AFFT，我们会通过 WhatsApp 建议比较实际的营地方向和装备组合。"
          message="你好 AFFT，我想请你帮我配沙巴露营的营地、装备和交通。"
          buttonLabel="WhatsApp 询问营地"
        />
      </section>

      <ZhSiteFooter />
    </main>
  );
}

function ZhCampsiteCard({ spot }: { spot: CampsiteSpot }) {
  const profile = campsiteRegionProfiles[spot.region];
  const previewImageUrl = getFacebookPreviewImage(spot.facebookUrl);

  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
      {previewImageUrl ? (
        <div className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
          <img
            src={previewImageUrl}
            alt={`${spot.name} Facebook 公开照片`}
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
                ? "公开资料"
                : spot.sourceStatus === "community"
                  ? "有照片"
                  : "营地名单"}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-bold">{spot.name}</h3>
          <p className="mt-2 text-sm text-white/55">{spot.location}</p>
        </div>

        <a
          href={makeZhCampsiteWhatsappLink(spot.name)}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-full border border-[#F3922B]/50 px-5 py-3 text-sm font-bold text-[#F3922B] transition hover:bg-[#F3922B] hover:text-black"
        >
          问 AFFT
        </a>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#F3922B]/25 bg-[#F3922B]/10 p-4 md:col-span-2">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F3922B]">
            适合这样安排
          </p>
          <p className="mt-2 leading-7 text-white/76">{getZhAfftView(spot)}</p>
        </div>
        <DetailItem label="适合对象" value={profile.zhBestFor} />
        <DetailItem label="亮点" value={profile.zhHighlight} />
        <DetailItem label="注意" value={profile.zhWatchOut} />
        <DetailItem label="装备建议" value={profile.zhGearSuggestion} />
      </div>

      <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 text-sm leading-7 text-white/62 md:grid-cols-3">
        <p>
          <span className="font-bold text-white">营地费：</span>
          {spot.feeNote}
        </p>
        <p>
          <span className="font-bold text-white">入场费：</span>
          {spot.entranceNote}
        </p>
        <p>
          <span className="font-bold text-white">照片：</span>
          {profile.zhPhotoNote}
        </p>
      </div>

      <div className="mt-4 text-sm text-white/50">
        更多资料：
        {spot.sourceUrl ? (
          <a
            href={spot.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#F3922B] hover:text-white"
          >
            {translateSourceLabel(spot.sourceStatus)}
          </a>
        ) : (
          translateSourceLabel(spot.sourceStatus)
        )}
      </div>

      {spot.facebookUrl ? (
        <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs leading-6 text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <span>营地公开资料可能会不定期更新。</span>
          <a
            href={spot.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-white/55 underline underline-offset-4 hover:text-[#F3922B]"
          >
            查看营地公开页面
          </a>
        </div>
      ) : null}
    </article>
  );
}

function getZhAfftView(spot: CampsiteSpot) {
  return `${spot.name} 从 KK 出发大约是 ${spot.driveFromKK}。建议先确认路况、天气、团队舒适度和装备组合，再决定是否安排这个营地。`;
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

function translateSourceLabel(status: CampsiteSpot["sourceStatus"]) {
  if (status === "web") {
    return "网络公开资料 + AFFT CSV";
  }

  if (status === "community") {
    return "公开照片参考";
  }

  return "AFFT 2025 年 3 月 CSV";
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
      <p className="mt-2 leading-7 text-white/75">{value}</p>
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
