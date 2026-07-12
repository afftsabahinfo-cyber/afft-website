import { PageFinalCta, SiteFooter, SiteTopNav } from "@/components/V3PageSections";
import { ZhPageFinalCta, ZhSiteFooter, ZhSiteTopNav } from "@/components/ZhPageSections";
import { policyContent, type PolicyKey } from "@/lib/policies";

export function PolicyPage({ policy, language }: { policy: PolicyKey; language: "en" | "zh" }) {
  const content = policyContent[language][policy];
  const isZh = language === "zh";
  return <main className="min-h-screen bg-[#10140F] text-white">
    <section className="px-6 py-8 md:px-10"><div className="mx-auto max-w-5xl">
      {isZh ? <ZhSiteTopNav enHref={`/${policy}`} /> : <SiteTopNav zhHref={`/zh/${policy}`} />}
      <div className="py-20 md:py-28"><p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">AFFT.CLUB</p><h1 className="mt-4 text-5xl font-bold md:text-7xl">{content.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{content.intro}</p><p className="mt-5 text-sm text-white/45">{isZh ? "最后复核：2026年7月12日" : "Last reviewed: 12 July 2026"}</p></div>
    </div></section>
    <section className="px-6 pb-20"><div className="mx-auto grid max-w-5xl gap-6">{content.sections.map(([title, text]) => <article key={title} className="rounded-3xl border border-white/10 bg-white/5 p-7"><h2 className="text-2xl font-bold">{title}</h2><p className="mt-4 leading-8 text-white/70">{text}</p></article>)}</div></section>
    <section className="px-6 pb-20"><div className="mx-auto max-w-5xl">{isZh ? <ZhPageFinalCta title="需要确认适用于您的条款？" text="把日期、服务和人数发给 AFFT，我们会在报价或确认中说明适用条款。" message="你好 AFFT，我想确认适用于我的服务条款。" /> : <PageFinalCta title="Need the terms for your service?" text="Send AFFT your date, service and group size. We will state the applicable terms in the quote or confirmation." message="Hi AFFT, I want to confirm the terms that apply to my service." />}</div></section>
    {isZh ? <ZhSiteFooter /> : <SiteFooter />}
  </main>;
}
