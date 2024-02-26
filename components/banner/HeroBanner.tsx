import { getHeroBanner } from "@/lib";
import { Slider } from "../Slider";

export default async function HeroBanner() {
  const { banners } = await getHeroBanner();
  return <Slider banners={banners}></Slider>;
}
