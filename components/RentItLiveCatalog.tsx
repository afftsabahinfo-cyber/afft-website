"use client";

import { useEffect, useState } from "react";
import { useRentItLiveCatalog } from "@/components/RentItLiveCatalogProvider";
import {
  groupActiveRentItProducts,
  type RentItLiveCatalog as RentItLiveCatalogData,
  type RentItLiveProduct,
} from "@/lib/rent-it-live-catalog";

const seriesRoutes: Record<string, string> = {
  "Creator Series": "/rent-it/creator-series",
  "Camp Lifestyle Series": "/rent-it/camp-lifestyle-series",
  "Premium Camp Series": "/rent-it/premium-camp-series",
  "Experience Set Series": "/rent-it#price-guide",
  "Tent Experience Series": "/rent-it/tent-experience-series",
};

const seriesOrder = Object.keys(seriesRoutes);

export function RentItLiveCatalog() {
  const { catalog, loading, live, activeProducts } = useRentItLiveCatalog();

  if (loading || !catalog) return null;

  return (
    <RentItLiveCatalogView
      catalog={catalog}
      live={live}
      activeProducts={activeProducts}
    />
  );
}

export function RentItLiveCatalogView({
  catalog,
  live,
  activeProducts,
}: {
  catalog: RentItLiveCatalogData;
  live: boolean;
  activeProducts: RentItLiveProduct[];
}) {
  const groups = groupActiveRentItProducts(activeProducts, seriesOrder);
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

  return (
    <section
      className="mt-20 rounded-[2rem] border border-[#F3922B]/20 bg-[#182015] p-8 md:p-10"
      data-active-product-count={activeProducts.length}
      data-catalog-source={live ? "live" : "fallback"}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
            Live AFFT Catalog
          </p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Current Rent It products
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            This list is refreshed from AFFT&apos;s approved product catalog.
            Availability and final quotations still require AFFT confirmation.
          </p>
        </div>
        <p className="text-sm text-white/50">
          {live
            ? `Catalog ${catalog.version ? `v${catalog.version}` : "current"}`
            : "Catalog fallback"}
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <div key={group.series}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-bold">{group.series}</h3>
              {seriesRoutes[group.series] ? (
                <a
                  href={seriesRoutes[group.series]}
                  className="text-sm font-bold text-[#F3922B]"
                >
                  Open Series &rarr;
                </a>
              ) : null}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.products.map((product) => (
                <article
                  key={product.productId}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-black/20"
                  data-product-id={product.productId}
                >
                  {product.image ? (
                    <button
                      type="button"
                      className="group block w-full cursor-zoom-in bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F3922B]"
                      aria-label={`View larger image of ${product.officialName}`}
                      data-rent-it-image-trigger="true"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.altText}
                        loading="lazy"
                        decoding="async"
                        className="h-48 w-full bg-white object-contain p-3 transition duration-200 group-hover:scale-[1.02]"
                      />
                    </button>
                  ) : null}
                  <div className="p-5">
                    <h4 className="text-xl font-bold">{product.officialName}</h4>
                    <p className="mt-2 font-bold text-[#F3922B]">
                      {product.publicPrice}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/65">
                      {product.publicDescription}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-white/45">
                      {product.availability}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedProduct?.image ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rent-it-image-dialog-title"
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
                alt={selectedProduct.altText}
                className="max-h-[calc(90vh-8rem)] max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
