import { getProductDetailByPermalink } from "@/lib";

export default async function Page({
  params,
}: {
  params: { permalink: string };
}) {
  const productByPermalink = await getProductDetailByPermalink(
    params.permalink
  );

  return <div>{productByPermalink.brandCategory}</div>;
}
