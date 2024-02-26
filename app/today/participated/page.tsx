import { getShoeprizeRanking } from "@/lib";

export default async function Page({ params }: { params: string }) {
  const { results } = await getShoeprizeRanking();
  console.log("eddy 테스트", params);

  return (
    <>
      <h1>투데이엔드</h1>
    </>
  );
}
