import type { Metadata } from "next";
import { ZhWhatsAppEnquiryBuilder } from "@/components/ZhWhatsAppEnquiryBuilder";
import {
  ZhInfoCard,
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";
import { zhTravelServices } from "@/lib/zh-site-data";

export const metadata: Metadata = {
  title: "沙巴私人行程 | AFFT Club",
  description:
    "AFFT 中文私人行程页面，适合昆达山、山打根、小团队、家庭、自然路线和露营加项。通过 WhatsApp 规划路线。",
  alternates: {
    canonical: "/zh/private-tours",
    languages: {
      en: "/private-tours",
      "zh-Hans": "/zh/private-tours",
    },
  },
};

const routeIdeas = [
  zhTravelServices.find((item) => item.slug === "kundasang-private-tour"),
  zhTravelServices.find((item) => item.slug === "sandakan-private-tour"),
].filter(Boolean);

const planningPoints = [
  {
    title: "私人节奏",
    text: "路线可以围绕你的小团队、家庭或情侣节奏安排，不需要完全照团体行程赶时间。",
  },
  {
    title: "路线先看实际性",
    text: "AFFT 会先看接送点、人数、路线距离、天气和停靠点，再建议更合适的安排。",
  },
  {
    title: "可以连接露营或 Rent It",
    text: "如果你想把私人行程、露营、创作者设备或包车放在同一趟旅程里，可以一起询问。",
  },
];

export default function ZhPrivateToursPage() {
  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative bg-cover bg-center px-6 py-8 md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,20,15,.96), rgba(16,20,15,.72), rgba(16,20,15,.28)), url(/images/kundasang-private-tour-cover.webp)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav />

          <div className="max-w-4xl py-24 md:py-32">
            <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
              沙巴私人行程
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              给小团队更灵活的沙巴路线。
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              AFFT 适合想看山景、自然、城市、文化或露营加项的旅客。
              先 WhatsApp 说明方向，我们再帮你把路线变实际。
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={makeWhatsappLink("你好 AFFT，我想规划沙巴私人行程。")}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
              >
                WhatsApp 询问私人行程
              </a>
              <a
                href="#routes"
                className="rounded-full border border-white/35 bg-black/25 px-8 py-4 font-bold text-white"
              >
                查看路线方向
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="routes" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <ZhSectionHeading
          small="路线方向"
          big="先选一个大方向，细节用 WhatsApp 慢慢收窄。"
          text="私人行程不需要一开始就写完整 itinerary。先告诉 AFFT 日期、人数、接送点和最想看的内容就可以。"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {routeIdeas.map((route) =>
            route ? (
              <a
                key={route.slug}
                href={route.href}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
              >
                <img
                  src={route.image}
                  alt={route.imageAlt}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6">
                  <h2 className="text-3xl font-bold">{route.title}</h2>
                  <p className="mt-4 text-white/70">{route.text}</p>
                  <span className="mt-6 inline-block font-bold text-[#F3922B]">
                    查看详情 -&gt;
                  </span>
                </div>
              </a>
            ) : null
          )}

          <a
            href="/zh/camping"
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
          >
            <img
              src="/images/kiulu-campsite.webp"
              alt="AFFT 沙巴露营加项"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-3xl font-bold">露营加项路线</h2>
              <p className="mt-4 text-white/70">
                如果你想把私人路线和营地、Rent It 装备或慢节奏户外住宿结合，可以从这里开始。
              </p>
              <span className="mt-6 inline-block font-bold text-[#F3922B]">
                查看露营套餐 -&gt;
              </span>
            </div>
          </a>
        </div>
      </section>

      <section className="bg-[#182015] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSectionHeading
            small="AFFT 路线方式"
            big="私人行程重点是实际、顺路、舒服。"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {planningPoints.map((item) => (
              <ZhInfoCard key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <ZhWhatsAppEnquiryBuilder
          title="把私人行程想法发给 AFFT"
          text="日期、人数、接送点和主要兴趣越清楚，AFFT 越容易判断路线是否实际。"
          defaultService="私人行程"
          defaultInterest="昆达山、山打根、自然路线或露营加项"
          services={[
            { label: "私人行程", value: "私人行程" },
            { label: "昆达山路线", value: "昆达山私人路线" },
            { label: "山打根路线", value: "山打根私人路线" },
            { label: "行程加露营", value: "私人行程加露营" },
            { label: "私人包车", value: "私人包车" },
          ]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <ZhPageFinalCta
          title="已经有大概路线想法了吗？"
          text="发送日期、接送点、人数和主要兴趣给 AFFT，我们会先帮你看实际下一步。"
          message="你好 AFFT，我想规划沙巴私人行程。"
          buttonLabel="WhatsApp 询问私人行程"
        />
      </section>

      <ZhSiteFooter />
    </main>
  );
}
