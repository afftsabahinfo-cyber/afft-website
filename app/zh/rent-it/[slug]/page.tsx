import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RentItCatalogNoScriptFallback } from "@/components/RentItCatalogNoScriptFallback";
import { RentItLivePriceGuide } from "@/components/RentItLivePriceGuide";
import { RentItSeriesCards } from "@/components/RentItSeriesCards";
import {
  RentItSeriesFeaturedProduct,
  RentItSeriesMetrics,
} from "@/components/RentItSeriesLiveSummary";
import {
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";
import {
  getZhRentSeries,
  zhRentSeries,
} from "@/lib/zh-site-data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

const catalogSeriesBySlug: Record<string, string> = {
  "creator-series": "Creator Series",
  "camp-lifestyle-series": "Camp Lifestyle Series",
  "premium-camp-series": "Premium Camp Series",
  "tent-experience-series": "Tent Experience Series",
};

const featuredProductBySlug: Record<string, string> = {
  "creator-series": "dji-pocket-4-creator-combo",
  "camp-lifestyle-series": "yaber-t2-plus-projector",
  "premium-camp-series": "helinox-solo-full-set",
  "tent-experience-series": "black-dog-modular-tent-system",
};

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

  const catalogSeries = catalogSeriesBySlug[series.slug];
  const featuredProduct = featuredProductBySlug[series.slug];

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

            <RentItSeriesFeaturedProduct
              label="重点装备"
              locale="zh-Hans"
              preferredSlug={featuredProduct}
              series={catalogSeries}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <RentItSeriesMetrics locale="zh-Hans" series={catalogSeries} />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <RentItLivePriceGuide
          locale="zh-Hans"
          series={catalogSeries}
          title={`${series.eyebrow} 当前产品与价格`}
        />
        <RentItCatalogNoScriptFallback
          locale="zh-Hans"
          series={catalogSeries}
        />
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
        <ZhSectionHeading small="全部 Rent It 系列" big="也可以比较其他装备方向。" />
        <RentItSeriesCards
          anchorBasePath="/zh/rent-it"
          locale="zh-Hans"
        />
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
