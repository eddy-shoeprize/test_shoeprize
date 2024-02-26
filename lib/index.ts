import { createUrl, getTomorrowISOString } from "./utils";
import {
  ContentItem,
  FetchBannerResponse,
  FetchReleasesResponse,
  Product,
  ProductInfo,
  RankingResponse,
  TradeEntriesResponse,
  TradePlatform,
  VoteCounts,
} from "./types";
import { cache } from "react";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";
import { resolve } from "path";

const BASE_URL = "https://www.shoeprize.com";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function apiRequest<T>({
  method = "GET",
  cache = "force-cache",
  headers,
  payload,
  tags,
  endpoint,
}: {
  method?: HttpMethod;
  cache?: RequestCache;
  headers?: HeadersInit;
  payload?: any;
  tags?: string[];
  endpoint?: string;
}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
    cache,
    ...(tags && { next: { tags } }),
  };

  try {
    const response = await fetch(url, options);

    return response.json();
  } catch (error) {
    //TODO : 에러처리 커스텀
    console.error("API request error:", error);
    throw error;
  }
}

export async function get<T>({
  endpoint,
  tags,
  cache,
}: {
  endpoint: string;
  tags?: string[];
  cache?: RequestCache;
}): Promise<T> {
  return apiRequest({ method: "GET", endpoint, tags, cache });
}

export async function post<T>({
  endpoint,
  payload,
}: {
  endpoint: string;
  payload?: any;
}): Promise<T> {
  return apiRequest({
    method: "POST",
    endpoint,
    payload,
  });
}

export async function put<T>({
  endpoint,
  payload,
}: {
  endpoint: string;
  payload?: any;
}): Promise<T> {
  return apiRequest({
    method: "PUT",
    endpoint,
    payload,
  });
}

export async function del<T>({
  endpoint,
  payload,
}: {
  endpoint: string;
  payload?: any;
}): Promise<T> {
  return apiRequest({
    method: "DELETE",
    endpoint,
    payload,
  });
}

export async function fetchProducts(
  params: Record<string, any>
): Promise<FetchReleasesResponse> {
  const endpoint = createUrl("/api/v2/products/", new URLSearchParams(params));
  return await get<FetchReleasesResponse>({ endpoint, tags: [TAGS.products] });
}

export async function fetchReleases(
  params: Record<string, any>
): Promise<FetchReleasesResponse> {
  const endpoint = createUrl("/api/v2/releases/", new URLSearchParams(params));
  return await get<FetchReleasesResponse>({ endpoint });
}

export async function fetchBanner(id: number): Promise<FetchBannerResponse> {
  const endpoint = `/api/v2/banner-group/${id}/`;
  return await get<FetchBannerResponse>({ endpoint });
}

export async function fetchRanking(
  params: Record<string, any>
): Promise<RankingResponse> {
  const endpoint = createUrl(
    `/api/v2/statistics/product/ranks`,
    new URLSearchParams(params)
  );
  return await get<RankingResponse>({ endpoint, cache: "no-store" });
}

// export async function fetchBanner(
//   type: "HERO" | "DEFAULT" | "HOME_ROUND_SHORT_CUT" | "HOME_BRAND_SHORT_CUT"
// ) {
//   const getIdFromType = (type: string) => {
//     switch (type) {
//       case "HERO":
//         return 1;
//       case "DEFAULT":
//         return 8;
//       case "HOME_ROUND_SHORT_CUT":
//         return 6;
//       case "HOME_BRAND_SHORT_CUT":
//         return 7;
//       default:
//         throw new Error(`Invalid type: ${type}`);
//     }
//   };

//   const id = getIdFromType(type);

//   try {
//     const endpoint = `/api/v2/banner-group/${id}/`;
//     const res = await get<FetchBannerResponse>({ endpoint });
//     return res.banners;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//   }
// }

export async function getHeroBanner() {
  return await fetchBanner(1);
}

export async function getHomeImageBanner() {
  return await fetchBanner(8);
}

export async function getHomeRoundShortCutBanner() {
  return await fetchBanner(6);
}

export async function getHomeBrandShortCutBanner() {
  return await fetchBanner(7);
}

export async function fetchTodayEndingReleases(
  additionalParams: Record<string, any> = {}
): Promise<FetchReleasesResponse> {
  const fetchParams = {
    ordering: "end_time,-id",
    is_closing_today: true,
    is_end: false,
    page_size: 30,
    ...additionalParams,
  };
  return await fetchReleases(fetchParams);
}

export async function fetchTodayNewReleases(
  additionalParams: Record<string, any> = {}
): Promise<FetchReleasesResponse> {
  const fetchParams = {
    ordering: "end_time,-id",
    is_opening_today: true,
    is_end: false,
    is_participate: false,
    page_size: 30,
    ...additionalParams,
  };
  return await fetchReleases(fetchParams);
}

export async function fetchScheduledReleases(
  additionalParams: Record<string, any> = {}
): Promise<FetchReleasesResponse> {
  const tomorrow = getTomorrowISOString();
  const fetchParams = {
    first_release_date_gte: tomorrow,
    ordering: "first_release_date",
    is_uncertain_date: false,
    is_active: true,
    is_official: true,
    page_size: 20,
    ...additionalParams,
  };
  return await fetchProducts(fetchParams);
}

export async function fetchTodayTBAReleases(
  additionalParams: Record<string, any> = {}
): Promise<FetchReleasesResponse> {
  const fetchParams = {
    ordering: "-created_at",
    is_uncertain_date: true,
    is_active: true,
    is_official: true,
    page_size: 20,
    ...additionalParams,
  };
  return await fetchProducts(fetchParams);
}

