import type { Metadata } from "next";
import {
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";
import { zhStories } from "@/lib/zh-site-data";

export const metadata: Metadata = {
  title: "AFFT 真实案例 | 中文 Customer Stories",
  description:
    "AFFT 中文真实案例页面，展示 Explorer Camp 露营和 Tiggo 8 Pro 包车，让中文旅客看见实际体验。",
  alternates: {
    canonical: "/zh/customer-stories",
    languages: {
      en: "/customer-stories",
      "zh-Hans": "/zh/customer-stories",
    },
  },
};

export default function ZhCustomerStoriesPage() {
  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav />

          <div className="max-w-4xl py-20 md:py-28">
            <p className="mb-6 inline-block rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm">
              真实案例
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              让客人看见 AFFT 实际落地后的样子。
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              中文旅客不只需要看套餐名称，更需要知道真实营地、包车和路线到底是什么感觉。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <ZhSectionHeading
          small="Customer Stories"
          big="从真实照片开始，降低询问前的不确定感。"
        />

        <div className="grid gap-8 xl:grid-cols-2">
          {zhStories.map((story) => (
            <article
              key={story.title}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
            >
              <img
                src={story.image}
                alt={story.title}
                className="h-[22rem] w-full object-cover"
              />
              <div className="p-8 md:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
                  {story.eyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  {story.title}
                </h2>
                <p className="mt-5 text-white/72">{story.text}</p>
                <p className="mt-4 text-white/60">{story.detail}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={story.href}
                    className="inline-flex rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
                  >
                    {story.cta}
                  </a>
                  <a
                    href={makeWhatsappLink(story.whatsappText)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-white/15 px-6 py-3 font-bold text-white"
                  >
                    WhatsApp 询问
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <ZhPageFinalCta
            title="看到适合你的案例了吗？"
            text="发送你喜欢的案例、日期、人数和需求给 AFFT，我们会帮你看实际安排。"
            message="你好 AFFT，我看到真实案例，想了解适合我的沙巴安排。"
            buttonLabel="WhatsApp 询问 AFFT"
          />
        </div>
      </section>

      <ZhSiteFooter />
    </main>
  );
}
