"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRentItLiveCatalog } from "@/components/RentItLiveCatalogProvider";
import { getLocalizedRentItBestFor } from "@/lib/rent-it-best-for";
import { makeWhatsappLink } from "@/lib/rent-it-data";
import {
  getActiveRentItProductsForSeries,
  groupActiveRentItProducts,
  type RentItLiveProduct,
} from "@/lib/rent-it-live-catalog";
import {
  getRentItSeriesPresentation,
  rentItPreferredSeriesOrder,
  rentItSeriesAnchor,
  type RentItCatalogLocale,
} from "@/lib/rent-it-series";

type RentItLivePriceGuideProps = {
  series?: string;
  title?: string;
  description?: string;
  locale?: RentItCatalogLocale;
};

function productEnquiryLink(
  product: RentItLiveProduct,
  locale: RentItCatalogLocale,
) {
  return makeWhatsappLink(
    locale === "zh-Hans"
      ? `你好 AFFT，我想查询 ${product.officialName}（${product.publicPrice}）。`
      : `Hi AFFT, I want to check ${product.officialName} (${product.publicPrice}).`,
  );
}

function ProductImage({
  product,
  onOpen,
}: {
  product: RentItLiveProduct;
  onOpen: (product: RentItLiveProduct) => void;
}) {
  if (!product.image) {
    return (
      <div
        aria-hidden="true"
        className="aspect-[4/3] w-full rounded-2xl border border-white/10 bg-black/20 lg:aspect-square"
        data-rent-it-image-empty="true"
      />
    );
  }

  return (
    <button
      type="button"
      className="group aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-white p-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3922B] lg:aspect-square"
      aria-label={`View larger image of ${product.officialName}`}
      data-rent-it-image-trigger="true"
      onClick={() => onOpen(product)}
    >
      <img
        alt={product.altText || product.officialName}
        className="h-full w-full rounded-xl object-contain transition duration-200 group-hover:scale-105"
        decoding="async"
        loading="lazy"
        src={product.image}
      />
    </button>
  );
}

export function RentItLivePriceGuide(props: RentItLivePriceGuideProps) {
  const { activeProducts, loading, live } = useRentItLiveCatalog();

  return (
    <RentItLivePriceGuideView
      {...props}
      activeProducts={activeProducts}
      live={live}
      loading={loading}
    />
  );
}

