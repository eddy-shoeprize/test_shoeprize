import { Banner, fetchUserData } from "@/lib";
import React from "react";
import HeroBanner from "./HeroBanner";
import DefaultBanner from "./DefaultBanner";
import BrandShortCutBanner from "./BrandShortCutBanner";
import RoundShortCutBanner from "./RoundShortCutBanner";

interface BannerTypeProps {
  type: "HERO" | "DEFAULT" | "HOME_ROUND_SHORT_CUT" | "HOME_BRAND_SHORT_CUT";
}

export interface BannerProps {
  banners: Banner[] | undefined; // 'banners' 프로퍼티의 타입을 정확히 지정합니다.
}

const Banner: React.FC<BannerTypeProps> = async ({ type }) => {
  const banners = await fetchUserData(type);

  if (!banners?.length) return null;

  return (
    <>
      {type == "HERO" && <HeroBanner banners={banners} />}
      {type == "DEFAULT" && <DefaultBanner banners={banners} />}
      {type == "HOME_ROUND_SHORT_CUT" && (
        <BrandShortCutBanner banners={banners} />
      )}
      {type == "HOME_BRAND_SHORT_CUT" && (
        <RoundShortCutBanner banners={banners} />
      )}
    </>
  );
};

export default Banner;
