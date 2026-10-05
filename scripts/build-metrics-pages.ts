import { writeFileSync } from "node:fs";
import sitemap from "../app/sitemap";
const paths = [...new Set(sitemap().map(entry => new URL(entry.url).pathname))].sort();
writeFileSync("lib/metrics-pages.json", JSON.stringify(paths, null, 2) + "\n");
console.log(`Metrics public page allowlist: ${paths.length} paths`);
