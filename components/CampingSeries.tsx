import type { Metadata } from "next";
import { SiteTopNav, SiteFooter } from "@/components/V3PageSections";
import { ZhSiteTopNav, ZhSiteFooter } from "@/components/ZhPageSections";
import { CampEnquiryForm } from "@/components/CampEnquiryForm";
import { makeWhatsappLink } from "@/lib/rent-it-data";
import {
  campAddons,
  campBases,
  campBundles,
  campCategories,
  campFaqs,
  campMessage,
  campPath,
  campPoster,
  campPrice,
  campServices,
  getCamp,
  type CampItem,
  type CampLanguage,
} from "@/lib/camping-series";

const shell = "mx-auto max-w-7xl px-5 md:px-10";
const button =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-[#F3922B] px-6 py-3 text-center font-bold text-[#10140F]";
function Top({ lang, path }: { lang: CampLanguage; path: string }) {
  return (
    <div className={`${shell} py-6`}>
      {lang === "zh" ? (
        <ZhSiteTopNav enHref={path} />
      ) : (
        <SiteTopNav zhHref={`/zh${path}`} />
      )}
    </div>
  );
}
function Footer({ lang }: { lang: CampLanguage }) {
  return lang === "zh" ? <ZhSiteFooter /> : <SiteFooter />;
}
export function CampingCard({
  item: p,
  lang = "en",
}: {
  item: CampItem;
  lang?: CampLanguage;
}) {
  const zh = lang === "zh";
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#1b241c]">
      <a href={campPath(p, lang)} aria-label={p.name[lang]}>
        <img
          src={campPoster(p, lang)}
          alt={`${p.name[lang]} — ${campPrice(p, lang)} / ${p.audience[lang]}`}
          width={1080}
          height={1920}
          loading="lazy"
          className="aspect-[9/16] w-full object-contain"
        />
      </a>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold tracking-wide text-[#edc18b]">
          {campServices[p.service][lang]}
        </p>
        <h3 className="mt-2 text-2xl font-bold">
          <a href={campPath(p, lang)}>{p.name[lang]}</a>
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/75">
          {p.summary[lang]}
        </p>
        <p className="mt-3 text-sm text-white/75">
          {p.audience[lang]} · {p.duration[lang]}
        </p>
        <p className="mt-3 text-xl font-bold text-[#F6AB5B]">
          {campPrice(p, lang)}{" "}
          <span className="text-xs font-normal text-white/65">
            {p.kind === "addon"
              ? zh
                ? "加配价"
                : "add-on"
              : zh
                ? "整组总价"
                : "group total"}
          </span>
        </p>
        <a
          className="mt-auto pt-5 font-bold text-[#F6AB5B]"
          href={campPath(p, lang)}
        >
          {zh ? "查看包含项目与海报" : "See inclusions & poster"} →
        </a>
      </div>
    </article>
  );
}
export function CampingHomeGrid({ lang = "en" }: { lang?: CampLanguage }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {campCategories.map((c) => (
        <CampingCard key={c.id} lang={lang} item={getCamp(c.slug)!} />
      ))}
    </div>
  );
}
function FinalCta({ lang }: { lang: CampLanguage }) {
  const zh = lang === "zh";
  return (
    <section className={`${shell} py-14`}>
      <div className="rounded-2xl bg-[#edc18b] p-7 text-[#172318] md:p-12">
        <h2 className="text-3xl font-bold">
          {zh
            ? "告诉我们人数，一起选好这次露营。"
            : "Tell us who is coming. We will help choose your camp."}
        </h2>
        <p className="mt-4 max-w-3xl leading-7">
          {zh
            ? "发送日期、成人与儿童人数、是否自驾及喜欢的套餐。AFFT 会确认营地、档期、完整总价及付款／改期条件。"
            : "Send your dates, adults and children, transport needs and preferred package. AFFT confirms the campsite, availability, full total and payment/change terms."}
        </p>
        <a
          href={makeWhatsappLink(
            zh
              ? "你好 AFFT，我想选择新版露营套餐。请帮我确认日期、人数和完整总价。"
              : "Hi AFFT, please help me choose a camping package and confirm dates, guests and the full total.",
          )}
          target="_blank"
          rel="noreferrer"
          className={`${button} mt-6`}
        >
          {zh ? "WhatsApp 查询日期与总价" : "Check dates & total on WhatsApp"}
        </a>
      </div>
    </section>
  );
}
export function CampingHub({ lang = "en" }: { lang?: CampLanguage }) {
  const zh = lang === "zh";
  return (
    <main
      lang={zh ? "zh-Hans" : "en"}
      className="min-h-screen bg-[#101a13] text-white"
    >
      <Top lang={lang} path="/camping" />
      <header
        className={`${shell} grid gap-8 pb-14 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center`}
      >
        <div>
          <p className="text-sm font-bold tracking-widest text-[#edc18b]">
            {zh ? "沙巴 · AFFT 露营全系列" : "SABAH / THE AFFT CAMP COLLECTION"}
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-[1.1] md:text-7xl">
            {zh ? (
              <>
                选好你的
                <br />
                户外时光。
              </>
            ) : (
              <>
                Find your
                <br />
                kind of camp.
              </>
            )}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
            {zh
              ? "双人放空、亲子初体验、朋友相聚，或开着 Jimny 出发。先选一起出游的人，再选适合你的服务。"
              : "Time for two, a first family camp, a weekend with friends or a Jimny road trip. Start with your people, then choose how much you want us to handle."}
          </p>
          <p className="mt-5 text-sm text-[#edc18b]">
            {zh
              ? "整组价格清楚列明 · 自取、免搭、自驾分开说明"
              : "Clear group totals · Self-setup, ready camp or self-drive"}
          </p>
          <a href="#choose" className={`${button} mt-7`}>
            {zh ? "找到适合我的套餐" : "Find my camp"} ↓
          </a>
        </div>
        <figure className="relative overflow-hidden rounded-2xl">
          <img
            src="/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-setup-01.webp"
            alt={zh ? "AFFT 真实露营搭建现场" : "A real AFFT campsite setup"}
            width={900}
            height={1600}
            className="h-[390px] w-full object-cover object-[center_55%] md:h-[520px]"
          />
          <figcaption className="absolute bottom-0 inset-x-0 bg-black/60 p-4 text-sm">
            {zh
              ? "真实 AFFT 露营现场；具体配置以套餐清单为准。"
              : "A real AFFT camp. Your package list defines the included setup."}
          </figcaption>
        </figure>
      </header>
      <section id="choose" className={`${shell} scroll-mt-5 pb-12`}>
        <h2 className="text-3xl font-bold">
          {zh ? "这次和谁一起出发？" : "Who is coming along?"}
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {campCategories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-xl border border-white/25 px-4 py-5 text-center font-bold hover:bg-white/10"
            >
              {c.name[lang]} ↓
            </a>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {(["gear", "ready", "drive"] as const).map((s) => (
            <div key={s} className="border-t border-[#edc18b]/50 pt-4">
              <h3 className="text-lg font-bold text-[#edc18b]">
                {campServices[s][lang]}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/75">
                {s === "gear"
                  ? zh
                    ? "只有装备，自备交通与营地，自行搭撤。"
                    : "Equipment only. Arrange your site, travel and setup."
                  : s === "ready"
                    ? zh
                      ? "含标准营地、装备配送和搭撤；自行到场。"
                      : "Standard site, equipment delivery and setup included. Travel there yourself."
                    : zh
                      ? "含 Jimny、基础装备及标准营地；自驾自搭。"
                      : "Jimny, camp essentials and standard site included. Drive and set up yourself."}
              </p>
            </div>
          ))}
        </div>
      </section>
      {campCategories.map((c) => (
        <section key={c.id} id={c.id} className={`${shell} scroll-mt-6 py-10`}>
          <h2 className="mb-6 text-3xl font-bold">{c.name[lang]}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campBases
              .filter((p) => p.category === c.id)
              .map((p) => (
                <CampingCard key={p.slug} item={p} lang={lang} />
              ))}
          </div>
        </section>
      ))}
      <section id="bundles" className={`${shell} py-12`}>
        <p className="text-sm font-bold tracking-widest text-[#edc18b]">
          {zh ? "把喜欢的事情带进露营" : "MAKE IT YOUR WEEKEND"}
        </p>
        <h2 className="mt-3 text-4xl font-bold">
          {zh ? "六款主题组合" : "Six ready-to-choose combinations"}
        </h2>
        <p className="mt-4 mb-7 text-white/75">
          {zh
            ? "基础套餐加上指定体验，直接看整组总价。料理组合不含食材。"
            : "A base camp plus a chosen experience, with the total shown upfront. Cooking bundles do not include food."}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campBundles.map((p) => (
            <CampingCard key={p.slug} item={p} lang={lang} />
          ))}
        </div>
      </section>
      <section id="addons" className={`${shell} py-12`}>
        <h2 className="text-4xl font-bold">
          {zh ? "五款自选加配" : "Five ways to add a little more"}
        </h2>
        <p className="mt-4 mb-7 text-white/75">
          {zh
            ? "按主套餐同一住宿周期计价；已经包含的装备不会重复收费。日营搭配与兼容性请先确认。"
            : "Priced for the same overnight period as your camp. Included items are not charged twice. Ask about day-camp fit and compatibility."}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campAddons.map((p) => (
            <CampingCard key={p.slug} item={p} lang={lang} />
          ))}
        </div>
      </section>
      <section className={`${shell} py-12`}>
        <h2 className="mb-6 text-3xl font-bold">
          {zh ? "出发前，先把这些说清楚" : "A few clear answers before you go"}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {campFaqs.map((f) => (
            <details
              key={f.q.en}
              className="rounded-xl border border-white/20 p-5"
            >
              <summary className="cursor-pointer font-bold">
                {f.q[lang]}
              </summary>
              <p className="mt-4 leading-7 text-white/75">{f.a[lang]}</p>
            </details>
          ))}
        </div>
      </section>
      <FinalCta lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
