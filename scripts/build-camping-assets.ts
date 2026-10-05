import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import {
  campItems,
  campPoster,
  campPrice,
  campServices,
  campingCatalog,
  type CampLanguage,
} from "../lib/camping-series";
const out = "public/images/camping-2026";
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync("public/data", { recursive: true });
fs.writeFileSync(
  "public/data/camping-series.json",
  JSON.stringify(campingCatalog, null, 2) + "\n",
);
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function wrap(s: string, max: number) {
  const units = /[\u3400-\u9fff]/u.test(s) ? Array.from(s) : s.split(" ");
  const lines: string[] = [];
  let row = "";
  for (const u of units) {
    const next =
      row + (row && units.length !== Array.from(s).length ? " " : "") + u;
    if (next.length > max && row) {
      lines.push(row);
      row = u;
    } else row = next;
  }
  if (row) lines.push(row);
  return lines;
}
function text(
  s: string,
  x: number,
  y: number,
  size: number,
  color = "#17271e",
  weight = 400,
  max = 60,
) {
  const lines = wrap(s, max);
  return lines
    .map(
      (line, i) =>
        `<text x="${x}" y="${y + i * size * 1.32}" font-size="${size}" fill="${color}" font-weight="${weight}">${esc(line)}</text>`,
    )
    .join("");
}
const logo = fs
  .readFileSync("public/images/brand/afft-logo.svg")
  .toString("base64");
async function main() {
  const manifest = [];
  for (const p of campItems)
    for (const lang of ["en", "zh"] as CampLanguage[]) {
      const zh = lang === "zh";
      // Real AFFT photos remain unchanged inside a layout viewport. No synthetic equipment.
      const source =
        p.kind === "addon"
          ? "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-detail-01.webp"
          : p.slug.includes("cinema")
            ? "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-night-01.webp"
            : p.service === "drive"
              ? "/images/kinabalu-hero.webp"
              : "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-setup-01.webp";
      const img = (
        await sharp(path.join("public", source)).png().toBuffer()
      ).toString("base64");
      const titleLines = wrap(p.name[lang], zh ? 14 : 27);
      const titleSize = zh ? 64 : 60;
      const disclaimer = zh
        ? p.kind === "addon"
          ? "加配费用，不含主套餐；具体配置先确认。"
          : p.service === "gear"
            ? "自取自搭；不含营地、交通与餐食。"
            : p.service === "drive"
              ? "自驾自搭；不含司机、燃油与餐食。"
              : "不含客人交通与餐食；营地及日期先确认。"
        : p.kind === "addon"
          ? "Add-on only. Base camp is separate. Confirm compatibility."
          : p.service === "gear"
            ? "Self-setup. Site, transport and meals not included."
            : p.service === "drive"
              ? "Self-drive / self-setup. Driver, fuel and meals not included."
              : "Guest transport and meals not included. Confirm site and dates.";
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1080" height="1350" viewBox="0 0 1080 1350"><defs><clipPath id="photo"><rect x="0" y="135" width="1080" height="360"/></clipPath></defs><rect width="1080" height="1350" fill="#f6efdf"/><rect width="1080" height="135" fill="#17271e"/><g font-family="Microsoft YaHei, Arial, sans-serif"><image x="52" y="34" width="68" height="68" xlink:href="data:image/svg+xml;base64,${logo}"/>${text("AFFT.CLUB", 145, 80, 34, "#f6efdf", 700)}${text(zh ? "沙巴户外生活" : "SABAH OUTDOORS", 665, 80, 25, "#edc18b", 600)}<image clip-path="url(#photo)" x="0" y="135" width="1080" height="360" preserveAspectRatio="xMidYMid slice" xlink:href="data:image/png;base64,${img}"/><rect y="449" width="1080" height="46" fill="#17271e" fill-opacity=".85"/>${text(zh ? "AFFT 实景参考 · 包含项目以套餐清单为准" : "AFFT SCENE REFERENCE / INCLUSIONS AS LISTED", 52, 480, 20, "#fff")}${text(campServices[p.service][lang], 52, 544, 25, "#50604e", 600)}${titleLines.map((line, i) => text(line, 50, 624 + i * 76, titleSize, "#17271e", 700)).join("")}${text(campPrice(p, lang), 50, 790, 96, "#a64b1b", 700)}${text(p.audience[lang] + "  /  " + p.duration[lang], 54, 842, zh ? 30 : 28, "#17271e", 600)}${text(p.kind === "addon" ? (zh ? "主套餐之外的加配价" : "OPTIONAL ADD-ON") : zh ? "整组总价 · 非每人价格" : "GROUP TOTAL / NOT PER PERSON", 54, 883, 21, "#50604e", 600)}<path d="M54 910 H1026" stroke="#bec4b2"/>${p.highlights.map((h, i) => `<circle cx="66" cy="${951 + i * 55}" r="5" fill="#a64b1b"/>` + text(h[lang], 88, 961 + i * 55, zh ? 30 : 29, "#17271e", 500)).join("")}${text(disclaimer, 54, 1140, zh ? 24 : 23, "#50604e", 400, zh ? 36 : 76)}<rect x="0" y="1216" width="1080" height="134" fill="#17271e"/>${text(zh ? "WhatsApp 查询日期与总价" : "WHATSAPP / DATES & TOTAL", 54, 1265, 26, "#edc18b", 700)}${text("+60 11-1159 8920", 54, 1315, 35, "#fff", 700)}${text("afft.club", 808, 1315, 29, "#fff", 600)}</g></svg>`;
      const target = path.join("public", campPoster(p, lang));
      await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(target);
      manifest.push({
        slug: p.slug,
        lang,
        price: p.price,
        path: campPoster(p, lang),
        width: 1080,
        height: 1350,
      });
    }
  fs.writeFileSync(
    `${out}/manifest.json`,
    JSON.stringify(manifest, null, 2) + "\n",
  );
  console.log(
    `Built ${manifest.length} language-specific posters and public Alice catalog.`,
  );
}
void main();
