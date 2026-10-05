import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const value = (key, fallback) => args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const days = Number(value("--days", "30"));
if (!Number.isInteger(days) || days < 1 || days > 90) throw new Error("--days must be an integer from 1 to 90.");
const output = resolve(value("--output", resolve(root, "metrics-exports")));
const today = new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);
const first = new Date(Date.parse(`${today}T00:00:00Z`) - (days - 1) * 86400000).toISOString().slice(0, 10);
function query(sql) {
  const raw = execFileSync(process.execPath, [resolve(root, "node_modules/wrangler/bin/wrangler.js"), "d1", "execute", "afft-website-metrics", "--remote", "--config", "wrangler.metrics.jsonc", "--command", sql, "--json"], { cwd: root, encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
  const parsed = JSON.parse(raw);
  if (!parsed.every(result => result.success)) throw new Error("Metrics query failed. Existing reports were preserved.");
  return parsed.flatMap(result => result.results);
}
const counts = `COALESCE(SUM(CASE WHEN event_name='page_view' THEN 1 ELSE 0 END),0) AS page_views,
 COUNT(DISTINCT CASE WHEN event_name='page_view' THEN session_id END) AS visit_sessions,
 COALESCE(SUM(CASE WHEN event_name='whatsapp_click' THEN 1 ELSE 0 END),0) AS whatsapp_clicks,
 COUNT(DISTINCT CASE WHEN event_name='whatsapp_click' THEN session_id END) AS whatsapp_sessions,
 COUNT(DISTINCT CASE WHEN event_name='start_enquiry' THEN session_id END) AS enquiry_start_sessions`;
const where = `is_test=0 AND day_sg BETWEEN '${first}' AND '${today}'`;
const tables = {
  totals: query(`SELECT ${counts} FROM site_events WHERE ${where}`),
  daily: query(`SELECT day_sg, ${counts} FROM site_events WHERE ${where} GROUP BY day_sg ORDER BY day_sg`),
  weekly: query(`SELECT date(day_sg, '-' || ((CAST(strftime('%w', day_sg) AS INTEGER)+6)%7) || ' days') AS week_start, ${counts} FROM site_events WHERE ${where} GROUP BY week_start ORDER BY week_start`),
  sources: query(`SELECT source, medium, campaign, ${counts} FROM site_events WHERE ${where} GROUP BY source, medium, campaign ORDER BY visit_sessions DESC`),
  pages: query(`SELECT page, offer_slug, language, ${counts} FROM site_events WHERE ${where} GROUP BY page, offer_slug, language ORDER BY page_views DESC`),
};
mkdirSync(output, { recursive: true });
const report = { generated_at: new Date().toISOString(), timezone: "Asia/Singapore", collection_started_on: "2026-10-05", first_day: first, last_day: today, exclusions: "Collection began 2026-10-05; earlier WhatsApp clicks are unavailable. QA events and Do Not Track requests excluded. Visit sessions are per-tab sessions with a 30-minute inactivity limit; not unique people. Actual received enquiries and payments are recorded in the private workbook.", ...tables };
writeFileSync(resolve(output, "website-metrics.json"), JSON.stringify(report, null, 2) + "\n");
const cell = value => `"${String(value ?? "").replaceAll('"', '""')}"`;
for (const [name, rows] of Object.entries(tables)) {
  const columns = Object.keys(rows[0] || {});
  const csv = [columns.map(cell).join(","), ...rows.map(row => columns.map(key => cell(row[key])).join(","))].join("\r\n");
  writeFileSync(resolve(output, `website-${name}.csv`), "\uFEFF" + csv);
}
console.log(JSON.stringify({ output, first, today, totals: report.totals }, null, 2));
