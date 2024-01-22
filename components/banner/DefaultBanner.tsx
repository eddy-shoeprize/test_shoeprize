import { BannerProps } from ".";

export default function DefaultBanner({ banners }: BannerProps) {
  return <div>{banners?.map((banner) => banner.title)}</div>;
}
