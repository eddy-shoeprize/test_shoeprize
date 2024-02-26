import Prose from "@/components/prose";
import type { Metadata } from "next";

import { notFound } from "next/navigation";

export const runtime = "edge";

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}): Promise<Metadata> {
  // const page = await getPage(params.page);
  const page = {
    title: "titleTest",
    bodySummary: "bodySummaryTest",
    createdAt: "2222-22-22",
    updatedAt: "2222-22-22",
    seo: {
      title: "seoTest",
      description: "seoDsc",
    },
  };

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  // const page = await getPage(params.page);

  const page = {
    title: "titleTest",
    bodySummary: "bodySummaryTest",
    body: "",
    createdAt: "2222-22-22",
    updatedAt: "2022-02-12",
    seo: {
      title: "seoTest",
      description: "seoDsc",
    },
  };

  if (!page) return notFound();
  console.log("eddy page", params.page);
  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
      <Prose className="mb-8" html={page.body as string} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(
          undefined,
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ).format(new Date(page.updatedAt))}.`}
      </p>
    </>
  );
}
