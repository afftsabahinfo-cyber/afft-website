import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import sharp from "sharp";
import {
  campItems,
  campBases,
  campBundles,
  campAddons,
  campAliases,
  campPoster,
  campPath,
  getCamp,
  campingCatalog,
} from "../lib/camping-series";
import sitemap from "../app/sitemap";
import { toPublicAliceAnswer } from "../worker/alice-contract";
test("Alice exposes only allowlisted bilingual package sources", () => {
  for (const lang of ["en", "zh"] as const) {
    const publicHref = campPath(campBases[3], lang);
    const answer = toPublicAliceAnswer({answer:"Current package",sources:[{title:"Camp",publicHref},{title:"Private",publicHref:"/admin"},{title:"External",publicHref:"https://example.com"}]});
    assert.deepEqual(answer?.sources,[{title:"Camp",publicHref}]);
  }
});
test("approved catalog has 9 bases, 6 combinations and 5 add-ons", () => {
  assert.equal(campBases.length, 9);
  assert.equal(campBundles.length, 6);
  assert.equal(campAddons.length, 5);
  assert.equal(new Set(campItems.map((p) => p.slug)).size, 20);
});
test("combination prices equal the base plus unique add-ons", () => {
  for (const p of campBundles) {
    assert.equal(
      p.price,
      getCamp(p.baseSlug!)!.price +
        p.addonSlugs!.reduce((s, id) => s + getCamp(id)!.price, 0),
    );
    assert.equal(new Set(p.addonSlugs).size, p.addonSlugs!.length);
  }
});
test("every bilingual page has its own poster and canonical sitemap entry", () => {
  const urls = new Set(sitemap().map((x) => x.url));
  for (const p of campItems)
    for (const l of ["en", "zh"] as const) {
      assert.ok(fs.existsSync(`public${campPoster(p, l)}`));
      assert.ok(urls.has(`https://afft.club${campPath(p, l)}`));
      assert.ok(p.name[l]);
      assert.ok(p.includes.every((t) => t[l]));
    }
  for (const s of Object.keys(campAliases)) assert.ok(getCamp(s));
});
test("published Alice JSON equals the website source with no private fields", () => {
  const json = fs.readFileSync("public/data/camping-series.json", "utf8");
  assert.deepEqual(JSON.parse(json), campingCatalog);
  assert.doesNotMatch(json, /internalNote|procurement|costPrice|supplierCost/);
});
test("all 40 AI poster editions are distinct, intact and full 9:16 portraits", async () => {
  const manifest = JSON.parse(fs.readFileSync("public/images/camping-ai-2026/manifest.json", "utf8"));
  assert.equal(manifest.length, 40);
  assert.equal(new Set(manifest.map((p: { sha256: string }) => p.sha256)).size, 40);
  for (const p of campItems) for (const lang of ["en", "zh"] as const) {
    const url = campPoster(p, lang);
    const entry = manifest.find((m: { path: string }) => m.path === url);
    assert.ok(entry, url);
    assert.equal(entry.price, p.price);
    const bytes = fs.readFileSync("public" + url);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), entry.sha256);
    const image = await sharp(bytes).metadata();
    assert.equal(image.width, 1080);
    assert.equal(image.height, 1920);
    assert.equal(image.format, "webp");
  }
});
test("day camp is daytime, children have stated ages, self-drive excludes chauffeur", () => {
  assert.equal(getCamp("day-escape")!.duration.en, "4–6 hours / daytime");
  assert.match(getCamp("family-first-camp")!.audience.en, /3–11/);
  assert.ok(
    getCamp("jimny-drive-camp")!.excludes.some((t) => t.en.includes("Driver")),
  );
});