export async function getTodayEndingReleasesForHome() {
  const additionalParams = {
    ordering: "-type,end_time,-id",
    page_size: 20,
  };
  return await fetchTodayEndingReleases(additionalParams);
}

export async function getTodayNewReleasesForHome() {
  const additionalParams = {
    ordering: "type,end_time,-id",
    page_size: 20,
  };
  return await fetchTodayEndingReleases(additionalParams);
}

export async function getOpenReleaseMarket(
  id: string
): Promise<FetchReleasesResponse> {
  try {
    const fetchParams: Record<string, any> = {
      page: 1,
      page_size: 5,
      product_id: id,
      is_end: false,
      ordering: "end_time,-id",
    };

    return fetchReleases(fetchParams);
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export async function getClosedReleaseMarket(
  id: string
): Promise<FetchReleasesResponse> {
  try {
    const fetchParams: Record<string, any> = {
      page: 1,
      page_size: 5,
      product_id: id,
      is_end: true,
      ordering: "-end_time,-id",
    };

    return fetchReleases(fetchParams);
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export async function getProductDetailById(id: string): Promise<ProductInfo> {
  const endpoint = `/api/v2/product/id/${id}`;
  return get<ProductInfo>({ endpoint });
}

export async function getProductDetailByPermalink(
  permalink: string
): Promise<ProductInfo> {
  const endpoint = `/api/v2/product/${permalink}`;
  return get<ProductInfo>({ endpoint });
}

export async function getProductVoteCounts(id: string): Promise<VoteCounts> {
  const endpoint = `/api/v2/product/${id}/vote`;
  return get<VoteCounts>({ endpoint, tags: [TAGS.products] });
}

export async function getDefaultTradePlatforms(): Promise<TradePlatform[]> {
  const endpoint = `/api/v2/tradeplatforms/`;
  return get<TradePlatform[]>({ endpoint });
}

export async function getTradePlatforms(
  id: string
): Promise<TradeEntriesResponse> {
  const params: Record<string, any> = {
    page: 1,
    page_size: 500,
    open_raffle_id: id,
    type: "BUY",
    ordering: "-sort,option_alias,site,-id",
  };

  const endpoint = createUrl(`/api/v2/trade/`, new URLSearchParams(params));
  return get<TradeEntriesResponse>({ endpoint });
}

export async function getLatestTradePlatforms(
  id: string
): Promise<TradeEntriesResponse> {
  const params: Record<string, any> = {
    open_raffle_id: id,
    type: "RECORD",
    ordering: "-traded_at,-id",
  };

  const endpoint = createUrl(`/api/v2/trade/`, new URLSearchParams(params));
  return get<TradeEntriesResponse>({ endpoint });
}

export async function getShoeprizeRanking() {
  const params: Record<string, any> = {
    page: 1,
    page_size: 10,
    type: "INTEREST-1DAY",
  };

  return await fetchRanking(params);
}

export async function getKreamRanking() {
  const params: Record<string, any> = {
    page: 1,
    page_size: 10,
    type: "INTEREST-3DAY",
    tradeplatform_id: 1,
  };

  return await fetchRanking(params);
}

export async function getSoldOutRanking() {
  const params: Record<string, any> = {
    page: 1,
    page_size: 10,
    type: "INTEREST-3DAY",
    tradeplatform_id: 6,
  };

  return await fetchRanking(params);
}

export async function getStockXRanking() {
  const params: Record<string, any> = {
    page: 1,
    page_size: 10,
    type: "INTEREST-3DAY",
    tradeplatform_id: 4,
  };

  return await fetchRanking(params);
}

export async function getProductContents(
  permalink: string
): Promise<ContentItem[]> {
  const endpoint = `/api/v2/product/${permalink}/contents`;
  return await get<ContentItem[]>({ endpoint });
}

export async function getBrandCategoryProducts(
  brandCategorySlug: string,
  categoryId: number
): Promise<Product[]> {
  const endpoint = `/api/v2/brand/category/${brandCategorySlug}/products?categoryId=${categoryId}`;
  return await get<Product[]>({ endpoint });
}

export async function getBrandProducts(
  brandName: string,
  categoryId: number
): Promise<Product[]> {
  const formattedBrandName = brandName.replace(/\s+/g, "_");
  const endpoint = `/api/v2/brand/${formattedBrandName}/products?categoryId=${categoryId}`;
  return await get<Product[]>({ endpoint });
}

// async function updateUserEmail(userId: number, newEmail: string) {
//   const payload = { email: newEmail };
//   try {
//     const updatedUser = await put<ApiResponse<UserData>>(`/users/${userId}`, payload);
//     console.log('Updated user data:', updatedUser.data);
//   } catch (error) {
//     console.error('Error updating user data:', error);
//   }
// }

// async function deleteUser(userId: number) {
//   try {
//     const deletedUser = await del<ApiResponse<UserData>>(`/users/${userId}`);
//     console.log('Deleted user:', deletedUser.data);
//   } catch (error) {
//     console.error('Error deleting user:', error);
//   }
// }

export const TAGS = {
  products: "products",
  cart: "cart",
};

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  const productWebhooks = [
    "products/create",
    "products/delete",
    "products/update",
  ];

  const secretKey = process.env.REVALIDATION_SECRET || "eddy-test";

  const topic = headers().get("topic") || "unknown";
  // xconst secret = req.nextUrl.searchParams.get("secret");
  const secret = req.nextUrl.searchParams.get("secret");
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== secretKey) {
    console.error("Invalid revalidation secret.");
    return NextResponse.json({ status: 200 });
  }

  if (!isProductUpdate) {
    return NextResponse.json({ status: 200 });
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 202, revalidated: true, now: Date.now() });
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
