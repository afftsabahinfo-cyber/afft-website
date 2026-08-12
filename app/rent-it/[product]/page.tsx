import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RentItProductPage } from "@/components/RentItProductPage";
import {
  activeRentItSeoProducts,
  buildRentItProductMetadata,
  getActiveRentItProduct,
} from "@/lib/rent-it-product-seo";

type PageProps = {
  params: Promise<{
    product: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return activeRentItSeoProducts.map((product) => ({
    product: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { product: slug } = await params;
  const product = getActiveRentItProduct(slug);

  if (!product) return { title: "Rent It Product | AFFT Club" };
  return buildRentItProductMetadata(product, "en");
}

export default async function RentItProductRoute({ params }: PageProps) {
  const { product: slug } = await params;
  const product = getActiveRentItProduct(slug);

  if (!product) notFound();
  return <RentItProductPage locale="en" product={product} />;
}
