import OpengraphImage from "@/components/opengraph-image";

export const runtime = "edge";

export default async function Image({ params }: { params: { page: string } }) {
  // const page = await getPage(params.page);
  // const title = page.seo?.title || page.title;

  const title = "test";

  return await OpengraphImage({ title });
}
