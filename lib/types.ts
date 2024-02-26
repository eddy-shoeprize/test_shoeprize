export interface Banner {
  id: number;
  title: string;
  isDimmed: boolean;
  url: string;
  displayChannel: string[]; // 배열 내에 들어가는 아이템의 타입을 설정해야 합니다.
  webImage: string;
  mobileImage: string;
}

export interface FetchBannerResponse {
  title: string;
  type: string;
  banners: Banner[];
}
export interface ReleaseMarketChannel {
  type: string;
  link: string;
  typeName: string;
}

export interface ReleaseMarket {
  name: string;
  permalink: string;
  icon: string;
  domain: string;
  channels: ReleaseMarketChannel[];
  isUseApp: boolean;
}

export interface Product {
  id: number;
  brandName: string;
  releaseSiteCount: number;
  name: string;
  nameEn: string;
  permalink: string;
  isActive: boolean;
  releaseDate: string;
  firstReleaseDate: string;
  isUncertainDate: boolean;
  applyEndTime: string;
  thumb: string;
  noBgThumb: string;
  views: number;
  currency: string;
  localPrice: string;
  applyCount: number;
  isCarousel: boolean;
  code?: string;
  price?: string;
  releasePrice?: string;
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
  brandName: string;
  code: string;
  releaseSiteCount: number;
  name: string;
  nameEn: string;
  permalink: string;
  isActive: boolean;
  releaseDate: string;
  firstReleaseDate: string;
  isUncertainDate: boolean;
  applyEndTime: string;
  thumb: string;
  noBgThumb: string;
  views: number;
  currency: string;
  releasePrice: string;
  localPrice: string;
  applyCount: number;
}

export interface ProductInfo {
  id: number;
  brandIcon: string;
  brandName: string;
  releaseSiteCount: number;
  images: string[];
  collaborationBrands: any[]; // 해당 필드의 구체적인 타입을 알 수 없으므로 any로 지정
  brandCategorySlug: string;
  name: string;
  permalink: string;
  isAutomationAvailable: boolean;
  isActive: boolean;
  releaseDate: string;
  firstReleaseDate: string;
  applyEndTime: string;
  isUncertainDate: boolean;
  nameEn: string;
  code: string;
  price: string;
  thumb: string;
  noBgThumb: string;
  isPriority: boolean;
  tradeAvgPrice: string;
  tradeAvgPriceChange: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  currency: string;
  releasePrice: string;
  localPrice: string;
  color: string;
  applyCount: number;
  releaseCount: number;
  calendarDate: string;
  selectSort: number;
  communityNotifiedAt: string;
  comment: string;
  sizeType: string;
  checkedDate: string;
  activatedAt: string;
  voteLikeCount: number;
  voteDislikeCount: number;
  isDisplayTradePrice: boolean;
  brand: number;
  brandCategory: number;
  category: number;
  checker: number;
}

export interface FetchReleasesResponse {
  count: number;
  next: string;
  previous: null | string;
  results: ReleaseInfo[];
}

export interface VoteCounts {
  voteLikeCount: number;
  voteDislikeCount: number;
}

export interface TradePlatform {
  id: number;
  name: string;
  logo: string;
  url: string;
  benefits: any[];
}

export interface TradeEntry {
  id: number;
  deliveryCost: number;
  inspectionCost: number;
  commission: number;
  siteProductKey: string;
  currency: string;
  price: string;
  option: string;
  optionAlias: string;
  isActive: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
  sort: number;
  couponDiscount: string;
  tradePlatform: number;
  finalPrice?: number;
  tradedAt?: string;
}

export interface TradeEntriesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TradeEntry[];
}

export interface RankingResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    id: number;
    product: Product[];
    type: string;
    currentRank: number;
    prevRank: number;
    createdAt: string;
    updatedAt: string;
  }>;
}

export interface ContentItem {
  title: string;
  titlePrefix: string;
  thumbnail: string;
  author: string;
  activatedDate: string;
  link: string;
}
