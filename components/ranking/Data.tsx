"use client";

import { getKreamRanking, getShoeprizeRanking, getSoldOutRanking } from "@/lib";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";

export default function Data({ ranks }: { ranks: any }) {
  const [rankingData, setRankingData] = useState<any>(null);

  const fetchRankingData = async (tabName: string) => {
    let url = "https://www.shoeprize.com/api/v2/statistics/product/ranks";
    let params = new URLSearchParams({
      page: "1",
      page_size: "10",
      type: tabName === "shoeprize" ? "INTEREST-1DAY" : "INTEREST-3DAY",
      ...(tabName === "kream" && { tradeplatform_id: "1" }),
      ...(tabName === "soldout" && { tradeplatform_id: "6" }),
      ...(tabName === "kream" && { tradeplatform_id: "4" }),
    });

    try {
      const response = await fetch(`${url}?${params}`);
      const data = await response.json();
      setRankingData(data);
    } catch (error) {
      console.error("랭킹 데이터를 에러", error);
      setRankingData(null);
    }
  };

  const handleTabClick = (tabName: string) => {
    fetchRankingData(tabName);
  };

  return (
    <>
      <button onClick={() => handleTabClick("shoeprize")}>쇼프라이즈///</button>
      <button onClick={() => handleTabClick("kream")}>크림///</button>
      <button onClick={() => handleTabClick("soldout")}>솔드아웃///</button>
      <button onClick={() => handleTabClick("stockx")}>스탁엑스///</button>

      <h1>랭킹 데이터:</h1>

      <ul>
        {rankingData
          ? rankingData?.results?.map((item: any, index: number) => (
              <li key={index}>
                {index}.{item.product.name}
              </li>
            ))
          : ranks?.results?.map((item: any, index: number) => (
              <li key={index}>
                {index}.{item.product.name}
              </li>
            ))}
      </ul>
    </>
  );
}