export function campingMetadata(
  lang: CampLanguage = "en",
  p?: CampItem,
): Metadata {
  const zh = lang === "zh";
  const path = p ? campPath(p, lang) : zh ? "/zh/camping" : "/camping";
  const en = p ? campPath(p) : "/camping";
  const title = p
    ? `${p.name[lang]} ${campPrice(p, lang)} | AFFT`
    : zh
      ? "沙巴露营全系列｜双人、亲子、朋友与 Jimny 自驾 | AFFT"
      : "Sabah Camping Packages | Couples, Families & Jimny | AFFT";
  return {
    title,
    description: p
      ? `${p.summary[lang]} ${campPrice(p, lang)} / ${p.audience[lang]}. ${p.duration[lang]}. ${campServices[p.service][lang]}.`
      : zh
        ? "9款基础套餐、6款主题组合及5款体验加配。清楚列明人数、时长、整组价格与包含内容，通过 WhatsApp 查询日期。"
        : "Nine base camps, six themed combinations and five add-ons. Clear group prices, inclusions and service options. Ask AFFT on WhatsApp.",
    alternates: {
      canonical: path,
      languages: { en, "zh-Hans": `/zh${en}`, "x-default": en },
    },
    openGraph: {
      title,
      images: [
        {
          url: campPoster(p ?? campBases[3], lang),
          width: 1080,
          height: 1920,
          alt: p?.name[lang] ?? title,
        },
      ],
    },
  };
}
export function CampingDetail({
  item: p,
  lang = "en",
  legacy = false,
}: {
  item: CampItem;
  lang?: CampLanguage;
  legacy?: boolean;
}) {
  const zh = lang === "zh";
  const prefix = zh ? "/zh" : "";
  const extra = (p.addonSlugs ?? []).map((s) => getCamp(s)!);
  const base = p.baseSlug ? getCamp(p.baseSlug) : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: p.name[lang],
        description: p.summary[lang],
        url: `https://afft.club${campPath(p, lang)}`,
        image: `https://afft.club${campPoster(p, lang)}`,
        provider: {
          "@type": "Organization",
          name: "AFFT",
          url: "https://afft.club",
        },
        areaServed: "Sabah, Malaysia",
        offers: {
          "@type": p.from ? "AggregateOffer" : "Offer",
          [p.from ? "lowPrice" : "price"]: p.price,
          priceCurrency: "MYR",
          url: `https://afft.club${campPath(p, lang)}`,
          description: `${p.audience[lang]} / ${p.duration[lang]}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: zh ? "露营套餐" : "Camping",
            item: `https://afft.club${prefix}/camping`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: p.name[lang],
            item: `https://afft.club${campPath(p, lang)}`,
          },
        ],
      },
    ],
  };
  return (
    <main
      lang={zh ? "zh-Hans" : "en"}
      className="min-h-screen bg-[#101a13] text-white"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Top lang={lang} path={`/packages/${p.slug}`} />
      <div className={`${shell} pt-5`}>
        <a href={`${prefix}/camping`} className="text-[#edc18b]">
          ← {zh ? "全部露营套餐" : "All camping packages"}
        </a>
        {legacy && (
          <p className="mt-5 rounded-xl border border-[#edc18b]/40 p-4 text-sm">
            {zh
              ? "这个旧套餐链接已更新。以下展示新版套餐、价格与包含项目。"
              : "This older package link has been updated. The current package, price and inclusions are shown below."}
          </p>
        )}
      </div>
      <section
        className={`${shell} grid gap-10 py-10 lg:grid-cols-2 lg:items-start`}
      >
        <div>
          <p className="font-bold text-[#edc18b]">
            {campServices[p.service][lang]}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            {p.name[lang]}
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/80">
            {p.summary[lang]}
          </p>
          <p className="mt-7 text-5xl font-bold text-[#F6AB5B]">
            {campPrice(p, lang)}
          </p>
          <p className="mt-3 text-lg">
            {p.audience[lang]} · {p.duration[lang]}
          </p>
          <p className="mt-2 text-sm text-white/65">
            {p.kind === "addon"
              ? zh
                ? "这是主套餐之外的加配费用。"
                : "An optional add-on to your base package."
              : zh
                ? "以上为整组总价，不是每人价格。"
                : "Total for the stated group, not per person."}
          </p>
          <ul className="mt-7 space-y-3">
            {p.highlights.map((h) => (
              <li key={h.en} className="border-b border-white/15 pb-3 text-lg">
                {h[lang]}
              </li>
            ))}
          </ul>
          <a
            className={`${button} mt-7`}
            href={makeWhatsappLink(campMessage(p, lang))}
            target="_blank"
            rel="noreferrer"
            data-offer-slug={p.slug}
          >
            {zh ? "WhatsApp 查询日期与总价" : "Check dates & total on WhatsApp"}
          </a>
          <p className="mt-4 text-sm leading-6 text-white/65">
            {zh
              ? "档期、营地、具体装备及任何地点／日期差价于付款前确认；可退押金另列。"
              : "Dates, site, exact equipment and any location/date supplement are confirmed before payment. Refundable deposits are listed separately."}
          </p>
        </div>
        <figure>
          <a href={campPoster(p, lang)} target="_blank" rel="noreferrer">
            <img
              src={campPoster(p, lang)}
              width={1080}
              height={1920}
              alt={`${p.name[lang]} ${campPrice(p, lang)} ${p.audience[lang]}`}
              className="w-full rounded-2xl"
            />
          </a>
          <figcaption className="mt-3 flex justify-between gap-4 text-sm text-white/65">
            <span>{zh ? "点开查看完整海报" : "Open full-size poster"}</span>
            <a
              href={campPoster(p, lang)}
              download
              className="font-bold text-[#edc18b]"
            >
              {zh ? "下载中文海报" : "Download English poster"} ↓
            </a>
          </figcaption>
          <p className="mt-2 text-xs leading-5 text-white/55">
            {zh
              ? "AI 场景示意；营地及具体装备由 AFFT 于付款前确认。"
              : "AI concept illustration. AFFT confirms the site and exact equipment before payment."}
          </p>
        </figure>
      </section>
      {base && (
        <section className={`${shell} pb-10`}>
          <div className="rounded-xl bg-white/5 p-6">
            <h2 className="text-2xl font-bold">
              {zh ? "这个组合怎么算？" : "How this combination adds up"}
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {[base, ...extra].map((x, i) => (
                <span key={x.slug}>
                  {i > 0 ? " + " : ""}
                  <a
                    className="underline decoration-[#edc18b] underline-offset-4"
                    href={campPath(x, lang)}
                  >
                    {x.name[lang]} RM{x.price}
                  </a>
                </span>
              ))}
              <strong>= {campPrice(p, lang)}</strong>
            </div>
          </div>
        </section>
      )}
      <section className={`${shell} grid gap-8 py-8 md:grid-cols-2`}>
        {[
          { title: zh ? "价格包含" : "Included", items: p.includes },
          {
            title: zh
              ? "不包含／另外安排"
              : "Not included / arranged separately",
            items: p.excludes,
          },
        ].map((g) => (
          <div key={g.title}>
            <h2 className="text-2xl font-bold">{g.title}</h2>
            <ul className="mt-5 space-y-3 text-white/80">
              {g.items.map((t, i) => (
                <li key={i} className="border-b border-white/10 pb-3">
                  {t[lang]}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className={`${shell} py-8`}>
        <h2 className="text-2xl font-bold">
          {zh ? "安排说明" : "Good to know"}
        </h2>
        <div className="mt-5 space-y-3 text-white/75">
          {p.notes.map((t, i) => (
            <p key={i} className="leading-7">
              {t[lang]}
            </p>
          ))}
        </div>
        {p.kind !== "addon" && (
          <div className="mt-8">
            <h3 className="text-xl font-bold">
              {zh ? "还可以这样搭配" : "Make it your own"}
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {campAddons
                .filter((a) => !p.addonSlugs?.includes(a.slug))
                .map((a) => (
                  <a
                    key={a.slug}
                    href={campPath(a, lang)}
                    className="rounded-full border border-white/25 px-4 py-3 text-sm"
                  >
                    {a.name[lang]} {campPrice(a, lang)}
                  </a>
                ))}
            </div>
            <p className="mt-3 text-sm text-white/65">
              {zh
                ? "如已有相同配置，只报价净增加项目；日营与加配兼容性先确认。"
                : "Already-included items are not charged again. Day-camp add-ons and compatibility need confirmation."}
            </p>
          </div>
        )}
      </section>
      <div className={`${shell} py-10`}>
        <CampEnquiryForm slug={p.slug} zh={zh} />
      </div>
      <FinalCta lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
