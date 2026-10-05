import { SiteTopNav, SiteFooter } from "@/components/V3PageSections";
import { ZhSiteTopNav, ZhSiteFooter } from "@/components/ZhPageSections";
import { CampComparison, CampBookingSteps } from "@/components/CampComparison";
import { CampEnquiryForm } from "@/components/CampEnquiryForm";
import { offers } from "@/lib/offers";
import { jimnyExplorerCamp } from "@/lib/jimny-camp-packages";
import { getZhPackage } from "@/lib/zh-site-data";
import { makeWhatsappLink } from "@/lib/rent-it-data";

export function ExplorerLandingPage({ slug, zh = false }: { slug: "jimny-explorer-camp" | "explorer-camp"; zh?: boolean }) {
  const offer = offers.find(item => item.slug === slug)!;
  const local = offer.locales[zh ? "zh" : "en"];
  const jimny = slug === "jimny-explorer-camp";
  const path = `${zh ? "/zh" : ""}/packages/${slug}`;
  const price = `${jimny ? "" : zh ? "起价 " : "From "}RM${offer.priceFrom}`;
  const poster = jimny ? jimnyExplorerCamp.image : "/images/afft-explorer-camp-rm599-sabah.webp";
  const photo = "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-setup-01.webp";
  const includes = jimny ? (zh ? getZhPackage(slug)!.includes : jimnyExplorerCamp.includes) : local.inclusions;
  const exclusions = jimny ? (zh ? ["食物与饮料", "Cooler box 冰箱", "咖啡装备", "高级露营家具", "装饰灯光"] : jimnyExplorerCamp.notIncluded) : local.exclusions;
  const intro = zh
    ? jimny ? "两人一起体验沙巴露营。RM599 包含 Jimny Sierra、营地费、帐篷、睡眠装备、桌椅、灯光与风扇。" : "AFFT 为你准备帐篷、遮棚与桌椅。双人基础布置 RM599 起，交通和未注明的营地费另行报价。"
    : jimny ? "A Sabah camp for two, with Jimny Sierra, campsite fee, tent, sleep gear, chairs, table, lights and fan included in RM599." : "Arrive to AFFT's ready-built tent, shelter, table and chairs. The base setup for two starts at RM599. Transport and unstated campsite fees are quoted separately.";
  const faqs = zh ? [
    ["RM599 是每人价吗？", jimny ? "不是。这是 2 人、2 天 1 夜的基础套餐价格。额外装备或不同安排须另外报价。" : "RM599 是双人基础布置的起价。交通、未注明的营地费及额外安排会列在最终报价内。"],
    ["没露营经验也可以参加吗？", "可以。告诉 AFFT 你是第一次露营，我们会确认适合的营地、装备与搭建安排。"],
    ["营地有厕所和洗澡设施吗？", "不同营地的设施不同。AFFT 会按你的日期确认具体营地，请在付款前核实厕所、洗澡及车辆通行条件。"],
    ["遇到下雨怎么办？", "下雨不会自动取消。AFFT 会按天气、安全和通行情况讨论调整，具体改期与取消条件写在报价或确认内。"],
  ] : [
    ["Is RM599 a per-person price?", jimny ? "No. It is the base package price for two guests, 2 days and 1 night. Extra gear or different arrangements are quoted separately." : "RM599 is the starting price for the base setup for two. Transport, unstated campsite fees and extras are listed in your final quote."],
    ["Can first-time campers join?", "Yes. Tell AFFT it is your first camp so we can confirm a suitable campsite, equipment and setup arrangements."],
    ["Are there toilets and showers?", "Facilities vary by campsite. AFFT confirms the campsite for your dates. Check toilet, shower and vehicle access details before paying."],
    ["What happens if it rains?", "Rain alone does not automatically cancel a trip. AFFT discusses changes based on weather, safety and access. Your quote or confirmation states change and cancellation terms."],
  ];
  const structured = [
    { "@context": "https://schema.org", "@type": "Product", name: local.name, description: intro, image: `https://afft.club${poster}`, offers: { "@type": "Offer", price: offer.priceFrom, priceCurrency: "MYR", url: `https://afft.club${path}`, description: `${price} / 2 guests / 2D1N` } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: zh ? "露营套餐" : "Camping Packages", item: `https://afft.club${zh ? "/zh" : ""}/camping` }, { "@type": "ListItem", position: 2, name: local.name, item: `https://afft.club${path}` }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ];
  return <main lang={zh ? "zh-Hans" : "en"} className="min-h-screen bg-[#10140F] text-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />
    <div className="mx-auto max-w-7xl px-5 py-6 md:px-10">
      {zh ? <ZhSiteTopNav enHref={`/packages/${slug}`} /> : <SiteTopNav zhHref={`/zh/packages/${slug}`} />}
      <section className="mt-10 grid gap-8 pb-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div><a href={`${zh ? "/zh" : ""}/camping`} className="text-sm font-bold text-[#F3922B]">{zh ? "返回露营套餐" : "Back to camping packages"}</a>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-[#F3922B]">{jimny ? "Jimny Camp Series" : zh ? "AFFT 现成营地布置" : "AFFT ready-built camp"}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{local.name}</h1>
          <p className="mt-4 text-3xl font-bold text-[#F3922B]">{price}</p>
          <p className="mt-2 text-lg font-semibold">{zh ? "双人基础套餐 · 2 天 1 夜" : "Base package for 2 guests · 2 days, 1 night"}</p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{intro}</p>
          <div className="mt-6 flex flex-wrap gap-3"><a href="#check-dates" className="rounded-full bg-[#F3922B] px-6 py-4 text-center font-bold text-black">{zh ? "查询我的日期与总价" : "Check my dates & total price"}</a><a href="#compare-explorer" className="rounded-full border border-white/30 px-6 py-4 text-center font-bold">{zh ? "比较两个 RM599 套餐" : "Compare the two RM599 camps"}</a></div>
          <p className="mt-4 text-sm leading-6 text-white/60">{zh ? "日期还没确定也可以问。实际营地、供应与额外费用以书面报价为准。" : "You can ask before choosing a date. Campsite, availability and extras are confirmed in your written quote."}</p>
        </div>
        <figure className="overflow-hidden rounded-3xl border border-white/15 bg-white/5"><img src={jimny ? poster : photo} alt={jimny ? (zh ? "Jimny Explorer Camp RM599 套餐海报" : "Jimny Explorer Camp RM599 package poster") : (zh ? "Explorer Camp 真实帐篷与遮棚布置" : "Real Explorer Camp tent and shelter setup")} width={1080} height={jimny ? 2287 : 810} fetchPriority="high" className="aspect-[4/3] w-full object-cover object-top" /><figcaption className="p-4 text-sm leading-6 text-white/70">{jimny ? (zh ? "Jimny 套餐海报；实际帐篷与营地按日期确认。" : "Jimny package poster. Actual tent and campsite are confirmed for your dates.") : (zh ? "AFFT Explorer Camp 真实布置照片。" : "A real AFFT Explorer Camp setup.")}</figcaption></figure>
      </section>
      <div className="space-y-12 pb-14">
        <CampEnquiryForm slug={slug} zh={zh} />
        <CampComparison zh={zh} selected={slug} />
        <section className="grid gap-6 md:grid-cols-2"><article className="rounded-3xl bg-[#182015] p-6 md:p-8"><h2 className="text-2xl font-bold">{zh ? "基础套餐包含" : "Included in the base package"}</h2><ul className="mt-5 list-disc space-y-3 pl-5 text-white/80">{includes.map(item => <li key={item}>{item}</li>)}</ul></article><article className="rounded-3xl border border-white/15 p-6 md:p-8"><h2 className="text-2xl font-bold">{zh ? "另外报价／不包含" : "Extra / not included"}</h2><ul className="mt-5 list-disc space-y-3 pl-5 text-white/80">{exclusions.map(item => <li key={item}>{item}</li>)}</ul>{!jimny && <p className="mt-5 leading-7 text-white/75">{zh ? "餐食和额外装备可另外询问。额外人数须确认布置和总价。" : "Ask for meals and extra gear separately. Extra guests need a confirmed setup and total quote."}</p>}</article></section>
        <CampBookingSteps zh={zh} />
        <details className="rounded-3xl border border-white/15 p-6"><summary className="cursor-pointer text-xl font-bold">{zh ? "查看完整套餐海报" : "View the full package poster"}</summary><img src={poster} alt={zh ? "完整露营套餐海报" : "Full camping package poster"} loading="lazy" className="mx-auto mt-5 w-full max-w-xl rounded-2xl" /></details>
        {!jimny && <section><h2 className="text-3xl font-bold">{zh ? "看真实 Explorer Camp 布置" : "See the real Explorer Camp setup"}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{["detail-01", "cover", "night-01", "group-01-blur"].map((image, i) => <figure key={image} className="overflow-hidden rounded-2xl border border-white/15"><img src={`/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-${image}.webp`} alt={zh ? ["帐篷入口与遮棚", "帐篷内的早晨", "夜间营地", "隐私处理后的真实露营照片"][i] : ["Tent entrance and covered area", "Morning inside the tent", "Night campsite", "Real camp photo with guest privacy protected"][i]} loading="lazy" className="aspect-[4/3] w-full object-cover" /></figure>)}</div></section>}
        <section><h2 className="text-3xl font-bold">{zh ? "付款前常见问题" : "Questions before you commit"}</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{faqs.map(([question, answer]) => <article key={question} className="rounded-3xl border border-white/15 p-6"><h3 className="text-xl font-bold">{question}</h3><p className="mt-3 leading-7 text-white/75">{answer}</p></article>)}</div></section>
        <section className="rounded-3xl bg-[#F3922B]/10 p-6 md:p-8"><h2 className="text-3xl font-bold">{zh ? "准备好开始你的沙巴露营了吗？" : "Ready to plan your Sabah camp?"}</h2><p className="mt-4 leading-7 text-white/80">{zh ? "先核实日期与总价，再决定是否预订。" : "Check your dates and total quote before deciding to book."}</p><a href="#check-dates" className="mt-5 inline-block rounded-full bg-[#F3922B] px-6 py-4 font-bold text-black">{zh ? "填写日期与人数" : "Add dates & guests"}</a><a href={makeWhatsappLink(local.whatsappTemplate)} data-offer-slug={slug} target="_blank" rel="noreferrer" className="ml-0 mt-4 block font-bold text-[#F3922B] underline underline-offset-4 sm:ml-6 sm:inline-block">{zh ? "直接 WhatsApp AFFT" : "WhatsApp AFFT directly"}</a></section>
      </div>
    </div>
    {zh ? <ZhSiteFooter /> : <SiteFooter />}
  </main>;
}
