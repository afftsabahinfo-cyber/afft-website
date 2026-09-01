import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import sitemap from "../app/sitemap";
import { generateStaticParams as generateEnglishProductParams } from "../app/rent-it/[product]/page";
import { generateStaticParams as generateChineseRentItParams } from "../app/zh/rent-it/[slug]/page";
import {
  activeRentItSeoProducts,
  buildRentItProductMetadata,
  getRentItCatalogIdentity,
  getRentItProductDisplayImage,
  getRentItProductPath,
} from "../lib/rent-it-product-seo";

test("the SEO page system generates one English and one Chinese page for all 65 active products", () => {
  const identity = getRentItCatalogIdentity();
  const englishParams = generateEnglishProductParams();
  const chineseParams = generateChineseRentItParams();
  const chineseProductSlugs = new Set(chineseParams.map((item) => item.slug));

  assert.equal(identity.version, "1.90");
  assert.equal(identity.activeCount, 65);
  assert.equal(activeRentItSeoProducts.length, 65);
  assert.equal(new Set(activeRentItSeoProducts.map((item) => item.slug)).size, 65);
  assert.equal(englishParams.length, 65);
  assert.ok(
    activeRentItSeoProducts.every((product) =>
      chineseProductSlugs.has(product.slug),
    ),
  );
});

test("every product metadata set has self canonical, reciprocal hreflang and x-default", () => {
  for (const product of activeRentItSeoProducts) {
    const english = buildRentItProductMetadata(product, "en");
    const chinese = buildRentItProductMetadata(product, "zh-Hans");
    const englishPath = getRentItProductPath(product, "en");
    const chinesePath = getRentItProductPath(product, "zh-Hans");

    assert.equal(english.alternates?.canonical, englishPath);
    assert.equal(chinese.alternates?.canonical, chinesePath);
    assert.equal(english.alternates?.languages?.en, englishPath);
    assert.equal(english.alternates?.languages?.["zh-Hans"], chinesePath);
    assert.equal(english.alternates?.languages?.["x-default"], englishPath);
    assert.equal(chinese.alternates?.languages?.en, englishPath);
    assert.equal(chinese.alternates?.languages?.["zh-Hans"], chinesePath);
    assert.equal(chinese.alternates?.languages?.["x-default"], englishPath);
    assert.ok(String(english.description).length <= 158);
    assert.ok(String(chinese.description).length <= 158);
  }
});

test("sitemap contains 130 product URLs with reciprocal language alternates and real product dates", () => {
  const entries = sitemap();
  const byUrl = new Map(entries.map((entry) => [entry.url, entry]));

  for (const product of activeRentItSeoProducts) {
    const englishUrl = `https://afft.club${getRentItProductPath(product, "en")}`;
    const chineseUrl = `https://afft.club${getRentItProductPath(product, "zh-Hans")}`;
    const english = byUrl.get(englishUrl);
    const chinese = byUrl.get(chineseUrl);

    assert.ok(english, `missing ${englishUrl}`);
    assert.ok(chinese, `missing ${chineseUrl}`);
    assert.equal(english.alternates?.languages?.en, englishUrl);
    assert.equal(english.alternates?.languages?.["zh-Hans"], chineseUrl);
    assert.equal(english.alternates?.languages?.["x-default"], englishUrl);
    assert.equal(chinese.alternates?.languages?.en, englishUrl);
    assert.equal(chinese.alternates?.languages?.["zh-Hans"], chineseUrl);
    assert.equal(String(english.lastModified).slice(0, 10), product.sourceLastChecked);
  }
});

test("catalog tables link product names to the independent detail pages", () => {
  const liveGuide = readFileSync(
    new URL("../components/RentItLivePriceGuide.tsx", import.meta.url),
    "utf8",
  );
  const noScriptFallback = readFileSync(
    new URL("../components/RentItCatalogNoScriptFallback.tsx", import.meta.url),
    "utf8",
  );

  for (const source of [liveGuide, noScriptFallback]) {
    assert.match(source, /\/rent-it\/\$\{product\.slug\}/u);
    assert.match(source, /\/zh\/rent-it\/\$\{product\.slug\}/u);
  }
});

test("the Philips AD8090 has a public bilingual SEO page contract", () => {
  const product = activeRentItSeoProducts.find(
    (item) => item.productId === "AFFT-RENT-LIFESTYLE-031",
  );

  assert.ok(product);
  assert.equal(product.slug, "philips-ad8090-portable-ice-maker");
  assert.equal(product.officialName, "Philips AD8090 Portable Ice Maker");
  assert.equal(product.series, "Camp Lifestyle Series");
  assert.equal(product.publicPrice, "From RM49 / day");
  assert.equal(product.publicPriceAmount, 49);
  assert.equal(product.publicPriceUnit, "day");
  assert.equal(product.sourceLastChecked, "2026-08-30");
  assert.match(product.image, /^https:\/\/media\.afft\.club\/rent-it\//u);
  assert.equal(getRentItProductPath(product, "en"), "/rent-it/philips-ad8090-portable-ice-maker");
  assert.equal(getRentItProductPath(product, "zh-Hans"), "/zh/rent-it/philips-ad8090-portable-ice-maker");
});

test("the Philips TB8501 has a public bilingual SEO page and GIF contract", () => {
  const product = activeRentItSeoProducts.find(
    (item) => item.productId === "AFFT-RENT-PREMIUM-013",
  );

  assert.ok(product);
  assert.equal(product.slug, "philips-tb8501-55l-outdoor-refrigerator-set");
  assert.equal(product.officialName, "Philips TB8501 55L Outdoor Refrigerator Set");
  assert.equal(product.series, "Premium Camp Series");
  assert.equal(product.publicPrice, "From RM99 / day");
  assert.equal(product.publicPriceAmount, 99);
  assert.equal(product.publicPriceUnit, "day");
  assert.equal(product.sourceLastChecked, "2026-08-31");
  assert.match(product.image, /^https:\/\/media\.afft\.club\/rent-it\//u);
  assert.equal(
    getRentItProductDisplayImage(product),
    "/images/rent-it/philips-tb8501-55l-outdoor-refrigerator-set.gif",
  );
  assert.equal(
    getRentItProductPath(product, "en"),
    "/rent-it/philips-tb8501-55l-outdoor-refrigerator-set",
  );
  assert.equal(
    getRentItProductPath(product, "zh-Hans"),
    "/zh/rent-it/philips-tb8501-55l-outdoor-refrigerator-set",
  );
});

test("the public snapshot excludes private procurement prices", () => {
  const snapshot = readFileSync(
    new URL("../lib/rent-it-fallback-snapshot.json", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(snapshot, /RM\s*(?:500|1,?500)|procurement|internalNote/iu);
});

test("build guard protects catalog v1.90 and the 65-product floor", () => {
  const guard = readFileSync(
    new URL("../scripts/guard-rent-it-catalog.mjs", import.meta.url),
    "utf8",
  );
  const packageJson = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.match(guard, /minimumVersion = "1\.90"/u);
  assert.match(guard, /minimumActiveProducts = 65/u);
  assert.match(guard, /liveCatalogUrl/u);
  assert.match(packageJson.scripts.build, /guard-rent-it-catalog\.mjs/u);
  assert.match(packageJson.scripts["predeploy:pages"], /guard-rent-it-catalog\.mjs/u);
});
