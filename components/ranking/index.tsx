import { Suspense, useState } from "react";
import Data from "./Data";
import { TabGroup } from "@/components/layout/tab/tab-group";
import { getShoeprizeRanking } from "@/lib";

export default async function Ranking() {
  const ranks = await getShoeprizeRanking();

  return (
    <div>
      {/* <TabGroup
        path="/"
        items={[
          {
            text: "슈프라이즈",
          },
          // ...categories.map((x) => ({
          //   text: x.name,
          //   slug: x.slug,
          // })),
          { text: "크림", slug: "checkout" },
          { text: "솔드아웃", slug: "blog" },
          { text: "스탁엑스", slug: "blog" },
        ]}
      /> */}
      <Data ranks={ranks} />
    </div>
  );
}
