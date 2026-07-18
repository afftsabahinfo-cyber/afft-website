"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { checkedInRentItFallbackCatalog } from "@/lib/rent-it-fallback-catalog";
import {
  getRentItCatalogMetrics,
  loadRentItCatalog,
  type RentItLiveCatalog,
  type RentItLiveProduct,
} from "@/lib/rent-it-live-catalog";

type RentItLiveCatalogContextValue = {
  catalog: RentItLiveCatalog | null;
  loading: boolean;
  live: boolean;
  activeProducts: RentItLiveProduct[];
  activeProductCount: number | null;
  activeSeriesCount: number | null;
};

const RentItLiveCatalogContext =
  createContext<RentItLiveCatalogContextValue | null>(null);

export function RentItLiveCatalogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [catalog, setCatalog] = useState<RentItLiveCatalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    loadRentItCatalog({
      fetcher: fetch,
      fallbackCatalog: checkedInRentItFallbackCatalog,
      signal: controller.signal,
    }).then((result) => {
      if (!mounted) return;
      setCatalog(result.catalog);
      setLive(result.live);
      setLoading(false);
    });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const metrics = useMemo(
    () => (catalog ? getRentItCatalogMetrics(catalog) : null),
    [catalog],
  );

  const value = useMemo<RentItLiveCatalogContextValue>(
    () => ({
      catalog,
      loading,
      live,
      activeProducts: metrics?.activeProducts ?? [],
      activeProductCount: metrics?.activeProductCount ?? null,
      activeSeriesCount: metrics?.activeSeriesCount ?? null,
    }),
    [catalog, live, loading, metrics],
  );

  return (
    <RentItLiveCatalogContext.Provider value={value}>
      {children}
    </RentItLiveCatalogContext.Provider>
  );
}

export function useRentItLiveCatalog() {
  const value = useContext(RentItLiveCatalogContext);
  if (!value) {
    throw new Error(
      "useRentItLiveCatalog must be used inside RentItLiveCatalogProvider.",
    );
  }
  return value;
}
