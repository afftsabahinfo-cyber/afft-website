"use client";

import { RentItInfoCard } from "@/components/rent-it-shared";
import { useRentItLiveCatalog } from "@/components/RentItLiveCatalogProvider";
import {
  getActiveRentItProductsForSeries,
} from "@/lib/rent-it-live-catalog";
import {
  getRentItSeriesCopy,
  getRentItSeriesPresentation,
  getRentItSeriesStartingPrice,
  type RentItCatalogLocale,
} from "@/lib/rent-it-series";

export function RentItSeriesFeaturedProduct({
  series,
  preferredSlug,
  label,
  locale = "en",
}: {
  series: string;
  preferredSlug: string;
  label: string;
  locale?: RentItCatalogLocale;
}) {
  const { activeProducts, loading, live } = useRentItLiveCatalog();
  const products = getActiveRentItProductsForSeries(activeProducts, series);
  const product =
    products.find((item) => item.slug === preferredSlug) ?? products[0] ?? null;

  if (loading) {
    return (
      <div
        aria-busy="true"
        className="min-h-[320px] rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white/60"
        data-catalog-source="loading"
      >
        {locale === "zh-Hans"
          ? "正在载入当前重点产品…"
          : "Loading current featured product…"}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[320px] rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white/60">
        {locale === "zh-Hans"
          ? "当前产品暂时无法载入，请通过 WhatsApp 联络 AFFT。"
          : "Current products are temporarily unavailable. WhatsApp AFFT for help."}
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
      data-catalog-source={live ? "live" : "fallback"}
      data-featured-product-id={product.productId}
    >
      {product.image ? (
        <img
          alt={product.altText || product.officialName}
          className="h-[320px] w-full bg-white object-contain p-3 md:h-[420px]"
          src={product.image}
        />
      ) : (
        <div className="min-h-[320px] bg-[linear-gradient(145deg,#734C24,#10140F_65%,#182015)] md:min-h-[360px]" />
      )}
      <div className="border-t border-white/10 p-8">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/70">
          {label}
        </p>
        <h2 className="mt-4 text-4xl font-bold">{product.officialName}</h2>
        <p className="mt-4 font-bold text-[#F3922B]">{product.publicPrice}</p>
        <p className="mt-5 text-white/70">{product.publicDescription}</p>
      </div>
    </div>
  );
}

export function RentItSeriesMetrics({
  series,
  locale = "en",
}: {
  series: string;
  locale?: RentItCatalogLocale;
}) {
  const { activeProducts, loading, live } = useRentItLiveCatalog();
  const products = getActiveRentItProductsForSeries(activeProducts, series);
  const presentation = getRentItSeriesPresentation(series, products);
  const copy = getRentItSeriesCopy(presentation, locale);

  return (
    <div
      aria-busy={loading}
      className="mt-16 grid gap-6 md:grid-cols-3"
      data-catalog-source={loading ? "loading" : live ? "live" : "fallback"}
    >
      <RentItInfoCard
        title={locale === "zh-Hans" ? "Active 产品" : "Active Products"}
        text={
          loading
            ? locale === "zh-Hans"
              ? "正在载入最新目录"
              : "Loading current catalog"
            : String(products.length)
        }
      />
      <RentItInfoCard
        title={locale === "zh-Hans" ? "当前价格" : "Current Pricing"}
        text={
          loading
            ? locale === "zh-Hans"
              ? "正在载入最新目录"
              : "Loading current catalog"
            : getRentItSeriesStartingPrice(products)
        }
      />
      <RentItInfoCard
        title={locale === "zh-Hans" ? "适合" : "Best For"}
        text={copy.bestFor}
      />
    </div>
  );
}
