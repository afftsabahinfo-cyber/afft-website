import type { Metadata } from "next";
import {
  ZhInfoCard,
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";

export const metadata: Metadata = {
  title: "关于 AFFT | 沙巴户外体验",
  description:
    "AFFT 不是传统旅行社。AFFT 专注沙巴户外体验、露营套餐、Rent It 装备租借、私人行程和包车支持。",
  alternates: {
    canonical: "/zh/about",
    languages: {
      en: "/about",
      "zh-Hans": "/zh/about",
    },
  },
};

const values = [
  {
    title: "真实户外体验",
    text: "AFFT 希望客人真正感受沙巴的山景、河流、乡村公路和星空，而不只是走完打卡点。",
  },
  {
    title: "先从简单开始",
    text: "露营、Rent It 装备和包车都先从 WhatsApp 询问开始，让计划更实际、更快推进。",
  },
  {
    title: "适合小团队和家庭",
    text: "AFFT 的服务更适合情侣、家庭、朋友和创作者，不是大型团体固定路线。",
  },
];

export default function ZhAboutPage() {
  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative bg-cover bg-center px-6 py-8 md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,20,15,.96), rgba(16,20,15,.72), rgba(16,20,15,.28)), url(/images/kinabalu-hero.webp)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav />

          <div className="max-w-4xl py-24 md:py-32">
            <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
              关于 AFFT
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              AFFT 不是传统旅行社。
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              Adventure Frontier Freedom Travel 专注沙巴户外体验、露营套餐、
              Rent It 装备租借、私人路线和包车支持。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <img
              src="/images/kiulu-campsite.webp"
              alt="AFFT 沙巴户外营地"
              className="h-80 w-full object-cover"
            />
            <div className="p-8 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
                AFFT 的方式
              </p>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                让客人更容易开始一趟真实的沙巴户外旅程。
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
                很多客人想露营、看山景、拍内容或包车，但不想先买整套装备、
                研究复杂路线或处理太多细节。AFFT 把这些东西拆简单：先看方向，
                再通过 WhatsApp 确认实际安排。
              </p>
            </div>
          </article>

          <div className="grid gap-6">
            {values.map((item) => (
              <ZhInfoCard key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#182015] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSectionHeading
            small="AFFT 目前重点"
            big="网站每个页面都要帮助客人更快发 WhatsApp 询问。"
            text="当前优先内容是露营套餐、Rent It、私人行程、包车、关于 AFFT、FAQ 和真实案例。"
          />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "沙巴户外体验",
              "露营套餐",
              "露营装备租借",
              "私人行程",
              "包车与机场接送",
              "创作者设备租借",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-xl font-bold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <ZhPageFinalCta
          title="想了解 AFFT 可以怎样帮你规划沙巴？"
          text="发送日期、人数和你想要的体验方向给 AFFT，我们会先用 WhatsApp 回复最实际的下一步。"
          message="你好 AFFT，我想了解你们可以怎样帮我规划沙巴旅程。"
          buttonLabel="WhatsApp 联系 AFFT"
        />
      </section>

      <ZhSiteFooter />
    </main>
  );
}
