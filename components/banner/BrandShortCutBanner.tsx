import { BannerProps } from ".";

export default function BrandShortCutBanner({ banners }: BannerProps) {
  return <div>{banners?.map((banner) => banner.title)}</div>;
}
