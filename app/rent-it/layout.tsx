import { RentItLiveCatalogProvider } from "@/components/RentItLiveCatalogProvider";

export default function RentItLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RentItLiveCatalogProvider>{children}</RentItLiveCatalogProvider>;
}
