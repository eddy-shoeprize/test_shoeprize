import { fetchTodayEndingReleases, getShoeprizeRanking } from "@/lib";
import { TabGroup } from "@/components/layout/tab/tab-group";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: string;
}) {
  const test = new URLSearchParams(searchParams).toString();
  const queryParams = Object.fromEntries(new URLSearchParams(test));
  const { results } = await fetchTodayEndingReleases(queryParams);

  return (
    <>
      {/* <TabGroup
        path="/today"
        items={[
          {
            text: "전체",
          },
          // ...categories.map((x) => ({
          //   text: x.name,
          //   slug: x.slug,
          // })),
          { text: "국내", slug: `?region='한국'` },
          { text: "국내 및 해외직배", slug: "favorite" },
          { text: "해외", slug: `?region='해외'` },
        ]}
      /> */}

      {results?.map((item: any, index: number) => (
        <li key={index}>
          @@@@
          {index + 1}.{item.product.name}
        </li>
      ))}
    </>
  );
}
