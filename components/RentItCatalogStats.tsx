"use client";

import { useRentItLiveCatalog } from "@/components/RentItLiveCatalogProvider";
import {
  buildRentItStatCards,
  type RentItStatCard,
} from "@/lib/rent-it-live-catalog";

export function RentItCatalogStatsView({
  stats,
  loading,
  live,
}: {
  stats: RentItStatCard[];
  loading: boolean;
  live: boolean;
}) {
  return (
    <div
      className="mt-10"
      aria-busy={loading}
      aria-live="polite"
      aria-atomic="true"
      data-catalog-source={loading ? "loading" : live ? "live" : "fallback"}
      data-active-product-count={loading ? undefined : stats[0]?.value}
      data-active-series-count={loading ? undefined : stats[1]?.value}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-5"
          >
            <p className="text-3xl font-bold text-[#F3922B]">{stat.value}</p>
            <p className="mt-2 text-sm text-white/65">{stat.label}</p>
          </div>
        ))}
      </div>
      {!loading && !live ? (
        <p className="mt-3 text-xs text-white/35" role="status">
          Catalog fallback
        </p>
      ) : null}
    </div>
  );
}

export function RentItCatalogStats() {
  const {
    loading,
    live,
    activeProductCount,
    activeSeriesCount,
  } = useRentItLiveCatalog();
  const stats = buildRentItStatCards({
    loading,
    activeProductCount,
    activeSeriesCount,
  });

  return (
    <RentItCatalogStatsView stats={stats} loading={loading} live={live} />
  );
}
