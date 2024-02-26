import Image from "next/image";
import styles from "./page.module.css";

import { Suspense } from "react";
import Footer from "@/components/layout/Footer";
import { Slider } from "@/components/Slider";

import Banner from "@/components/banner";
import HomeReleases from "@/components/homeReleases";
import { post } from "@/lib";
import HeroBanner from "@/components/banner/HeroBanner";
import RoundShortCutBanner from "@/components/banner/RoundShortCutBanner";
import BrandShortCutBanner from "@/components/banner/BrandShortCutBanner";
import ImageBanner from "@/components/banner/ImageBanner";
import Ranking from "@/components/ranking";

export default async function Home() {
  return (
    <>
      <Suspense>
        <Suspense>
          <HeroBanner />
        </Suspense>

        <Suspense>
          <Ranking />
        </Suspense>

        <Suspense>
          <RoundShortCutBanner />
        </Suspense>

        <Suspense>
          <HomeReleases type="todayEnd" />
        </Suspense>

        <Suspense>
          <HomeReleases type="todayNew" />
        </Suspense>

        <Suspense>
          <BrandShortCutBanner />
        </Suspense>

        <Suspense>
          <ImageBanner />
        </Suspense>

        <Suspense>
          <HomeReleases type="scheduledRelease" />
        </Suspense>

        <Suspense>
          <HomeReleases type="todayTba" />
        </Suspense>

        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
