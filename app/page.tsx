import Image from "next/image";
import styles from "./page.module.css";
import { Suspense } from "react";
import Footer from "@/components/layout/Footer";
import { Slider } from "@/components/Slider";

import Banner from "@/components/banner";
import HomeReleases from "@/components/HomeReleases";

export default async function Home() {
  return (
    <>
      <Suspense>
        <Banner type="HERO" />
        <Banner type="HOME_ROUND_SHORT_CUT" />
        <Banner type="DEFAULT" />
        <Banner type="HOME_BRAND_SHORT_CUT" />
        <HomeReleases type="todayEnd" />
        <HomeReleases type="todayNew" />
        <HomeReleases type="scheduledRelease" />
        <HomeReleases type="todayTba" />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
