import { getShoeprizeRanking } from "@/lib";

export default async function Page({ params }: { params: string }) {
  const { results } = await getShoeprizeRanking();
  console.log("eddy 테스트", params);

  return (
    <>
      <h1>페이보릿</h1>
    </>
  );
}
