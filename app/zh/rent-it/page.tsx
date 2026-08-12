import type { Metadata } from "next";
import { RentItCatalogNoScriptFallback } from "@/components/RentItCatalogNoScriptFallback";
import { RentItLivePriceGuide } from "@/components/RentItLivePriceGuide";
import { RentItSeriesCards } from "@/components/RentItSeriesCards";
import { ZhWhatsAppEnquiryBuilder } from "@/components/ZhWhatsAppEnquiryBuilder";
import {
  ZhInfoCard,
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";

export const metadata: Metadata = {
  title: "AFFT Rent It 中文目录 | 沙巴装备租借",
  description:
    "AFFT Rent It 中文页面，包含创作者设备、露营生活装备、高级露营家具、体验组合和帐篷体验系列。通过 WhatsApp 查询可用数量和适合组合。",
  alternates: {
    canonical: "/zh/rent-it",
    languages: {
      en: "/rent-it",
      "zh-Hans": "/zh/rent-it",
      "x-default": "/rent-it",
    },
  },
};

const whyRent = [
  {
    title: "先体验，不急着买",
    text: "很多装备价格高、使用频率不固定。先租来配合行程，会比一开始买整套更实际。",
  },
  {
    title: "按旅程选择",
    text: "创作者设备、灯光、电源、咖啡、家具和帐篷适合不同玩法，AFFT 可以帮你先筛选。",
  },
  {
    title: "WhatsApp 确认可用性",
    text: "装备数量、状态、天数和押金指引需要 WhatsApp 确认，网站先帮你看清楚方向。",
  },
];

export default function ZhRentItPage() {
  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav />

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                AFFT Rent It Series
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                不用先买整套装备，也能开始沙巴户外体验。
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
                Rent It 适合旅行拍摄、露营生活、家庭户外、Glamping 和帐篷体验。
                先浏览系列，再 WhatsApp 查询可用数量和适合组合。
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={makeWhatsappLink("你好 AFFT，我想了解 Rent It 装备租借。")}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
                >
                  WhatsApp 询问 Rent It
                </a>
                <a
                  href="#price-guide"
                  className="rounded-full border border-white/20 px-8 py-4 font-bold text-white"
                >
                  查看价格方向
                </a>
              </div>
            </div>

            <RentItSeriesCards locale="zh-Hans" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <ZhSectionHeading
          small="为什么租"
          big="Rent It 的重点是让行程更容易成交，而不是做复杂系统。"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {whyRent.map((item) => (
            <ZhInfoCard key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <RentItLivePriceGuide locale="zh-Hans" />
        <RentItCatalogNoScriptFallback locale="zh-Hans" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <ZhWhatsAppEnquiryBuilder
          title="不知道应该租什么？"
          text="把你的行程、人数、拍摄需求或露营风格发给 AFFT，我们会建议更合适的 Rent It 组合。"
          defaultService="Rent It 装备租借"
          defaultInterest="创作者设备、露营装备、Helinox、Snow Peak 或帐篷体验"
          services={[
            { label: "Rent It", value: "Rent It 装备租借" },
            { label: "创作者设备", value: "Creator Series" },
            { label: "露营生活装备", value: "Camp Lifestyle Series" },
            { label: "高级露营家具", value: "Premium Camp Series" },
            { label: "体验组合", value: "Experience Set Series" },
            { label: "帐篷体验", value: "Tent Experience Series" },
          ]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <ZhPageFinalCta
          title="想确认装备可用性？"
          text="发送日期、租借天数、用途和想看的装备给 AFFT，我们会通过 WhatsApp 回复。"
          message="你好 AFFT，我想确认 Rent It 装备可用性。"
          buttonLabel="WhatsApp 查询 Rent It"
        />
      </section>

      <ZhSiteFooter />
    </main>
  );
}
