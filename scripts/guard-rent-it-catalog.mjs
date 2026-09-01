import { readFileSync } from "node:fs";

const minimumVersion = "1.90";
const minimumActiveProducts = 65;
const liveCatalogUrl = "https://afft.club/api/rent-it/catalog";

function stop(message) {
  console.error(`Rent It catalog guard blocked the build: ${message}`);
  process.exit(1);
}

function versionParts(value) {
  if (typeof value !== "string" || !/^\d+(?:\.\d+)*$/u.test(value)) {
    return null;
  }
  return value.split(".").map(Number);
}

function compareVersions(left, right) {
  const leftParts = versionParts(left);
  const rightParts = versionParts(right);
  if (!leftParts || !rightParts) return String(left).localeCompare(String(right));

  const length = Math.max(leftParts.length, rightParts.length);
  for (let index = 0; index < length; index += 1) {
    const difference = (leftParts[index] ?? 0) - (rightParts[index] ?? 0);
    if (difference !== 0) return difference;
  }
  return 0;
}

function inspectCatalog(value, label) {
  if (!value || typeof value !== "object" || !Array.isArray(value.products)) {
    stop(`${label} is not a valid catalog object.`);
  }

  const activeProducts = value.products.filter(
    (product) => product?.status === "Active",
  );
  const ids = new Set(activeProducts.map((product) => product.productId));
  const slugs = new Set(activeProducts.map((product) => product.slug));

  if (ids.size !== activeProducts.length) {
    stop(`${label} contains duplicate active Product IDs.`);
  }
  if (slugs.size !== activeProducts.length) {
    stop(`${label} contains duplicate active product slugs.`);
  }
  if (
    activeProducts.some(
      (product) =>
        typeof product.productId !== "string" ||
        typeof product.slug !== "string" ||
        !product.productId ||
        !product.slug,
    )
  ) {
    stop(`${label} contains an active product without a stable ID or slug.`);
  }

  return {
    version: value.version,
    updatedAt: value.updatedAt,
    activeProducts,
    activeCount: activeProducts.length,
  };
}

const snapshot = JSON.parse(
  readFileSync(
    new URL("../lib/rent-it-fallback-snapshot.json", import.meta.url),
    "utf8",
  ),
);
const local = inspectCatalog(snapshot, "checked-in fallback catalog");

if (compareVersions(local.version, minimumVersion) < 0) {
  stop(`version ${local.version} is below the protected floor ${minimumVersion}.`);
}
if (local.activeCount < minimumActiveProducts) {
  stop(
    `${local.activeCount} active products is below the protected floor ${minimumActiveProducts}.`,
  );
}

try {
  const response = await fetch(liveCatalogUrl, {
    headers: { Accept: "application/json" },
    redirect: "error",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const production = inspectCatalog(await response.json(), "live production catalog");

  if (compareVersions(local.version, production.version) < 0) {
    stop(
      `checked-in version ${local.version} is older than live version ${production.version}.`,
    );
  }
  if (local.activeCount < production.activeCount) {
    stop(
      `checked-in active count ${local.activeCount} is below live count ${production.activeCount}.`,
    );
  }

  const localSlugById = new Map(
    local.activeProducts.map((product) => [product.productId, product.slug]),
  );
  const missingLiveProducts = production.activeProducts.filter(
    (product) => localSlugById.get(product.productId) !== product.slug,
  );
  if (missingLiveProducts.length) {
    stop(
      `checked-in catalog is missing or changed ${missingLiveProducts.length} live Product ID/slug pair(s).`,
    );
  }

  console.log(
    `Rent It catalog guard passed: checked-in v${local.version}/${local.activeCount} is not behind live v${production.version}/${production.activeCount}.`,
  );
} catch (error) {
  const strict =
    process.env.CI === "true" ||
    process.env.CF_PAGES === "1" ||
    process.env.AFFT_REQUIRE_LIVE_CATALOG_GUARD === "1";
  if (strict) {
    stop(`live comparison failed in production mode (${error.message}).`);
  }
  console.warn(
    `Rent It catalog guard warning: live comparison unavailable (${error.message}); local protected floor v${local.version}/${local.activeCount} passed.`,
  );
}
