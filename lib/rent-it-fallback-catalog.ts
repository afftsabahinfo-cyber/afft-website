import snapshot from "@/lib/rent-it-fallback-snapshot.json";
import {
  isRentItLiveCatalog,
  type RentItLiveCatalog,
} from "@/lib/rent-it-live-catalog";

function cloneSnapshot(): unknown {
  return JSON.parse(JSON.stringify(snapshot));
}

export function createCheckedInRentItFallbackCatalog(): RentItLiveCatalog {
  const catalog = cloneSnapshot();
  if (!isRentItLiveCatalog(catalog)) {
    throw new Error("Checked-in Rent It fallback snapshot is invalid.");
  }
  return catalog;
}

export const checkedInRentItFallbackCatalog =
  createCheckedInRentItFallbackCatalog();
