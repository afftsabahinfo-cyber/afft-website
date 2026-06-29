import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RentItProductImagePreview } from "@/components/rent-it-shared";
import {
  ZhInfoCard,
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";
import {
  getZhRentSeries,
  zhRentSeries,
  type ZhCatalogItem,
} from "@/lib/zh-site-data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return zhRentSeries.map((series) => ({
    slug: series.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = getZhRentSeries(slug);

  if (!series) {
    return {
      title: "Rent It | AFFT Club",
    };
  }

  return {
    title: `${series.eyebrow} | AFFT Rent It 中文`,
    description: series.intro,
    alternates: {
      canonical: series.href,
      languages: {
        en: `/rent-it/${series.slug}`,
        "zh-Hans": series.href,
      },
    },
    openGraph: {
      title: `${series.eyebrow} | AFFT Rent It 中文`,
      description: series.hook,
      images: [
        {
          url: series.image,
          alt: series.imageAlt,
        },
      ],
    },
  };
}

export default async function ZhRentSeriesPage({ params }: PageProps) {
  const { slug } = await params;
  const series = getZhRentSeries(slug);

  if (!series) {
    notFound();
  }

  const otherSeries = zhRentSeries.filter((item) => item.slug !== series.slug);

  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <a href="/zh/rent-it" className="text-sm font-bold text-[#F3922B]">
                返回 Rent It 中文目录
              </a>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                {series.eyebrow}
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                {series.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
                {series.intro}
              </p>
              <a
                href={makeWhatsappLink(series.whatsappText)}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
              >
                WhatsApp 询问这个系列
              </a>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              <img
                src={series.image}
                alt={series.imageAlt}
                className="h-[320px] w-full bg-white object-contain p-3 md:h-[420px]"
              />
              <div className="border-t border-white/10 p-8">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-white/70">
                  重点装备
                </p>
                <h2 className="mt-4 text-4xl font-bold">{series.featuredTitle}</h2>
                <p className="mt-4 font-bold text-[#F3922B]">
                  {series.featuredPrice}
                </p>
                <p className="mt-5 text-white/70">{series.featuredText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <ZhInfoCard title="适合" text={series.bestFor} />
          <ZhInfoCard
            title="重点装备"
            text={`${series.featuredTitle} / ${series.featuredPrice}`}
          />
          <ZhInfoCard title="价格范围" text={series.priceRange} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <ZhSectionHeading small="价格表" big={`${series.eyebrow} 装备方向`} />
          <ZhCatalogTable items={series.items} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <ZhSectionHeading small="询问前先想清楚" big="这些资料会让 AFFT 更容易建议。" />
        <div className="grid gap-4 md:grid-cols-3">
          {series.notes.map((note) => (
            <div
              key={note}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/72"
            >
              {note}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <ZhSectionHeading small="其他 Rent It 系列" big="也可以比较其他装备方向。" />
        <div className="grid gap-4 md:grid-cols-3">
          {otherSeries.map((item) => (
            <a
              key={item.slug}
              href={item.href}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                className="h-40 w-full bg-white object-contain p-2"
              />
              <div className="p-5">
                <p className="text-sm font-bold text-[#F3922B]">
                  {item.startingFrom}
                </p>
                <h3 className="mt-3 text-xl font-bold">{item.eyebrow}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{item.hook}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-10">
        <ZhPageFinalCta
          title={`想确认 ${series.eyebrow} 可用性？`}
          text="发送日期、租借天数、用途和想看的装备给 AFFT，我们会通过 WhatsApp 回复。"
          message={series.whatsappText}
          buttonLabel="WhatsApp 查询这个系列"
        />
      </section>

      <ZhSiteFooter />
    </main>
  );
}

function ZhCatalogTable({ items }: { items: ZhCatalogItem[] }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10 pb-44">
      <div className="min-w-[820px]">
        <div className="grid grid-cols-[1.35fr_0.55fr_0.55fr_0.55fr_1.35fr] bg-black/25 px-4 py-3 text-sm font-bold text-white/70">
          <span>装备</span>
          <span>1 天</span>
          <span>2 天</span>
          <span>3 天</span>
          <span>适合</span>
        </div>
        {items.map((item) => (
          <div
            key={item.title}
            className="grid grid-cols-[1.35fr_0.55fr_0.55fr_0.55fr_1.35fr] gap-2 border-t border-white/10 px-4 py-4 text-sm text-white/72"
          >
            <div className="flex items-center gap-3">
              <RentItProductImagePreview
                title={item.title}
                ariaLabel={`查看 ${item.title} 图片`}
              />
              <strong className="text-white">{item.title}</strong>
            </div>
            <span>{item.day1}</span>
            <span>{item.day2}</span>
            <span>{item.day3}</span>
            <span>{item.bestFor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
