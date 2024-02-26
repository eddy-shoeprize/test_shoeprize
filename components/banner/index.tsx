import { fetchBanner } from "@/lib";
import React from "react";
import HeroBanner from "./HeroBanner";
import BrandShortCutBanner from "./BrandShortCutBanner";
import RoundShortCutBanner from "./RoundShortCutBanner";
import ImageBanner from "./ImageBanner";

interface BannerTypeProps {
  type: "HERO" | "HOME_IMAGE" | "HOME_ROUND_SHORT_CUT" | "HOME_BRAND_SHORT_CUT";
}

const Banner: React.FC<BannerTypeProps> = async ({ type }) => {
  return (
    <>
      {type == "HERO" && <HeroBanner />}
      {type == "HOME_ROUND_SHORT_CUT" && <RoundShortCutBanner />}
      {type == "HOME_BRAND_SHORT_CUT" && <BrandShortCutBanner />}
      {type == "HOME_IMAGE" && <ImageBanner />}
    </>
  );
};

export default Banner;
