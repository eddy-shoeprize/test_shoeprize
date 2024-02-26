import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// import { GridTileImage } from "components/grid/tile";
// import Footer from "components/layout/footer";
// import { Gallery } from "components/product/gallery";
// import { ProductDescription } from "components/product/product-description";
// import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import Link from "next/link";
import {
  getBrandCategoryProducts,
  getBrandProducts,
  getClosedReleaseMarket,
  getDefaultTradePlatforms,
  getKreamRanking,
  getLatestTradePlatforms,
  getOpenReleaseMarket,
  getProductContents,
  getProductDetailById,
  getProductDetailByPermalink,
  getProductVoteCounts,
  getShoeprizeRanking,
  getTradePlatforms,
} from "@/lib";
import Footer from "@/components/layout/Footer";
// import { auth } from "@/auth";
import { signIn } from "next-auth/react";
import Test from "@/components/test";

// export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProductDetailById(params.id);

  if (!product) return notFound();

  // const { url, width, height, altText: alt } = product.featuredImage || {};
  // const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.name || product.nameEn,
    description: product.comment || product.code,
    robots: {
      // index: indexable,
      // follow: indexable,
      // googleBot: {
      //   index: indexable,
      //   follow: indexable,
      // },
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: product.thumb
      ? {
          images: [
            {
              url: product.thumb,
              width: 100,
              height: 100,
              alt: product.name,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductDetailById(params.id);
  const voteCounts = await getProductVoteCounts(params.id);
  const tradePlatforms = await getTradePlatforms(params.id);
  const LatestTradePlatforms = await getLatestTradePlatforms(params.id);
  const defaultTradePlatforms = await getDefaultTradePlatforms();

  const { results: openReleaseMarket } = await getOpenReleaseMarket(params.id);
  const { results: closedReleaseMarket } = await getClosedReleaseMarket(
    params.id
  );

  const productContents = await getProductContents(product.permalink);
  const categoryProducts = await getBrandCategoryProducts(
    product.brandCategorySlug,
    product.category
  );

  const BrandProducts = await getBrandProducts(
    product.brandName,
    product.category
  );

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.comment || product.code,
    image: product.thumb,
    offers: {
      "@type": "AggregateOffer",
      availability: product.isActive
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.currency,
      highPrice: product.localPrice,
      lowPrice: product.localPrice,
    },
  };
  // const session = await auth();

  // console.log("eddy session", session);

  return (
    <>
      <Link href={`/product/${product.permalink}`}>{product.permalink}</Link>
      <h1>
        {voteCounts.voteDislikeCount} : {voteCounts.voteLikeCount}
      </h1>
      <div>{product.name}</div>
      <div>{openReleaseMarket.map((x) => x.releaseMarket.name)}</div>
      <div>{closedReleaseMarket.map((x) => x.releaseMarket.name)}</div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            {/* <Gallery
              images={product.images.map((image: Image) => ({
                src: image.url,
                altText: image.altText,
              }))}
            /> */}
          </div>

          <div className="basis-full lg:basis-2/6">
            {/* <ProductDescription product={product} /> */}
          </div>
        </div>
        {/* <Suspense><RelatedProducts id={product.id} /></Suspense> */}
      </div>
    </>
  );
}

// async function RelatedProducts({ id }: { id: string }) {
//   const relatedProducts = await getProductRecommendations(id);

//   if (!relatedProducts.length) return null;

//   return (
//     <div className="py-8">
//       <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
//       <ul className="flex w-full gap-4 overflow-x-auto pt-1">
//         {relatedProducts.map((product) => (
//           <li
//             key={product.id}
//             className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
//           >
//             <Link className="relative h-full w-full" href={`/product/${product.id}`}>
//               <GridTileImage
//                 alt={product.title}
//                 label={{
//                   title: product.title,
//                   amount: product.priceRange.maxVariantPrice.amount,
//                   currencyCode: product.priceRange.maxVariantPrice.currencyCode
//                 }}
//                 src={product.featuredImage?.url}
//                 fill
//                 sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
//               />
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
