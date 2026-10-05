import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
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
test("day camp is daytime, children have stated ages, self-drive excludes chauffeur", () => {
  assert.equal(getCamp("day-escape")!.duration.en, "4–6 hours / daytime");
  assert.match(getCamp("family-first-camp")!.audience.en, /3–11/);
  assert.ok(
    getCamp("jimny-drive-camp")!.excludes.some((t) => t.en.includes("Driver")),
  );
});
