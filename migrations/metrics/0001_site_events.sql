CREATE TABLE IF NOT EXISTS site_events (
  event_id TEXT PRIMARY KEY, session_id TEXT NOT NULL, occurred_at TEXT NOT NULL,
  day_sg TEXT NOT NULL, event_name TEXT NOT NULL, page TEXT NOT NULL, landing_page TEXT NOT NULL,
  offer_slug TEXT NOT NULL, language TEXT NOT NULL, source TEXT NOT NULL,
  medium TEXT NOT NULL, campaign TEXT NOT NULL, is_test INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_site_events_day ON site_events(is_test, day_sg);
