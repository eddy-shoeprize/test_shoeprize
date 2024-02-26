import {
  fetchScheduledReleases,
  fetchTodayEndingReleases,
  fetchTodayNewReleases,
  fetchTodayTBAReleases,
  getTodayEndingReleasesForHome,
  getTodayNewReleasesForHome,
  post,
} from "@/lib";
import React from "react";
import { Slider } from "../Slider";
import Image from "next/image";
import Link from "next/link";
import { FetchReleasesResponse } from "@/lib/types";

export interface HomeReleasesTypeProps {
  type: "todayEnd" | "todayNew" | "scheduledRelease" | "todayTba";
}

const HomeReleases: React.FC<HomeReleasesTypeProps> = async ({ type }) => {
  const releaseFetchFunctions = {
    todayEnd: {
      title: "오늘 마감",
      function: getTodayEndingReleasesForHome,
    },
    todayNew: {
      title: "오늘등록",
      function: getTodayNewReleasesForHome,
    },
    scheduledRelease: {
      title: "발매 확정",
      function: fetchScheduledReleases,
    },
    todayTba: {
      title: "공개예정",
      function: fetchTodayTBAReleases,
    },
  };

  const fetchFunction = releaseFetchFunctions[type].function;
  const ReleasesInfo = await fetchFunction();
  const title = releaseFetchFunctions[type].title;

  if (!ReleasesInfo?.results.length) return null;

  return (
    <div className="flex items-center justify-center gap-10">
      <h1>{title}</h1>
      {ReleasesInfo?.results.map((releases) => (
        <div key={releases.id} className="flex flex-col items-center">
          <Link href={`/raffles/${releases?.product?.id || releases?.id}`}>
            <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden bg-black">
              <Image
                alt={releases?.product?.name || releases?.name}
                src={releases?.product?.thumb || releases?.thumb}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <span className="mt-2 text-black">
              {releases?.product?.name || releases?.name}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomeReleases;
