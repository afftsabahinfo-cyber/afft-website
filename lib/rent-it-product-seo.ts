import type { Metadata } from "next";
import { checkedInRentItFallbackCatalog } from "@/lib/rent-it-fallback-catalog";
import {
  getRentItCatalogMetrics,
  type RentItLiveProduct,
} from "@/lib/rent-it-live-catalog";
import { rentItSeriesAnchor } from "@/lib/rent-it-series";

export type RentItProductLocale = "en" | "zh-Hans";

const siteUrl = "https://afft.club";

export const activeRentItSeoProducts = getRentItCatalogMetrics(
  checkedInRentItFallbackCatalog,
).activeProducts;

export function getActiveRentItProduct(slug: string) {
  return activeRentItSeoProducts.find((product) => product.slug === slug);
}

export function getRelatedRentItProducts(product: RentItLiveProduct) {
  return activeRentItSeoProducts
    .filter(
      (candidate) =>
        candidate.productId !== product.productId &&
        candidate.series.trim() === product.series.trim(),
    )
    .slice(0, 3);
}

export function getRentItProductPath(
  product: RentItLiveProduct,
  locale: RentItProductLocale,
) {
  return locale === "zh-Hans"
    ? `/zh/rent-it/${product.slug}`
    : `/rent-it/${product.slug}`;
}

export function getRentItSeriesPath(
  product: RentItLiveProduct,
  locale: RentItProductLocale,
) {
  const routeBySeries: Record<string, string> = {
    "Creator Series": "creator-series",
    "Camp Lifestyle Series": "camp-lifestyle-series",
    "Premium Camp Series": "premium-camp-series",
    "Tent Experience Series": "tent-experience-series",
  };
  const route = routeBySeries[product.series.trim()];
  const base = locale === "zh-Hans" ? "/zh/rent-it" : "/rent-it";

  return route
    ? `${base}/${route}`
    : `${base}#${rentItSeriesAnchor(product.series)}`;
}

export function formatRentItPrice(
  product: RentItLiveProduct,
  locale: RentItProductLocale,
) {
  if (locale === "en") return product.publicPrice;

  const match = product.publicPrice.match(
    /RM\s*([\d,]+(?:\.\d+)?)\s*\/\s*([^/]+)$/i,
  );
  if (!match) return product.publicPrice;

  const unit = match[2].trim().toLowerCase();
  const localizedUnit = unit === "day" ? "天" : unit === "night" ? "晚" : unit;
  return `RM${match[1]} 起 / ${localizedUnit}`;
}

function chineseExperienceUses(product: RentItLiveProduct) {
  const name = product.officialName.toLowerCase();

  if (/ice maker/.test(name)) return ["营地冷饮", "户外聚会", "Glamping 体验"];
  if (/projector/.test(name)) return ["露营电影夜", "家庭放松", "Glamping 氛围"];
  if (/coffee|brewer|bialetti|mug|tea pot/.test(name)) {
    return ["营地咖啡", "户外慢生活", "舒适露营"];
  }
  if (/chair|cot|bed|table|helinox/.test(name)) {
    return ["坐得更舒服", "户外休息", "质感露营"];
  }
  if (/tent|xing|commander|rooftop/.test(name)) {
    return ["情侣露营", "家庭露营", "户外住宿体验"];
  }
  if (/light|lantern/.test(name)) return ["夜间照明", "营地氛围", "户外布置"];
  if (/power|solix/.test(name)) return ["户外供电", "摄影设备", "安心露营"];
  if (/dji|osmo|insta360|oppo|gimbal|microphone|drone|camera/.test(name)) {
    return ["旅行拍摄", "户外内容", "轻松创作"];
  }
  if (product.series.includes("Creator")) return ["旅行拍摄", "户外内容", "轻松创作"];
  if (product.series.includes("Premium")) return ["更好舒适度", "质感露营", "户外休息"];
  if (product.series.includes("Experience Set")) {
    return ["不用逐件挑选", "轻松配对", "完整体验"];
  }
  return ["舒适露营", "营地生活", "沙巴户外体验"];
}

function firstUsefulSentence(value: string) {
  const compact = value.replace(/\s+/g, " ").trim();
  const sentence = compact.match(/^.{40,220}?[.!?](?:\s|$)/u)?.[0] ?? compact;
  return sentence.length > 230 ? `${sentence.slice(0, 227).trim()}...` : sentence;
}

