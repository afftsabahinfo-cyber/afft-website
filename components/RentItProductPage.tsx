import { RentItBackLink } from "@/components/rent-it-shared";
import { ZhSiteFooter, ZhSiteTopNav } from "@/components/ZhPageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";
import {
  absoluteRentItUrl,
  formatRentItPrice,
  getRelatedRentItProducts,
  getRentItCatalogIdentity,
  getRentItProductDisplayImage,
  getRentItProductPageCopy,
  getRentItProductPath,
  getRentItSeriesPath,
  type RentItProductLocale,
} from "@/lib/rent-it-product-seo";
import type { RentItLiveProduct } from "@/lib/rent-it-live-catalog";

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</gu, "\\u003c");
}

function publicPriceAmount(product: RentItLiveProduct) {
  if (typeof product.publicPriceAmount === "number") {
    return product.publicPriceAmount;
  }
  const match = product.publicPrice.match(/RM\s*([\d,]+(?:\.\d+)?)/iu);
  if (!match) return null;
  const amount = Number(match[1].replace(/,/gu, ""));
  return Number.isFinite(amount) ? amount : null;
}

function productSchema(product: RentItLiveProduct, locale: RentItProductLocale) {
  const path = getRentItProductPath(product, locale);
  const amount = publicPriceAmount(product);
  const copy = getRentItProductPageCopy(product, locale);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteRentItUrl(path)}#product`,
    name: product.officialName,
    sku: product.productId,
    image: product.image || undefined,
    description: copy.directAnswer,
    category: product.series,
    url: absoluteRentItUrl(path),
    offers:
      amount === null
        ? undefined
        : {
            "@type": "Offer",
            url: absoluteRentItUrl(path),
            price: amount,
            priceCurrency: "MYR",
            availability: "https://schema.org/LimitedAvailability",
            businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
            seller: {
              "@type": "Organization",
              name: "AFFT Club",
              url: "https://afft.club",
            },
            description: `${formatRentItPrice(product, locale)}. Availability is confirmed by AFFT on WhatsApp.`,
          },
  };
}

function breadcrumbSchema(
  product: RentItLiveProduct,
  locale: RentItProductLocale,
) {
  const rentItPath = locale === "zh-Hans" ? "/zh/rent-it" : "/rent-it";
  const productPath = getRentItProductPath(product, locale);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "AFFT Club",
        item: locale === "zh-Hans" ? "https://afft.club/zh" : "https://afft.club",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rent It",
        item: absoluteRentItUrl(rentItPath),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.officialName,
        item: absoluteRentItUrl(productPath),
      },
    ],
  };
}

