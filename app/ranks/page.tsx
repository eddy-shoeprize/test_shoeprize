import { getShoeprizeRanking } from "@/lib";

export default async function Page() {
  const { results } = await getShoeprizeRanking();
  return (
    <>
      {results?.map((item: any, index: number) => (
        <li key={index}>
          {index + 1}.{item.product.name}
        </li>
      ))}
    </>
  );
}
