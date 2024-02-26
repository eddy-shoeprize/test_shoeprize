import OpengraphImage from "@/components/opengraph-image";
import { getProductDetailById } from "@/lib";

export default async function Image({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProductDetailById(params.handle);
  const title = "테스트";

  return await OpengraphImage({ title });
}
