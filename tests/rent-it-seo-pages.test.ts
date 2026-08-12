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
  getRentItProductPath,
} from "../lib/rent-it-product-seo";

test("the SEO page system generates one English and one Chinese page for all 63 active products", () => {
  const identity = getRentItCatalogIdentity();
  const englishParams = generateEnglishProductParams();
  const chineseParams = generateChineseRentItParams();
  const chineseProductSlugs = new Set(chineseParams.map((item) => item.slug));

  assert.equal(identity.version, "1.88");
  assert.equal(identity.activeCount, 63);
  assert.equal(activeRentItSeoProducts.length, 63);
  assert.equal(new Set(activeRentItSeoProducts.map((item) => item.slug)).size, 63);
  assert.equal(englishParams.length, 63);
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

test("sitemap contains 126 product URLs with reciprocal language alternates and real product dates", () => {
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

test("build guard protects catalog v1.88 and the 63-product floor", () => {
  const guard = readFileSync(
    new URL("../scripts/guard-rent-it-catalog.mjs", import.meta.url),
    "utf8",
  );
  const packageJson = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.match(guard, /minimumVersion = "1\.88"/u);
  assert.match(guard, /minimumActiveProducts = 63/u);
  assert.match(guard, /liveCatalogUrl/u);
  assert.match(packageJson.scripts.build, /guard-rent-it-catalog\.mjs/u);
  assert.match(packageJson.scripts["predeploy:pages"], /guard-rent-it-catalog\.mjs/u);
});
