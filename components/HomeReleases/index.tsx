import { Banner, ReleaseInfo, fetchHomeReleases } from "@/lib";
import React from "react";

interface HomeReleasesTypeProps {
  type: "todayEnd" | "todayNew" | "scheduledRelease" | "todayTba";
}

export interface HomeReleasesProps {
  releases: ReleaseInfo[] | undefined; // 'banners' 프로퍼티의 타입을 정확히 지정합니다.
}

const HomeReleases: React.FC<HomeReleasesTypeProps> = async ({ type }) => {
  const ReleasesInfo = await fetchHomeReleases(type);

  // if (!ReleasesInfo?.length) return null;

  return <div>{ReleasesInfo.map((releases) => releases.id)}</div>;
};

export default HomeReleases;
