import type { Metadata } from "next";
import { ZhWhatsAppEnquiryBuilder } from "@/components/ZhWhatsAppEnquiryBuilder";
import {
  ZhFaqCard,
  ZhInfoCard,
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";
import { zhFaqGroups, zhPackages } from "@/lib/zh-site-data";

export const metadata: Metadata = {
  title: "沙巴露营套餐 | AFFT Club",
  description:
    "AFFT 中文露营套餐页面，包含 Jimny Camp Series、Solo Explorer、Explorer Camp、星空露营和家庭露营。通过 WhatsApp 询问日期、人数和适合套餐。",
  alternates: {
    canonical: "/zh/camping",
    languages: {
      en: "/camping",
      "zh-Hans": "/zh/camping",
    },
  },
  openGraph: {
    title: "神山露营体验 RM699 | AFFT 中文露营套餐",
    description:
      "2 天 1 夜 Kundasang 神山露营体验，包含 Mobi Garden 245 帐篷、Tiggo 8 Pro 私人移动和 AFFT 露营支持。",
    images: [
      {
        url: "/images/mount-kinabalu-camping-experience-rm699-zh.webp",
        alt: "AFFT 神山露营体验 RM699 中文海报",
      },
    ],
  },
};

const steps = [
  {
    title: "告诉 AFFT 日期和人数",
    text: "先发送日期、人数、接送点和想要的露营风格，不需要一开始就准备完整计划。",
  },
  {
    title: "确认适合套餐和营地",
    text: "AFFT 会根据人数、天气、交通和舒适度，建议更实际的露营方向。",
  },
  {
    title: "WhatsApp 完成下一步",
    text: "网站负责让你看清楚方向，最终细节会在 WhatsApp 里确认，比较快也比较准确。",
  },
];

export default function ZhCampingPage() {
  const campingFaqs = zhFaqGroups[0].items;

  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative bg-cover bg-center px-6 py-8 md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,20,15,.96), rgba(16,20,15,.74), rgba(16,20,15,.32)), url(/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-cover.webp)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav />

          <div className="max-w-4xl py-24 md:py-32">
            <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
              沙巴露营套餐
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              想露营，但不想从零开始准备。
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              AFFT 用现成营地设置、真实照片和 WhatsApp 沟通，让第一次露营、
              情侣露营和家庭户外周末更容易开始。
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={makeWhatsappLink("你好 AFFT，我想了解沙巴露营套餐。")}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
              >
                WhatsApp 询问露营
              </a>
              <a
                href="#packages"
                className="rounded-full border border-white/35 bg-black/25 px-8 py-4 font-bold text-white"
              >
                查看套餐
              </a>
              <a
                href="/zh/camping-spots"
                className="rounded-full border border-white/35 bg-black/25 px-8 py-4 font-bold text-white"
              >
                查看营地指南
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="mount-kinabalu-camping-experience"
        className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
      >
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
          <img
            src="/images/mount-kinabalu-camping-experience-rm699-zh.webp"
            alt="AFFT 神山露营体验 RM699 中文海报"
            className="w-full bg-[#07130f] object-contain"
          />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
            推荐露营体验
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            神山露营体验，RM699 / pax 起。
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/72">
            适合第一次想轻松露营的客人。2 天 1 夜 Kundasang 方向，包含 Mobi
            Garden 245 帐篷体验、Tiggo 8 Pro 私人移动和 AFFT 露营支持。
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ZhInfoCard title="时间" text="2 天 1 夜露营体验。" />
            <ZhInfoCard title="地点" text="Kundasang, Sabah / 神山景色方向。" />
            <ZhInfoCard title="适合" text="第一次露营、情侣、小团体和想轻松出发的客人。" />
            <ZhInfoCard title="包含" text="帐篷设置、基础露营装备、Tiggo 8 Pro 和 AFFT 支持。" />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={makeWhatsappLink(
                "你好 AFFT，我想了解神山露营体验 RM699 配套。"
              )}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              询问 RM699 神山露营体验
            </a>
            <a
              href="#packages"
              className="rounded-full border border-white/30 px-8 py-4 font-bold text-white"
            >
              比较其他露营套餐
            </a>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <ZhSectionHeading
          small="套餐选择"
          big="先选适合的露营方向，再通过 WhatsApp 确认日期和细节。"
          text="这些套餐刻意保持简单，方便客人先理解。最终安排仍会根据人数、天气、营地、交通和加项调整。"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {zhPackages.map((pkg) => (
            <a
              key={pkg.slug}
              href={pkg.href}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
            >
              <img
                src={pkg.image}
                alt={pkg.imageAlt}
                className="h-56 w-full bg-white object-contain p-2"
              />
              <div className="p-6">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#F3922B]">
                  {pkg.price}
                </p>
                <h2 className="mt-4 text-3xl font-bold">{pkg.title}</h2>
                <p className="mt-4 text-white/70">{pkg.shortText}</p>
                <p className="mt-4 text-sm text-white/55">{pkg.bestFor}</p>
                <span className="mt-6 inline-block font-bold text-[#F3922B]">
                  查看套餐 -&gt;
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#182015] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSectionHeading
            small="询问方式"
            big="先把重点讲清楚，AFFT 才能更快回复。"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <ZhInfoCard key={step.title} title={step.title} text={step.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <ZhWhatsAppEnquiryBuilder
          title="把露营询问整理好再发给 AFFT"
          text="日期、人数、接送点和想要的露营风格越清楚，AFFT 越容易给你实际建议。"
          defaultService="露营套餐"
          defaultInterest="Jimny Camp Series、Explorer Camp、家庭露营或星空露营"
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <ZhSectionHeading small="露营 FAQ" big="WhatsApp 前先看几个常见问题。" />
        <div className="grid gap-4 md:grid-cols-2">
          {campingFaqs.map((faq) => (
            <ZhFaqCard
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        <div className="mt-16">
          <ZhPageFinalCta
            title="准备询问沙巴露营了吗？"
            text="发送日期、人数和想要的露营感觉给 AFFT，我们会通过 WhatsApp 回复实际下一步。"
            message="你好 AFFT，我想规划沙巴露营体验。"
            buttonLabel="WhatsApp 询问露营"
          />
        </div>
      </section>

      <ZhSiteFooter />
    </main>
  );
}