export function RentItProductPage({
  product,
  locale,
}: {
  product: RentItLiveProduct;
  locale: RentItProductLocale;
}) {
  const isChinese = locale === "zh-Hans";
  const catalogIdentity = getRentItCatalogIdentity();
  const copy = getRentItProductPageCopy(product, locale);
  const displayImage = getRentItProductDisplayImage(product);
  const relatedProducts = getRelatedRentItProducts(product);
  const currentPath = getRentItProductPath(product, locale);
  const alternatePath = getRentItProductPath(
    product,
    isChinese ? "en" : "zh-Hans",
  );
  const seriesPath = getRentItSeriesPath(product, locale);
  const inclusions = product.confirmedInclusions?.filter(Boolean).slice(0, 5) ?? [];
  const availability = isChinese
    ? "日期与数量需由 AFFT 确认。"
    : product.availability;
  const whatsappMessage = isChinese
    ? `你好 AFFT，我想租借 ${product.officialName}（${copy.price}）。请帮我确认日期、可用数量和取还方式。`
    : `Hi AFFT, I want to rent ${product.officialName} (${product.publicPrice}). Please confirm the dates, available quantity and pickup or delivery.`;

  return (
    <main
      className="min-h-screen bg-[#10140F] text-white"
      data-catalog-version={catalogIdentity.version || "current"}
      data-product-id={product.productId}
      data-rent-it-product-page="true"
      lang={locale}
    >
      <script
        dangerouslySetInnerHTML={{
          __html: safeJson([
            productSchema(product, locale),
            breadcrumbSchema(product, locale),
          ]),
        }}
        type="application/ld+json"
      />

      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          {isChinese ? (
            <ZhSiteTopNav />
          ) : (
            <RentItBackLink href="/rent-it" label={copy.backLabel} />
          )}

          <nav
            aria-label={isChinese ? "面包屑" : "Breadcrumb"}
            className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm"
          >
            <div className="flex flex-wrap items-center gap-2 text-white/55">
              <a className="font-bold text-[#F3922B]" href={isChinese ? "/zh/rent-it" : "/rent-it"}>
                Rent It
              </a>
              <span aria-hidden="true">/</span>
              <a className="hover:text-white" href={seriesPath}>
                {product.series}
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-white/80">{product.officialName}</span>
            </div>
            <a
              className="rounded-full border border-white/15 px-4 py-2 font-bold text-white hover:border-[#F3922B]/50"
              href={alternatePath}
              hrefLang={isChinese ? "en" : "zh-Hans"}
            >
              {copy.languageLabel}
            </a>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F3922B]">
                {copy.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                {product.officialName}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78 md:text-xl">
                {copy.directAnswer}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {copy.uses.map((use) => (
                  <span
                    className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white/72"
                    key={use}
                  >
                    {use}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="rounded-full bg-[#F3922B] px-7 py-4 font-bold text-black"
                  href={makeWhatsappLink(whatsappMessage)}
                  rel="noreferrer"
                  target="_blank"
                >
                  {copy.ctaButton}
                </a>
                <a
                  className="rounded-full border border-white/15 px-7 py-4 font-bold text-white"
                  href="#rental-essentials"
                >
                  {copy.detailsLabel}
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4">
              {displayImage ? (
                <img
                  alt={product.altText || product.officialName}
                  className="aspect-square w-full rounded-[1.5rem] bg-white object-contain p-4"
                  decoding="async"
                  fetchPriority="high"
                  src={displayImage}
                />
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-[1.5rem] border border-dashed border-white/15 bg-black/20 p-8 text-center text-white/60">
                  {isChinese
                    ? "组合照片由 AFFT 在 WhatsApp 确认，不使用虚构产品图。"
                    : "AFFT confirms the set photo on WhatsApp. No placeholder product image is used."}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl scroll-mt-6 px-6 py-12 md:px-10"
        id="rental-essentials"
      >
        <div className="grid gap-5 md:grid-cols-3">
          <InfoCard label={copy.priceLabel} value={copy.price} />
          <InfoCard label={copy.bestForLabel} value={copy.uses.join(" · ")} />
          <InfoCard label={copy.availabilityLabel} value={availability} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
            <h2 className="text-2xl font-bold">{copy.includedLabel}</h2>
            {inclusions.length ? (
              <ul className="mt-5 grid gap-3 text-white/72">
                {inclusions.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span aria-hidden="true" className="text-[#F3922B]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 leading-7 text-white/70">{copy.includedFallback}</p>
            )}
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[#182015] p-7">
            <h2 className="text-2xl font-bold">{copy.arrangementLabel}</h2>
            <p className="mt-4 leading-7 text-white/72">{copy.arrangement}</p>
            <p className="mt-4 text-sm leading-6 text-white/50">{copy.experience}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.16em] text-white/40">
              {copy.checkedLabel}: {product.sourceLastChecked || "2026-08-03"}
            </p>
          </section>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <h2 className="text-3xl font-bold">{copy.relatedLabel}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedProducts.map((related) => (
              <a
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-[#F3922B]/45"
                href={getRentItProductPath(related, locale)}
                key={related.productId}
              >
                <p className="text-sm text-[#F3922B]">{formatRentItPrice(related, locale)}</p>
                <h3 className="mt-2 text-xl font-bold">{related.officialName}</h3>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-10">
        <div className="rounded-[2rem] bg-[#F3922B] p-8 text-black md:p-12">
          <h2 className="text-3xl font-bold md:text-5xl">{copy.ctaTitle}</h2>
          <p className="mt-4 max-w-3xl text-lg">{copy.ctaText}</p>
          <a
            className="mt-8 inline-flex rounded-full bg-black px-8 py-4 font-bold text-white"
            href={makeWhatsappLink(whatsappMessage)}
            rel="noreferrer"
            target="_blank"
          >
            {copy.ctaButton}
          </a>
          <p className="mt-5 text-sm text-black/60">{currentPath}</p>
        </div>
      </section>

      {isChinese ? <ZhSiteFooter /> : null}
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F3922B]">
        {label}
      </p>
      <p className="mt-3 leading-7 text-white/78">{value}</p>
    </div>
  );
}
