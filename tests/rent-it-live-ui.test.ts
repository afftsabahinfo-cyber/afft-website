import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { RentItLivePriceGuideView } from "../components/RentItLivePriceGuide";
import { RentItSeriesCardsView } from "../components/RentItSeriesCards";
import type { RentItLiveProduct } from "../lib/rent-it-live-catalog";
import { rentItSeriesAnchor } from "../lib/rent-it-series";

Object.assign(globalThis, { React });

const fiveSeries = [
  "Creator Series",
  "Camp Lifestyle Series",
  "Premium Camp Series",
  "Experience Set Series",
  "Tent Experience Series",
] as const;

const seriesProductCounts = [10, 26, 10, 3, 4] as const;

function fixtureProduct(
  index: number,
  series: string,
  overrides: Partial<RentItLiveProduct> = {},
): RentItLiveProduct {
  return {
    productId: `AFFT-RENT-UI-${String(index + 1).padStart(3, "0")}`,
    officialName: `UI Fixture Product ${index + 1}`,
    slug: `ui-fixture-product-${index + 1}`,
    series,
    status: "Active",
    publicPrice: "From RM49 / day",
    publicDescription: "Fixture product for the live Rent It UI.",
    bestFor: ["UI testing"],
    availability: "Subject to AFFT confirmation.",
    deliveryCollection: "Confirm with AFFT.",
    setup: "Confirm with AFFT.",
    image: "",
    altText: `UI Fixture Product ${index + 1}`,
    ...overrides,
  };
}

function activeFixtureProducts(): RentItLiveProduct[] {
  let productIndex = 0;

  return fiveSeries.flatMap((series, seriesIndex) =>
    Array.from({ length: seriesProductCounts[seriesIndex] }, () => {
      const product = fixtureProduct(productIndex, series);
      productIndex += 1;
      return product;
    }),
  );
}

function renderCards(products: RentItLiveProduct[], loading = false) {
  return renderToStaticMarkup(
    React.createElement(RentItSeriesCardsView, {
      activeProducts: products,
      loading,
      live: true,
    }),
  );
}

function renderGuide(products: RentItLiveProduct[], loading = false) {
  return renderToStaticMarkup(
    React.createElement(RentItLivePriceGuideView, {
      activeProducts: products,
      loading,
      live: true,
    }),
  );
}

function countMatches(html: string, pattern: RegExp) {
  return (html.match(pattern) ?? []).length;
}

test("five active series produce five cards and a future sixth series appears automatically", () => {
  const products = activeFixtureProducts();
  const fiveSeriesHtml = renderCards(products);

  assert.match(fiveSeriesHtml, /data-active-series-count="5"/);
  assert.equal(countMatches(fiveSeriesHtml, /data-series-card="true"/g), 5);
  for (const series of fiveSeries) {
    assert.match(fiveSeriesHtml, new RegExp(`data-series-name="${series}"`));
  }

  const sixthSeriesProduct = fixtureProduct(products.length, "Future Rental Series");
  const sixSeriesProducts = [...products, sixthSeriesProduct];
  const sixSeriesHtml = renderCards(sixSeriesProducts);
  const sixSeriesGuideHtml = renderGuide(sixSeriesProducts);
  const sixthSeriesAnchor = rentItSeriesAnchor("Future Rental Series");

  assert.match(sixSeriesHtml, /data-active-series-count="6"/);
  assert.equal(countMatches(sixSeriesHtml, /data-series-card="true"/g), 6);
  assert.match(sixSeriesHtml, /data-series-name="Future Rental Series"/);
  assert.equal(
    countMatches(sixSeriesGuideHtml, /data-series-price-guide=/g),
    6,
  );
  assert.ok(sixSeriesHtml.includes(`href="#${sixthSeriesAnchor}"`));
  assert.ok(sixSeriesGuideHtml.includes(`id="${sixthSeriesAnchor}"`));
});

test("unknown series cards always link to their own unique price-guide section", () => {
  const unknownSeries = [
    "A & B Series",
    "A and B Series",
    "户外体验系列",
    "新户外体验系列",
  ];
  const products = unknownSeries.map((series, index) =>
    fixtureProduct(index, series),
  );
  const cardsHtml = renderCards(products);
  const guideHtml = renderGuide(products);
  const anchors = unknownSeries.map(rentItSeriesAnchor);

  assert.equal(new Set(anchors).size, unknownSeries.length);
  for (const anchor of anchors) {
    assert.ok(cardsHtml.includes(`href="#${anchor}"`));
    assert.ok(guideHtml.includes(`id="${anchor}"`));
  }
});

test("53 active products render in five live price-guide articles with unchanged public prices", () => {
  const products = activeFixtureProducts();
  products[0] = fixtureProduct(0, fiveSeries[0], {
    publicPrice: "From RM47.50 / night",
  });

  const html = renderGuide(products);

  assert.match(html, /data-active-product-count="53"/);
  assert.match(html, /data-active-series-count="5"/);
  assert.equal(countMatches(html, /data-series-price-guide=/g), 5);
  assert.equal(countMatches(html, /data-product-id=/g), products.length);
  for (const product of products) {
    assert.ok(html.includes(`data-product-id="${product.productId}"`));
  }
  assert.match(html, /From RM47\.50 \/ night/);
  assert.match(html, />Public price</);
  assert.doesNotMatch(html, />2 Days</);
  assert.doesNotMatch(html, />3 Days</);
});

