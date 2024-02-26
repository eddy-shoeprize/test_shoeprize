import { getKreamRanking, getSoldOutRanking, getStockXRanking } from "@/lib";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  let results;

  switch (params.slug) {
    case "kream":
      results = (await getKreamRanking()).results;
      break;
    case "soldout":
      results = (await getSoldOutRanking()).results;
      break;
    case "stockx":
      results = (await getStockXRanking()).results;
      break;
    default:
  }

  if (!results) return redirect("/ranks");

  return (
    <>
      <div>My Post: {params.slug}</div>;
      {results?.map((item: any, index: number) => (
        <li key={index}>
          {index + 1}.{item.product.name}
        </li>
      ))}
    </>
  );
}
