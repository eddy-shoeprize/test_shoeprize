import { BannerProps } from ".";

export default function RoundShortCutBanner({ banners }: BannerProps) {
  return <div>{banners?.map((banner) => banner.title)}</div>;
}