export function RentItLivePriceGuideView({
  activeProducts,
  loading,
  live,
  series,
  title,
  description,
  locale = "en",
}: RentItLivePriceGuideProps & {
  activeProducts: RentItLiveProduct[];
  loading: boolean;
  live: boolean;
}) {
  const [selectedProduct, setSelectedProduct] =
    useState<RentItLiveProduct | null>(null);

  useEffect(() => {
    if (!selectedProduct) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProduct(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProduct]);

  const approvedActiveProducts = activeProducts.filter(
    (product) => product.status === "Active",
  );
  const visibleProducts = series
    ? getActiveRentItProductsForSeries(approvedActiveProducts, series)
    : approvedActiveProducts;
  const groups = groupActiveRentItProducts(
    visibleProducts,
    rentItPreferredSeriesOrder,
  );
  const sectionTitle =
    title ??
    (locale === "zh-Hans"
      ? series
        ? `${series} 实时价格目录`
        : "当前产品与价格"
      : series
        ? `${series} Price Guide`
        : "Current products and prices");
  const sectionDescription =
    description ??
    (locale === "zh-Hans"
      ? series
        ? "以下每一项 Active 产品和公开价格都来自 AFFT 已核准目录。日期、数量与最终安排请通过 WhatsApp 确认。"
        : "这里使用与 AFFT 网站及 Alice Li 相同的已核准目录。多日租赁报价由 AFFT 确认，页面不会自行推算。"
      : series
        ? "Every active product and public price below comes from AFFT's approved catalog. Confirm dates, quantities and final arrangements on WhatsApp."
        : "Compare every active Rent It product using the same approved catalog that powers AFFT's website and Alice Li. Multi-day quotations are confirmed by AFFT rather than estimated on the page.");

  return (
    <section
      aria-busy={loading}
      className="mt-20"
      data-active-product-count={loading ? undefined : visibleProducts.length}
      data-active-series-count={loading ? undefined : groups.length}
      data-catalog-source={loading ? "loading" : live ? "live" : "fallback"}
      id={series ? undefined : "price-guide"}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
            {locale === "zh-Hans"
              ? series
                ? "实时系列目录"
                : "AFFT 实时价格目录"
              : series
                ? "Live Series Catalog"
                : "Live AFFT Price Guide"}
          </p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">{sectionTitle}</h2>
          <p className="mt-5 text-white/70">{sectionDescription}</p>
        </div>
        <p className="text-sm text-white/50" aria-live="polite">
          {loading
            ? locale === "zh-Hans"
              ? "正在载入最新目录"
              : "Loading current catalog"
            : live
              ? locale === "zh-Hans"
                ? "实时目录"
                : "Live catalog"
              : locale === "zh-Hans"
                ? "目录备用资料"
                : "Catalog fallback"}
        </p>
      </div>

      {loading ? (
        <div
          className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white/60"
          data-price-guide-loading="true"
        >
          {locale === "zh-Hans"
            ? "正在载入当前产品与价格…"
            : "Loading current products and prices…"}
        </div>
      ) : groups.length === 0 ? (
        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white/60">
          {locale === "zh-Hans"
            ? "这个系列目前没有 Active 产品，请通过 WhatsApp 联络 AFFT。"
            : "No active products are currently listed for this series. WhatsApp AFFT for help."}
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          {groups.map((group) => {
            const presentation = getRentItSeriesPresentation(
              group.series,
              group.products,
            );

            return (
              <article
                className="scroll-mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-8"
                data-series-price-guide={group.series}
                id={rentItSeriesAnchor(group.series)}
                key={group.series}
              >
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-3xl font-bold">{group.series}</h3>
                    <p className="mt-2 text-sm text-white/55">
                      {locale === "zh-Hans"
                        ? `${group.products.length} 件 Active 产品 · 当前公开价格`
                        : `${group.products.length} active product${
                            group.products.length === 1 ? "" : "s"
                          } · Current public prices`}
                    </p>
                  </div>
                  {!series && presentation.route ? (
                    <Link
                      className="inline-flex self-start rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white"
                      href={
                        locale === "zh-Hans"
                          ? `/zh${presentation.route}`
                          : presentation.route
                      }
                    >
                      {locale === "zh-Hans" ? "打开系列页面" : "Open Series Page"}
                    </Link>
                  ) : null}
                </div>

                <div data-responsive-product-rows="true">
                  <div className="hidden border-b border-white/10 pb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 xl:grid xl:grid-cols-[168px_minmax(190px,1.05fr)_minmax(130px,0.55fr)_minmax(300px,1.55fr)_112px] xl:gap-6">
                    <span aria-hidden="true" />
                    <span>{locale === "zh-Hans" ? "产品" : "Product"}</span>
                    <span>{locale === "zh-Hans" ? "公开价格" : "Public price"}</span>
                    <span>{locale === "zh-Hans" ? "适合" : "Best for"}</span>
                    <span>{locale === "zh-Hans" ? "查询" : "Enquire"}</span>
                  </div>

                  <div className="divide-y divide-white/10">
                    {group.products.map((product) => (
                      <div
                        className="grid gap-5 py-6 first:pt-0 sm:grid-cols-[160px_minmax(0,1fr)] xl:grid-cols-[168px_minmax(190px,1.05fr)_minmax(130px,0.55fr)_minmax(300px,1.55fr)_112px] xl:items-start xl:gap-6 xl:first:pt-6"
                        data-product-id={product.productId}
                        data-rent-it-product-row="true"
                        key={product.productId}
                      >
                        <ProductImage
                          product={product}
                          onOpen={setSelectedProduct}
                        />

                        <div className="min-w-0 xl:pt-2">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/45 xl:hidden">
                            {locale === "zh-Hans" ? "产品" : "Product"}
                          </p>
                          <Link
                            className="text-lg font-bold leading-7 text-white underline decoration-white/20 underline-offset-4 transition hover:text-[#F3922B] hover:decoration-[#F3922B]/60"
                            href={
                              locale === "zh-Hans"
                                ? `/zh/rent-it/${product.slug}`
                                : `/rent-it/${product.slug}`
                            }
                          >
                            {product.officialName}
                          </Link>
                        </div>

                        <div className="xl:pt-2">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/45 xl:hidden">
                            {locale === "zh-Hans" ? "公开价格" : "Public price"}
                          </p>
                          <p className="whitespace-nowrap font-bold text-[#F3922B]">
                            {product.publicPrice}
                          </p>
                        </div>

                        <div className="min-w-0 xl:pt-2">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/45 xl:hidden">
                            {locale === "zh-Hans" ? "适合" : "Best for"}
                          </p>
                          <p className="text-[15px] leading-7 text-white/70">
                            {getLocalizedRentItBestFor(
                              product.bestFor,
                              product.series,
                              locale,
                            ).join(" · ")}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 sm:col-start-2 xl:col-start-auto xl:flex-col xl:items-stretch xl:pt-1">
                          <a
                            className="inline-flex justify-center whitespace-nowrap rounded-full border border-[#F3922B]/55 bg-[#F3922B] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#ffab4f] xl:bg-transparent xl:text-[#F3922B] xl:hover:bg-[#F3922B] xl:hover:text-black"
                            href={productEnquiryLink(product, locale)}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {locale === "zh-Hans" ? "WhatsApp 咨询" : "WhatsApp"}
                          </a>
                          <Link
                            className="inline-flex justify-center whitespace-nowrap px-3 py-2 text-xs font-bold text-white/55 transition hover:text-white"
                            href={
                              locale === "zh-Hans"
                                ? `/zh/rent-it/${product.slug}`
                                : `/rent-it/${product.slug}`
                            }
                          >
                            {locale === "zh-Hans" ? "详情" : "Details"}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {selectedProduct?.image ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rent-it-image-dialog-title"
            data-rent-it-image-dialog="true"
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#182015] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-7">
              <div className="min-w-0">
                <h2
                  id="rent-it-image-dialog-title"
                  className="truncate text-lg font-bold text-white md:text-2xl"
                >
                  {selectedProduct.officialName}
                </h2>
                <p className="mt-1 text-sm font-bold text-[#F3922B]">
                  {selectedProduct.publicPrice}
                </p>
              </div>
              <button
                type="button"
                autoFocus
                aria-label="Close product image"
                className="shrink-0 rounded-full border border-white/20 px-3 py-1.5 text-sm font-bold text-white transition hover:border-[#F3922B] hover:text-[#F3922B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3922B]"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </div>
            <div className="flex min-h-0 items-center justify-center overflow-auto bg-white p-4 md:p-8">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.altText || selectedProduct.officialName}
                className="max-h-[calc(90vh-8rem)] max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
