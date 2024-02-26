import {} from "@/lib/utils";

import { MetadataRoute } from "next";

// sitemap 함수는 동적으로 사이트맵 데이터를 생성하는 역할을 하며, 이 데이터는 MetadataRoute.Sitemap 타입으로 반환되어야 하는 JSON 객체입니다.

// 사이트맵 함수(sitemap)는 사이트의 모든 공개 경로(URL)와 해당 경로의 마지막 수정 시간을 포함하는 배열을 생성합니다. 이 배열은 sitemap.xml 파일의 구조를 결정하는 데 사용될 수 있으며, 실제로 sitemap.xml 파일을 생성하기 위해 서버나 배포 프로세스에서 사용될 수 있습니다.

// robots.ts 파일에서 설정한 sitemap 필드는 이렇게 생성된 사이트맵 파일의 URL을 검색 엔진에 알려주기 위한 것입니다. 일반적으로, 검색 엔진은 robots.txt 파일을 확인하여 사이트맵 파일의 위치를 찾고, 그 사이트맵을 사용하여 웹사이트를 더 효과적으로 크롤링합니다.

type Route = {
  url: string;
  lastModified: string;
};

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // const collectionsPromise = getCollections().then((collections) =>
  //   collections.map((collection) => ({
  //     url: `${baseUrl}${collection.path}`,
  //     lastModified: collection.updatedAt
  //   }))
  // );

  // const productsPromise = getProducts({}).then((products) =>
  //   products.map((product) => ({
  //     url: `${baseUrl}/product/${product.handle}`,
  //     lastModified: product.updatedAt
  //   }))
  // );

  // const pagesPromise = getPages().then((pages) =>
  //   pages.map((page) => ({
  //     url: `${baseUrl}/${page.handle}`,
  //     lastModified: page.updatedAt
  //   }))
  // );

  let fetchedRoutes: Route[] = [];

  try {
    // fetchedRoutes = (await Promise.all([collectionsPromise, productsPromise, pagesPromise])).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}
