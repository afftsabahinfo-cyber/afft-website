import { validateSiteMetric } from "../lib/site-metrics";
import pages from "../lib/metrics-pages.json";
type Statement = { bind(...values: unknown[]): Statement; run(): Promise<unknown> };
type Env = { METRICS: { prepare(query: string): Statement }; EVENT_RATE_LIMITER: { limit(options: { key: string }): Promise<{ success: boolean }> } };
const allowedPages = new Set(pages);
const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
export default {
  async scheduled(_event: unknown, env: Env): Promise<void> {
    const oldest = new Date(Date.now() + 8 * 3600 * 1000 - 89 * 86400000).toISOString().slice(0, 10);
    await env.METRICS.prepare("DELETE FROM site_events WHERE day_sg < ?").bind(oldest).run();
  },
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname !== "/api/site-events") return new Response(null, { status: 404, headers });
    if (request.method !== "POST") return new Response(null, { status: 405, headers: { ...headers, Allow: "POST" } });
    if (!["https://afft.club", "https://www.afft.club"].includes(request.headers.get("Origin") || "")) return new Response(null, { status: 403, headers });
    if (!request.headers.get("Content-Type")?.startsWith("application/json")) return new Response(null, { status: 415, headers });
    if (Number(request.headers.get("Content-Length") || 0) > 2048) return new Response(null, { status: 413, headers });
    if (/bot|crawler|spider|headless|lighthouse/i.test(request.headers.get("User-Agent") || "")) return new Response(null, { status: 204, headers });
    // IP is used only for a short rate-limit counter, never saved in the metrics table.
    const rate = await env.EVENT_RATE_LIMITER.limit({ key: request.headers.get("CF-Connecting-IP") || "unknown" });
    if (!rate.success) return new Response(null, { status: 429, headers });
    let raw: unknown;
    try { const body = await request.text(); if (body.length > 2048) return new Response(null, { status: 413, headers }); raw = JSON.parse(body); } catch { return new Response(null, { status: 400, headers }); }
    const event = validateSiteMetric(raw, allowedPages);
    if (!event) return new Response(null, { status: 400, headers });
    const now = new Date();
    const day = new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
    try {
      await env.METRICS.prepare("INSERT OR IGNORE INTO site_events (event_id, session_id, occurred_at, day_sg, event_name, page, landing_page, offer_slug, language, source, medium, campaign, is_test) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(event.id, event.session, now.toISOString(), day, event.name, event.page, event.landing, event.offer, event.language, event.source, event.medium, event.campaign, event.test ? 1 : 0).run();
      return new Response(null, { status: 204, headers });
    } catch { return new Response(null, { status: 503, headers }); }
  },
};
