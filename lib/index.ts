const BASE_URL = "https://www.shoeprize.com";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function apiRequest<T>(
  method: HttpMethod,
  endpoint: string,
  payload?: any
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  };

  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

export async function get<T>(endpoint: string): Promise<T> {
  return apiRequest("GET", endpoint);
}

export async function post<T>(endpoint: string, payload: any): Promise<T> {
  return apiRequest("POST", endpoint, payload);
}

export async function put<T>(endpoint: string, payload: any): Promise<T> {
  return apiRequest("PUT", endpoint, payload);
}
3;
export async function del<T>(endpoint: string): Promise<T> {
  return apiRequest("DELETE", endpoint);
}

export interface Banner {
  id: number;
  title: string;
  isDimmed: boolean;
  url: string;
  displayChannel: string[]; // 배열 내에 들어가는 아이템의 타입을 설정해야 합니다.
  webImage: string;
  mobileImage: string;
}

interface FetchBannerResponse {
  title: string;
  type: string;
  banners: Banner[];
}
interface ReleaseMarketChannel {
  type: string;
  link: string;
  typeName: string;
}

interface ReleaseMarket {
  name: string;
  permalink: string;
  icon: string;
  domain: string;
  channels: ReleaseMarketChannel[];
  isUseApp: boolean;
}

interface Product {
  id: number;
  brandName: string;
  name: string;
  nameEn: string;
  thumb: string;
  code: string;
}
export interface ReleaseInfo {
  id: number;
  uuid: string;
  type: number;
  isEvent: boolean;
  method: string;
  url: string;
  price: string;
  releaseMarket: ReleaseMarket;
  dateInfo: string;
  closedTimestamp: number;
  startTimestamp: number;
  endTimestamp: number;
  product: Product;
  shippingMethod: string;
  payMethod: string;
  salePrice: string;
  salePriceCurrency: string;
  salePriceCurrencySymbol: string;
  region: string;
  isUndefinedStartTime: boolean;
  isUndefinedEndTime: boolean;
  mode: string;
  isUndefinedPurchaseStartedAt: boolean;
  isUndefinedPurchaseStoppedAt: boolean;
  isUndefinedAnnouncedAt: boolean;
  completedTimestamp: number;
  isExpired: boolean;
  isInHouse: boolean;
  isDomesticSite: boolean;
}

interface FetchReleasesResponse {
  count: number;
  next: string;
  previous: null | string;
  results: ReleaseInfo[];
}

export async function fetchUserData(
  type: "HERO" | "DEFAULT" | "HOME_ROUND_SHORT_CUT" | "HOME_BRAND_SHORT_CUT"
) {
  const getIdFromType = (type: string) => {
    switch (type) {
      case "HERO":
        return 1;
      case "DEFAULT":
        return 8;
      case "HOME_ROUND_SHORT_CUT":
        return 6;
      case "HOME_BRAND_SHORT_CUT":
        return 7;
      default:
        throw new Error(`Invalid type: ${type}`);
    }
  };

  const id = getIdFromType(type);

  try {
    const res = await get<FetchBannerResponse>(`/api/v2/banner-group/${id}/`);
    return res.banners;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export async function fetchHomeReleases(
  type: "todayEnd" | "todayNew" | "scheduledRelease" | "todayTba"
) {
  try {
    const getTomorrowISOString = () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow.toISOString().slice(0, 10);
    };

    let fetchUrl = "";
    const defaultFetchParams = {
      page_size: 20,
    };

    let fetchParams: Record<string, any> = { ...defaultFetchParams };

    switch (type) {
      case "todayEnd":
        fetchUrl = "/api/v2/releases/";
        fetchParams.ordering = "-type,end_time,-id";
        fetchParams.is_closing_today = true;
        fetchParams.is_end = false;
        break;

      case "todayNew":
        fetchUrl = "/api/v2/releases/";
        fetchParams.ordering = "type,end_time,-id";
        fetchParams.is_opening_today = true;
        fetchParams.is_end = false;
        fetchParams.is_participate = false;
        break;

      case "scheduledRelease":
        const tomorrow = getTomorrowISOString();
        fetchUrl = "/api/v2/products/";
        fetchParams.first_release_date_gte = tomorrow;
        fetchParams.ordering = "first_release_date";
        fetchParams.is_uncertain_date = false;
        fetchParams.is_active = true;
        fetchParams.is_official = true;
        break;

      case "todayTba":
        fetchUrl = "/api/v2/products/";
        fetchParams.ordering = "-created_at";
        fetchParams.is_uncertain_date = true;
        fetchParams.is_active = true;
        fetchParams.is_official = true;
        break;

      default:
        throw new Error(`Invalid type: ${type}`);
    }

    const res = await get<FetchReleasesResponse>(
      `${fetchUrl}?${new URLSearchParams(fetchParams).toString()}`
    );

    return res.results;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
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
