import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { campItems, campPoster, campingCatalog, type CampLanguage } from "../lib/camping-series";

// Imports finished, individually AI-generated and visually reviewed posters.
// Never replaces them with a photo-and-text template.
type Source = { slug: string; lang: CampLanguage; source: string };
async function main() {
  const input = process.argv[2];
  if (!input) throw new Error("Pass the reviewed 40-poster source manifest: npm run build:camping -- <manifest.json>");
  const sources: Source[] = JSON.parse(fs.readFileSync(input, "utf8"));
  const expected = campItems.flatMap(p => (["en", "zh"] as const).map(lang => ({ p, lang })));
  if (sources.length !== expected.length || new Set(sources.map(s => s.slug + "-" + s.lang)).size !== expected.length)
    throw new Error("Exactly 40 unique bilingual poster sources are required.");
  const prepared = await Promise.all(expected.map(async ({ p, lang }) => {
    const source = sources.find(s => s.slug === p.slug && s.lang === lang);
    if (!source) throw new Error("Missing poster: " + p.slug + "-" + lang);
    const bytes = fs.readFileSync(path.resolve(path.dirname(input), source.source));
    const info = await sharp(bytes).metadata();
    if (!info.width || !info.height || Math.abs(info.width / info.height - 9 / 16) > 0.02)
      throw new Error("Expected portrait 9:16 source: " + source.source);
    return { p, lang, bytes, sourceSha256: createHash("sha256").update(bytes).digest("hex") };
  }));
  if (new Set(prepared.map(s => s.sourceSha256)).size !== 40)
    throw new Error("Every language edition must be a distinct image.");
  const out = "public/images/camping-ai-2026";
  fs.mkdirSync(out, { recursive: true });
  const manifest = [];
  for (const { p, lang, bytes, sourceSha256 } of prepared) {
    const target = path.join("public", campPoster(p, lang));
    // Format/size conversion only; composition and all poster text come from AI.
    const webp = await sharp(bytes).resize(1080, 1920, { fit: "contain", background: "#f6efdf" }).webp({ quality: 90 }).toBuffer();
    fs.writeFileSync(target, webp);
    manifest.push({
      slug: p.slug, lang, price: p.price, path: campPoster(p, lang),
      width: 1080, height: 1920, bytes: webp.length,
      sourceSha256, sha256: createHash("sha256").update(webp).digest("hex"),
      origin: "AI-generated individual poster; visually reviewed",
    });
  }
  fs.writeFileSync(out + "/manifest.json", JSON.stringify(manifest, null, 2) + "\n");
  fs.mkdirSync("public/data", { recursive: true });
  fs.writeFileSync("public/data/camping-series.json", JSON.stringify(campingCatalog, null, 2) + "\n");
  console.log("Imported 40 distinct bilingual AI posters at 1080 × 1920.");
}
void main();