export function getRentItProductPageCopy(
  product: RentItLiveProduct,
  locale: RentItProductLocale,
) {
  const price = formatRentItPrice(product, locale);

  if (locale === "zh-Hans") {
    return {
      eyebrow: `${product.series} · 沙巴租借`,
      directAnswer: `在沙巴向 AFFT 租借 ${product.officialName}，${price}。不用购买整套装备，也能享受更舒服、更轻松的户外体验。`,
      experience: "AFFT 把好产品租给客人，让露营、旅行和内容创作更容易开始。告诉我们日期、人数和用途，我们会帮你配对。",
      uses: chineseExperienceUses(product),
      price,
      priceLabel: "公开租金",
      bestForLabel: "适合体验",
      availabilityLabel: "可用日期",
      includedLabel: "租借包含",
      includedFallback: "交接前由 AFFT 通过 WhatsApp 确认产品与配件。",
      arrangementLabel: "简单确认",
      arrangement: "日期、数量、取还方式和需要的组合，由 AFFT 在 WhatsApp 一次确认。",
      relatedLabel: "同系列也可以看看",
      checkedLabel: "产品资料最后核对",
      ctaTitle: "想租这件产品？",
      ctaText: "把日期、租借天数和用途发给 AFFT，我们会确认可用性并建议合适组合。",
      ctaButton: "WhatsApp 查询",
      backLabel: "返回 Rent It",
      languageLabel: "English",
      detailsLabel: "查看产品与租借重点",
    };
  }

  return {
    eyebrow: `${product.series} · Sabah rental`,
    directAnswer: `Rent ${product.officialName} from AFFT in Sabah — ${price}. Enjoy better gear without buying the full setup.`,
    experience: firstUsefulSentence(product.publicDescription),
    uses: product.bestFor.slice(0, 4),
    price,
    priceLabel: "Public rental price",
    bestForLabel: "Best experience fit",
    availabilityLabel: "Availability",
    includedLabel: "Rental includes",
    includedFallback: "AFFT confirms the product and handover accessories on WhatsApp before rental.",
    arrangementLabel: "Simple rental check",
    arrangement: "Confirm the date, quantity, pickup or delivery and the right setup with AFFT on WhatsApp.",
    relatedLabel: "More from this series",
    checkedLabel: "Product details last checked",
    ctaTitle: "Want to rent this product?",
    ctaText: "Send AFFT your dates, rental duration and intended use. We will confirm availability and the practical next step.",
    ctaButton: "Check on WhatsApp",
    backLabel: "Back to Rent It",
    languageLabel: "中文",
    detailsLabel: "View product and rental essentials",
  };
}

function trimSeoTitle(value: string, suffix: string) {
  const maximumNameLength = Math.max(28, 65 - suffix.length);
  if (value.length <= maximumNameLength) return `${value}${suffix}`;

  const words = value.split(/\s+/u);
  let name = "";
  for (const word of words) {
    const next = name ? `${name} ${word}` : word;
    if (next.length > maximumNameLength) break;
    name = next;
  }
  return `${name || value.slice(0, maximumNameLength).trim()}${suffix}`;
}

function trimDescription(value: string) {
  const compact = value.replace(/\s+/g, " ").trim();
  return compact.length > 158 ? `${compact.slice(0, 155).trim()}...` : compact;
}

export function buildRentItProductMetadata(
  product: RentItLiveProduct,
  locale: RentItProductLocale,
): Metadata {
  const copy = getRentItProductPageCopy(product, locale);
  const canonical = getRentItProductPath(product, locale);
  const englishPath = getRentItProductPath(product, "en");
  const chinesePath = getRentItProductPath(product, "zh-Hans");
  const title = trimSeoTitle(
    product.officialName,
    locale === "zh-Hans" ? " 租借 | AFFT 沙巴" : " Rental | AFFT Sabah",
  );
  const description = trimDescription(copy.directAnswer);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: englishPath,
        "zh-Hans": chinesePath,
        "x-default": englishPath,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      images: product.image
        ? [{ url: product.image, alt: product.altText || product.officialName }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export function getRentItProductLastModified(product: RentItLiveProduct) {
  return (
    product.sourceLastChecked ||
    checkedInRentItFallbackCatalog.updatedAt?.slice(0, 10) ||
    "2026-08-03"
  );
}

export function getRentItCatalogIdentity() {
  return {
    version: checkedInRentItFallbackCatalog.version,
    updatedAt: checkedInRentItFallbackCatalog.updatedAt,
    activeCount: activeRentItSeoProducts.length,
  };
}

export function absoluteRentItUrl(path: string) {
  return `${siteUrl}${path}`;
}
