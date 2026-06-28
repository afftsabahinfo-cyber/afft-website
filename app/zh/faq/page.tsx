import type { Metadata } from "next";
import {
  ZhFaqCard,
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";
import { zhFaqGroups } from "@/lib/zh-site-data";

export const metadata: Metadata = {
  title: "AFFT 常见问题 | 中文 FAQ",
  description:
    "AFFT 中文 FAQ，回答露营套餐、Rent It 装备租借、私人行程、包车和 WhatsApp 询问方式。",
  alternates: {
    canonical: "/zh/faq",
    languages: {
      en: "/faq",
      "zh-Hans": "/zh/faq",
    },
  },
};

export default function ZhFaqPage() {
  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav />

          <div className="max-w-4xl py-20 md:py-28">
            <p className="mb-6 inline-block rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm">
              AFFT FAQ
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              先看常见问题，再 WhatsApp 询问会更快。
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              这里整理中文旅客最常问的露营、Rent It、私人路线、包车和询问方式。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="space-y-12">
          {zhFaqGroups.map((group) => (
            <section key={group.title}>
              <ZhSectionHeading small="FAQ" big={group.title} />
              <div className="grid gap-4 md:grid-cols-2">
                {group.items.map((faq) => (
                  <ZhFaqCard
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16">
          <ZhPageFinalCta
            title="还有问题没有看到？"
            text="直接把日期、人数、想了解的服务和疑问发给 AFFT，我们会通过 WhatsApp 回复。"
            message="你好 AFFT，我看了 FAQ，还有问题想询问。"
            buttonLabel="WhatsApp 询问 AFFT"
          />
        </div>
      </section>

      <ZhSiteFooter />
    </main>
  );
}
