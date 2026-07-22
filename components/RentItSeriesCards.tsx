"use client";

import Link from "next/link";
import { useRentItLiveCatalog } from "@/components/RentItLiveCatalogProvider";
import {
  groupActiveRentItProducts,
  type RentItLiveProduct,
} from "@/lib/rent-it-live-catalog";
import {
  getRentItSeriesCopy,
  getRentItSeriesHref,
  getRentItSeriesPresentation,
  getRentItSeriesStartingPrice,
  rentItPreferredSeriesOrder,
  type RentItCatalogLocale,
} from "@/lib/rent-it-series";

export function RentItSeriesCards({
  locale = "en",
  anchorBasePath = "",
}: {
  locale?: RentItCatalogLocale;
  anchorBasePath?: string;
}) {
  const { activeProducts, loading, live } = useRentItLiveCatalog();

  return (
    <RentItSeriesCardsView
      activeProducts={activeProducts}
      live={live}
      loading={loading}
      locale={locale}
      anchorBasePath={anchorBasePath}
    />
  );
}

export function RentItSeriesCardsView({
  activeProducts,
  loading,
  live,
  locale = "en",
  anchorBasePath = "",
}: {
  activeProducts: RentItLiveProduct[];
  loading: boolean;
  live: boolean;
  locale?: RentItCatalogLocale;
  anchorBasePath?: string;
}) {
  if (loading) {
    return (
      <div
        aria-busy="true"
        aria-live="polite"
        className="rounded-[2rem] border border-white/10 bg-white/5 p-7 text-white/60"
        data-series-cards-loading="true"
      >
        {locale === "zh-Hans" ? "正在载入最新租赁系列…" : "Loading current rental series…"}
      </div>
    );
  }

  const groups = groupActiveRentItProducts(
    activeProducts,
    rentItPreferredSeriesOrder,
  );

  if (groups.length === 0) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 text-white/60">
        {locale === "zh-Hans"
          ? "当前系列暂时无法载入，请通过 WhatsApp 联络 AFFT。"
          : "Current series are temporarily unavailable. WhatsApp AFFT for help."}
      </div>
    );
  }

  return (
    <div
      className="grid gap-4 sm:grid-cols-2"
      data-active-series-count={groups.length}
      data-catalog-source={live ? "live" : "fallback"}
    >
      {groups.map((group, index) => {
        const presentation = getRentItSeriesPresentation(
          group.series,
          group.products,
        );
        const copy = getRentItSeriesCopy(presentation, locale);
        const href = getRentItSeriesHref(group.series, group.products, {
          locale,
          anchorBasePath,
        });
        const isLastOddCard = groups.length % 2 === 1 && index === groups.length - 1;

        return (
          <Link
            className={`overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40 ${
              isLastOddCard ? "sm:col-span-2" : ""
            }`}
            data-series-card="true"
            data-series-name={group.series}
            href={href}
            key={group.series}
          >
            {presentation.image ? (
              <img
                alt={presentation.imageAlt}
                className="h-36 w-full bg-white object-contain p-2"
                src={presentation.image}
              />
            ) : null}
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F3922B]">
                  {getRentItSeriesStartingPrice(group.products)}
                </p>
                <p className="text-xs font-semibold text-white/50">
                  {locale === "zh-Hans"
                    ? `${group.products.length} 件可租产品`
                    : `${group.products.length} active item${
                        group.products.length === 1 ? "" : "s"
                      }`}
                </p>
              </div>
              <h2 className="mt-3 text-2xl font-bold">{copy.title}</h2>
              <p className="mt-3 text-sm font-semibold text-white/75">
                {copy.hook}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/55">
                {copy.bestFor}
              </p>
              <span className="mt-5 inline-block text-sm font-bold text-[#F3922B]">
                {locale === "zh-Hans"
                  ? presentation.route
                    ? "打开系列"
                    : "查看实时价格"
                  : presentation.route
                    ? "Open Series"
                    : "View Live Prices"} &rarr;
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
