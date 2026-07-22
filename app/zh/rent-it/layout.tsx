import { RentItLiveCatalogProvider } from "@/components/RentItLiveCatalogProvider";

export default function ZhRentItLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RentItLiveCatalogProvider>{children}</RentItLiveCatalogProvider>;
}
