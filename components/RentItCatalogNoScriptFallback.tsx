import { makeWhatsappLink } from "@/lib/rent-it-data";
import { checkedInRentItFallbackCatalog } from "@/lib/rent-it-fallback-catalog";
import {
  getActiveRentItProductsForSeries,
  getRentItCatalogMetrics,
  groupActiveRentItProducts,
} from "@/lib/rent-it-live-catalog";
import {
  rentItPreferredSeriesOrder,
  type RentItCatalogLocale,
} from "@/lib/rent-it-series";

export function RentItCatalogNoScriptFallback({
  locale = "en",
  series,
}: {
  locale?: RentItCatalogLocale;
  series?: string;
}) {
  const metrics = getRentItCatalogMetrics(checkedInRentItFallbackCatalog);
  const products = series
    ? getActiveRentItProductsForSeries(metrics.activeProducts, series)
    : metrics.activeProducts;
  const groups = groupActiveRentItProducts(
    products,
    rentItPreferredSeriesOrder,
  );

  return (
    <noscript>
      <style>{`[data-catalog-source="loading"],[data-series-cards-loading="true"]{display:none!important}`}</style>
      <section
        className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8"
        data-noscript-catalog-fallback="true"
      >
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#F3922B]">
          {locale === "zh-Hans" ? "目录备用资料" : "Catalog fallback"}
        </p>
        <h2 className="mt-3 text-3xl font-bold">
          {locale === "zh-Hans"
            ? "JavaScript 未运行，以下显示网站内置的备用目录。"
            : "JavaScript is unavailable, so the checked-in fallback catalog is shown."}
        </h2>
        <p className="mt-4 max-w-3xl text-white/65">
          {locale === "zh-Hans"
            ? "产品、价格、日期与数量可能已有更新。请通过 WhatsApp 向 AFFT 确认最新资料。"
            : "Products, prices, dates and quantities may have changed. Confirm the latest details with AFFT on WhatsApp."}
        </p>

        <div className="mt-8 space-y-6">
          {groups.map((group) => (
            <div key={group.series}>
              <h3 className="text-xl font-bold">{group.series}</h3>
              <ul className="mt-3 grid gap-2 md:grid-cols-2">
                {group.products.map((product) => (
                  <li
                    className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm"
                    key={product.productId}
                  >
                    <span>{product.officialName}</span>
                    <strong className="shrink-0 text-[#F3922B]">
                      {product.publicPrice}
                    </strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <a
          className="mt-8 inline-flex rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
          href={makeWhatsappLink(
            locale === "zh-Hans"
              ? "你好 AFFT，我无法载入实时 Rent It 目录，请帮我确认当前产品与价格。"
              : "Hi AFFT, I could not load the live Rent It catalog. Please help me confirm the current products and prices.",
          )}
        >
          {locale === "zh-Hans" ? "WhatsApp 确认最新目录" : "Confirm the live catalog"}
        </a>
      </section>
    </noscript>
  );
}
