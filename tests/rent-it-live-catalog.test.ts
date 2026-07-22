import assert from "node:assert/strict";
import test from "node:test";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { RentItCatalogStatsView } from "../components/RentItCatalogStats";
import { RentItLiveCatalogView } from "../components/RentItLiveCatalog";
import {
  campLifestyleItems,
  creatorSeriesItems,
  experienceSetItems,
  premiumCampItems,
  tentShowcaseItems,
} from "../lib/rent-it-data";
import { checkedInRentItFallbackCatalog } from "../lib/rent-it-fallback-catalog";
import {
  buildRentItStatCards,
  getRentItCatalogMetrics,
  groupActiveRentItProducts,
  loadRentItCatalog,
  type RentItLiveCatalog,
  type RentItLiveProduct,
} from "../lib/rent-it-live-catalog";

Object.assign(globalThis, { React });

function product(
  index: number,
  overrides: Partial<RentItLiveProduct> = {},
): RentItLiveProduct {
  return {
    productId: `AFFT-RENT-TEST-${String(index + 1).padStart(3, "0")}`,
    officialName: `Fixture Product ${index + 1}`,
    slug: `fixture-product-${index + 1}`,
    series: `Fixture Series ${(index % 4) + 1}`,
    status: "Active",
    publicPrice: "From RM49 / day",
    publicDescription: "Fixture product.",
    bestFor: ["Testing"],
    availability: "Subject to confirmation.",
    deliveryCollection: "Confirm with AFFT.",
    setup: "Confirm with AFFT.",
    image: "",
    altText: `Fixture Product ${index + 1}`,
    ...overrides,
  };
}

function catalog(products: RentItLiveProduct[]): RentItLiveCatalog {
  return { version: "fixture", updatedAt: null, products };
}

test("39 active fixture products produce a count of 39", () => {
  const fixture = catalog(Array.from({ length: 39 }, (_, index) => product(index)));
  const metrics = getRentItCatalogMetrics(fixture);
  const stats = buildRentItStatCards({ loading: false, ...metrics });
  assert.equal(metrics.activeProductCount, 39);
  assert.equal(stats[0].value, "39");
});

test("adding the 40th active product updates the count without business constants", () => {
  const products = Array.from({ length: 39 }, (_, index) => product(index));
  const before = getRentItCatalogMetrics(catalog(products));
  const after = getRentItCatalogMetrics(catalog([...products, product(39)]));
  const stats = buildRentItStatCards({ loading: false, ...after });
  assert.equal(before.activeProductCount, 39);
  assert.equal(after.activeProductCount, 40);
  assert.equal(stats[0].value, "40");
});

test("an inactive product is excluded from the active count", () => {
  const products = Array.from({ length: 39 }, (_, index) => product(index));
  products[0] = product(0, { status: "Inactive" });
  assert.equal(getRentItCatalogMetrics(catalog(products)).activeProductCount, 38);
});

test("a fifth active series updates the unique series count", () => {
  const products = Array.from({ length: 39 }, (_, index) => product(index));
  products.push(product(39, { series: "Fixture Series 5" }));
  const metrics = getRentItCatalogMetrics(catalog(products));
  const stats = buildRentItStatCards({ loading: false, ...metrics });
  const groups = groupActiveRentItProducts(metrics.activeProducts);
  assert.equal(metrics.activeSeriesCount, 5);
  assert.equal(stats[1].value, "5");
  assert.ok(groups.some((group) => group.series === "Fixture Series 5"));
});

