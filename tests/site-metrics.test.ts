import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { campaignAttribution, offerForPage, validateSiteMetric, type SiteMetric } from "../lib/site-metrics";
import worker from "../worker/site-events";
import pages from "../lib/metrics-pages.json";
import sitemap from "../app/sitemap";
const allowed = new Set(pages);
const valid = (): SiteMetric => ({ id: randomUUID(), session: randomUUID(), name: "whatsapp_click", page: "/packages/jimny-explorer-camp", landing: "/", offer: "jimny-explorer-camp", language: "en", source: "instagram", medium: "social", campaign: "jimny599", test: true });
test("public page allowlist matches the actual sitemap", () => { assert.deepEqual([...allowed].sort(), [...new Set(sitemap().map(entry => new URL(entry.url).pathname))].sort()); });
test("campaign labels are allowlisted; private query strings and referrers are discarded", () => {
  assert.deepEqual(campaignAttribution("?utm_source=ig&utm_medium=social&utm_campaign=jimny599&email=private@example.com", ""), { source: "instagram", medium: "social", campaign: "jimny599" });
  assert.deepEqual(campaignAttribution("?utm_source=private@example.com&utm_campaign=customer-1234", ""), { source: "other", medium: "website", campaign: "none" });
  assert.equal(campaignAttribution("", "https://www.google.com/search?q=private").source, "google");
});
test("English and Chinese public offer paths share a product identity", () => { assert.equal(offerForPage("/zh/packages/jimny-explorer-camp"), "jimny-explorer-camp"); assert.equal(offerForPage("/"), "general"); });
test("collector rejects private fields, arbitrary paths, URLs, offer IDs and malformed events", () => {
  const event = valid(); assert.ok(validateSiteMetric(event, allowed));
  for (const invalid of [{ ...event, phone: "0123456789" }, { ...event, page: "/customer/private" }, { ...event, landing: "/?email=private" }, { ...event, offer: "private@example.com" }, { ...event, language: "zh" }, { ...event, name: "paid" }, { ...event, session: "phone" }, { ...event, test: "false" }]) assert.equal(validateSiteMetric(invalid, allowed), null);
});
function env(fail = false, limit = true) {
  const writes: unknown[][] = [];
  const state = { METRICS: { prepare: () => ({ bind: (...values: unknown[]) => ({ run: async () => { if (fail) throw new Error("Unavailable"); writes.push(values); } }) }) }, EVENT_RATE_LIMITER: { limit: async () => ({ success: limit }) } };
  return { state: state as Parameters<typeof worker.fetch>[1], writes };
}
function request(event: unknown = valid(), origin = "https://afft.club") { return new Request("https://afft.club/api/site-events", { method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify(event) }); }
test("valid QA click is persisted as QA with server Singapore date and no form values", async () => { const { state, writes } = env(); assert.equal((await worker.fetch(request(), state)).status, 204); assert.equal(writes.length, 1); assert.equal(writes[0].at(-1), 1); assert.match(String(writes[0][3]), /^\d{4}-\d{2}-\d{2}$/); });
test("collection cannot expose a public report or accept cross-site writes", async () => { const { state, writes } = env(); assert.equal((await worker.fetch(new Request("https://afft.club/api/site-events"), state)).status, 405); assert.equal((await worker.fetch(request(valid(), "https://example.com"), state)).status, 403); assert.equal(writes.length, 0); });
test("validation, quota and database failures do not claim successful collection", async () => { assert.equal((await worker.fetch(request({ ...valid(), notes: "private" }), env().state)).status, 400); assert.equal((await worker.fetch(request(), env(false, false).state)).status, 429); assert.equal((await worker.fetch(request(), env(true).state)).status, 503); });
test("daily retention keeps the current day plus 89 previous Singapore dates", async () => { const { state, writes } = env(); await worker.scheduled({}, state); assert.equal(writes.length, 1); assert.equal(writes[0][0], new Date(Date.now() + 8 * 3600 * 1000 - 89 * 86400000).toISOString().slice(0, 10)); });
