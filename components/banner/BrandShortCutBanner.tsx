import { getHomeBrandShortCutBanner } from "@/lib";

export default async function BrandShortCutBanner() {
  const { banners } = await getHomeBrandShortCutBanner();
  return <div>{banners?.map((banner) => banner.title)}</div>;
}