test("catalog API failure selects checked-in fallback and derives its counts", async () => {
  const result = await loadRentItCatalog({
    fetcher: async () => {
      throw new Error("offline");
    },
    fallbackCatalog: checkedInRentItFallbackCatalog,
  });
  const metrics = getRentItCatalogMetrics(result.catalog);

  assert.equal(result.live, false);
  assert.equal(
    result.catalog.products.length,
    creatorSeriesItems.length +
      campLifestyleItems.length +
      premiumCampItems.length +
      experienceSetItems.length +
      tentShowcaseItems.length,
  );
  assert.equal(
    metrics.activeProductCount,
    checkedInRentItFallbackCatalog.products.filter(
      (item) => item.status === "Active",
    ).length,
  );
  assert.equal(
    metrics.activeSeriesCount,
    new Set(
      checkedInRentItFallbackCatalog.products
        .filter((item) => item.status === "Active")
        .map((item) => item.series),
    ).size,
  );
  assert.deepEqual(
    new Set(result.catalog.products.map((item) => item.series)),
    new Set([
      "Creator Series",
      "Camp Lifestyle Series",
      "Premium Camp Series",
      "Experience Set Series",
      "Tent Experience Series",
    ]),
  );
  assert.ok(
    result.catalog.products.every(
      (item) => !/\/\s*day\s*\/\s*day/i.test(item.publicPrice),
    ),
  );
});

test("loading stats never flash a checked-in product or series number", () => {
  const stats = buildRentItStatCards({
    loading: true,
    activeProductCount: null,
    activeSeriesCount: null,
  });
  assert.deepEqual(
    stats.slice(0, 2).map((item) => item.value),
    ["—", "—"],
  );
  assert.ok(stats.slice(0, 2).every((item) => item.label === "loading current catalog"));

  const html = renderToStaticMarkup(
    React.createElement(RentItCatalogStatsView, {
      stats,
      loading: true,
      live: false,
    }),
  );
  assert.match(html, /loading current catalog/);
  assert.match(html, /—/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /md:grid-cols-3/);
  assert.doesNotMatch(html, /data-active-product-count=/);
});

test("live groups and top-level count use the same active product set", () => {
  const products = Array.from({ length: 40 }, (_, index) =>
    product(
      index,
      index === 0
        ? { status: "Inactive" }
        : index === 39
          ? { series: "Fixture Series 5" }
          : {},
    ),
  );
  const metrics = getRentItCatalogMetrics(catalog(products));
  const groups = groupActiveRentItProducts(metrics.activeProducts);
  const renderedProductCount = groups.reduce(
    (count, group) => count + group.products.length,
    0,
  );

  assert.equal(renderedProductCount, metrics.activeProductCount);

  const stats = buildRentItStatCards({ loading: false, ...metrics });
  const statsHtml = renderToStaticMarkup(
    React.createElement(RentItCatalogStatsView, {
      stats,
      loading: false,
      live: true,
    }),
  );
  const catalogHtml = renderToStaticMarkup(
    React.createElement(RentItLiveCatalogView, {
      catalog: catalog(products),
      live: true,
      activeProducts: metrics.activeProducts,
    }),
  );
  assert.match(
    statsHtml,
    new RegExp(`data-active-product-count="${metrics.activeProductCount}"`),
  );
  assert.equal(
    (catalogHtml.match(/data-product-id=/g) ?? []).length,
    metrics.activeProductCount,
  );
  assert.match(catalogHtml, /Fixture Series 5/);
  assert.match(catalogHtml, /sm:grid-cols-2 xl:grid-cols-3/);
});

test("unknown active series stay visible and blank series do not drop active cards", () => {
  const products = [
    product(0, { series: "Future Series" }),
    product(1, { series: " " }),
  ];
  const metrics = getRentItCatalogMetrics(catalog(products));
  const groups = groupActiveRentItProducts(metrics.activeProducts);

  assert.equal(metrics.activeProductCount, 2);
  assert.equal(metrics.activeSeriesCount, 2);
  assert.equal(groups.length, metrics.activeSeriesCount);
  assert.equal(
    groups.reduce((count, group) => count + group.products.length, 0),
    2,
  );
  assert.ok(groups.some((group) => group.series === "Future Series"));
  assert.ok(groups.some((group) => group.series === "Other Rent It"));
});
