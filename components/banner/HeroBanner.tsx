import { BannerProps } from ".";
import { Slider } from "../Slider";

export default function HeroBanner({ banners }: BannerProps) {
  return <Slider banners={banners}></Slider>;
}
