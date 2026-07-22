export type RentItLiveProduct = {
  productId: string;
  officialName: string;
  slug: string;
  series: string;
  status: string;
  publicPrice: string;
  publicDescription: string;
  bestFor: string[];
  availability: string;
  deliveryCollection: string;
  setup: string;
  image: string;
  altText: string;
};

export type RentItLiveCatalog = {
  version: string | null;
  updatedAt: string | null;
  products: RentItLiveProduct[];
};

export type RentItCatalogMetrics = {
  activeProducts: RentItLiveProduct[];
  activeProductCount: number;
  activeSeriesCount: number;
};

export type RentItCatalogGroup = {
  series: string;
  products: RentItLiveProduct[];
};

export type RentItStatCard = {
  id: "products" | "series" | "whatsapp";
  value: string;
  label: string;
};

export function normalizeRentItSeriesName(series: string) {
  return series.trim() || "Other Rent It";
}

type CatalogFetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export function isRentItLiveCatalog(value: unknown): value is RentItLiveCatalog {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<RentItLiveCatalog>;
  return (
    (candidate.version === null || typeof candidate.version === "string") &&
    (candidate.updatedAt === null || typeof candidate.updatedAt === "string") &&
    Array.isArray(candidate.products) &&
    candidate.products.every(
      (product) =>
        product &&
        typeof product === "object" &&
        typeof product.productId === "string" &&
        typeof product.officialName === "string" &&
        typeof product.slug === "string" &&
        typeof product.series === "string" &&
        product.series.trim().length > 0 &&
        typeof product.status === "string" &&
        typeof product.publicPrice === "string" &&
        typeof product.publicDescription === "string" &&
        Array.isArray(product.bestFor) &&
        product.bestFor.every((item) => typeof item === "string") &&
        typeof product.availability === "string" &&
        typeof product.deliveryCollection === "string" &&
        typeof product.setup === "string" &&
        typeof product.image === "string" &&
        typeof product.altText === "string",
    )
  );
}

export function getRentItCatalogMetrics(
  catalog: RentItLiveCatalog,
): RentItCatalogMetrics {
  const activeProducts = catalog.products.filter(
    (product) => product.status === "Active",
  );
  const activeSeries = new Set(
    activeProducts.map((product) => normalizeRentItSeriesName(product.series)),
  );

  return {
    activeProducts,
    activeProductCount: activeProducts.length,
    activeSeriesCount: activeSeries.size,
  };
}

export function groupActiveRentItProducts(
  products: RentItLiveProduct[],
  preferredSeriesOrder: string[] = [],
): RentItCatalogGroup[] {
  const groups = new Map<string, RentItLiveProduct[]>();

  for (const product of products) {
    if (product.status !== "Active") continue;
    const series = normalizeRentItSeriesName(product.series);
    const group = groups.get(series) ?? [];
    group.push(product);
    groups.set(series, group);
  }

  const preferredIndex = new Map(
    preferredSeriesOrder.map((series, index) => [series, index]),
  );

  return [...groups.entries()]
    .sort(([left], [right]) => {
      const leftIndex = preferredIndex.get(left);
      const rightIndex = preferredIndex.get(right);
      if (leftIndex !== undefined || rightIndex !== undefined) {
        return (leftIndex ?? Number.MAX_SAFE_INTEGER) -
          (rightIndex ?? Number.MAX_SAFE_INTEGER);
      }
      return left.localeCompare(right);
    })
    .map(([series, seriesProducts]) => ({
      series,
      products: seriesProducts,
    }));
}

export function getActiveRentItProductsForSeries(
  products: RentItLiveProduct[],
  series: string,
) {
  const normalizedSeries = normalizeRentItSeriesName(series);

  return products.filter(
    (product) =>
      product.status === "Active" &&
      normalizeRentItSeriesName(product.series) === normalizedSeries,
  );
}

export function buildRentItStatCards({
  loading,
  activeProductCount,
  activeSeriesCount,
}: {
  loading: boolean;
  activeProductCount: number | null;
  activeSeriesCount: number | null;
}): RentItStatCard[] {
  if (loading) {
    return [
      { id: "products", value: "—", label: "loading current catalog" },
      { id: "series", value: "—", label: "loading current catalog" },
      {
        id: "whatsapp",
        value: "1",
        label: "WhatsApp contact for booking help",
      },
    ];
  }

  return [
    {
      id: "products",
      value: String(activeProductCount ?? 0),
      label: "active gear items and bundle options",
    },
    {
      id: "series",
      value: String(activeSeriesCount ?? 0),
      label: "active rental series to browse",
    },
    {
      id: "whatsapp",
      value: "1",
      label: "WhatsApp contact for booking help",
    },
  ];
}

export async function loadRentItCatalog({
  fetcher,
  fallbackCatalog,
  signal,
}: {
  fetcher: CatalogFetcher;
  fallbackCatalog: RentItLiveCatalog;
  signal?: AbortSignal;
}): Promise<{ catalog: RentItLiveCatalog; live: boolean }> {
  try {
    const response = await fetcher("/api/rent-it/catalog", {
      method: "GET",
      cache: "no-store",
      redirect: "error",
      headers: { Accept: "application/json" },
      signal,
    });
    if (!response.ok) return { catalog: fallbackCatalog, live: false };

    const value: unknown = await response.json();
    if (!isRentItLiveCatalog(value)) {
      return { catalog: fallbackCatalog, live: false };
    }

    return { catalog: value, live: true };
  } catch {
    return { catalog: fallbackCatalog, live: false };
  }
}