test("inactive products do not appear in either pure view", () => {
  const products = activeFixtureProducts();
  const inactiveProduct = fixtureProduct(products.length, fiveSeries[1], {
    productId: "AFFT-RENT-UI-INACTIVE",
    officialName: "Inactive Product Must Stay Hidden",
    slug: "inactive-product-must-stay-hidden",
    status: "Inactive",
  });
  const suppliedProducts = [...products, inactiveProduct];

  const cardsHtml = renderCards(suppliedProducts);
  const guideHtml = renderGuide(suppliedProducts);

  assert.doesNotMatch(cardsHtml, /Inactive Product Must Stay Hidden/);
  assert.match(guideHtml, /data-active-product-count="53"/);
  assert.doesNotMatch(guideHtml, /Inactive Product Must Stay Hidden/);
  assert.doesNotMatch(guideHtml, /AFFT-RENT-UI-INACTIVE/);
});

test("series pages match catalog series names after safe whitespace normalization", () => {
  const product = fixtureProduct(0, "Camp Lifestyle Series ");
  const html = renderToStaticMarkup(
    React.createElement(RentItLivePriceGuideView, {
      activeProducts: [product],
      loading: false,
      live: true,
      series: "Camp Lifestyle Series",
    }),
  );

  assert.match(html, /data-active-product-count="1"/);
  assert.ok(html.includes(`data-product-id="${product.productId}"`));
});

test("loading renders only current loading shells without stale cards or rows", () => {
  const products = activeFixtureProducts();
  const cardsHtml = renderCards(products, true);
  const guideHtml = renderGuide(products, true);

  assert.match(cardsHtml, /data-series-cards-loading="true"/);
  assert.match(cardsHtml, /Loading current rental series/);
  assert.doesNotMatch(cardsHtml, /data-series-card="true"/);
  assert.doesNotMatch(cardsHtml, /UI Fixture Product/);

  assert.match(guideHtml, /data-catalog-source="loading"/);
  assert.match(guideHtml, /data-price-guide-loading="true"/);
  assert.match(guideHtml, /Loading current products and prices/);
  assert.doesNotMatch(guideHtml, /data-active-product-count=/);
  assert.doesNotMatch(guideHtml, /data-series-price-guide=/);
  assert.doesNotMatch(guideHtml, /data-product-id=/);
  assert.doesNotMatch(guideHtml, /UI Fixture Product/);
});

test("one responsive guide renders each product once and shares the same 53-product input", () => {
  const products = activeFixtureProducts();
  const cardsHtml = renderCards(products);
  const guideHtml = renderGuide(products);
  const cardProductTotal = Array.from(
    cardsHtml.matchAll(/>(\d+) active item(?:s)?</g),
    (match) => Number(match[1]),
  ).reduce((sum, count) => sum + count, 0);

  assert.match(cardsHtml, /sm:grid-cols-2/);
  assert.equal(cardProductTotal, products.length);
  assert.match(guideHtml, /data-active-product-count="53"/);
  assert.equal(cardProductTotal, 53);
  assert.match(guideHtml, /data-responsive-price-table="true"/);
  assert.match(guideHtml, /block w-full text-left text-sm md:table/);
  assert.match(guideHtml, /block rounded-2xl[^\"]+md:table-row/);
  assert.match(guideHtml, /<thead class="sr-only[^\"]+md:not-sr-only/);
});

test("Chinese Rent It views use the same five live series and exact product rows", () => {
  const products = activeFixtureProducts();
  const cardsHtml = renderToStaticMarkup(
    React.createElement(RentItSeriesCardsView, {
      activeProducts: products,
      loading: false,
      live: true,
      locale: "zh-Hans",
    }),
  );
  const guideHtml = renderToStaticMarkup(
    React.createElement(RentItLivePriceGuideView, {
      activeProducts: products,
      loading: false,
      live: true,
      locale: "zh-Hans",
    }),
  );

  assert.match(cardsHtml, /data-active-series-count="5"/);
  assert.ok(cardsHtml.includes("体验组合系列"));
  assert.ok(cardsHtml.includes('href="/zh/rent-it/creator-series"'));
  assert.match(guideHtml, /data-active-product-count="53"/);
  assert.equal(countMatches(guideHtml, /data-product-id=/g), products.length);
  assert.ok(guideHtml.includes("AFFT 实时价格目录"));
});

test("English and Chinese Rent It route trees share one provider without component-level fetches", () => {
  const readSource = (relativePath: string) =>
    readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const englishLayout = readSource("../app/rent-it/layout.tsx");
  const chineseLayout = readSource("../app/zh/rent-it/layout.tsx");
  const routeSources = [
    readSource("../app/rent-it/page.tsx"),
    readSource("../app/zh/rent-it/page.tsx"),
    readSource("../components/RentItCatalogStats.tsx"),
    readSource("../components/RentItSeriesCards.tsx"),
    readSource("../components/RentItLivePriceGuide.tsx"),
    readSource("../components/RentItSeriesLiveSummary.tsx"),
  ].join("\n");

  assert.equal(
    countMatches(englishLayout, /<RentItLiveCatalogProvider>/g),
    1,
  );
  assert.equal(
    countMatches(chineseLayout, /<RentItLiveCatalogProvider>/g),
    1,
  );
  assert.doesNotMatch(routeSources, /\/api\/rent-it\/catalog/);
  assert.doesNotMatch(routeSources, /\bfetch\s*\(/);
});
