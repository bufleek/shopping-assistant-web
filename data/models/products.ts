import { Platform } from "./app_configs";
import { logEvent, EventNames } from "@/lib/analytics";

export interface Product {
  image: string;
  link: string;
  name: string;
  platform: string;
  price: Price | undefined | null;
  old_price: Price | undefined | null;
  rating: number | undefined | null;
  reviews: number | undefined | null;
}

export interface Price {
  currency: string;
  amount: number | undefined | null;
  amount_range: string | undefined | null;
  max_amount: number | undefined | null;
  min_amount: number | undefined | null;
}

export interface ProductList {
  current_page: string;
  next_page: string | undefined | null;
  products: Product[];
}

type TrackProductRequestParams = {
  platform: Platform;
  query: string;
  base_url: string;
  url: string;
  startTime: number;
  response?: number;
  error?: Error;
  extras?: { [key: string]: any };
};

function trackProductsRequest(params: TrackProductRequestParams) {
  const endTime = Date.now();
  logEvent(EventNames.SEARCH_REQUEST, {
    platform: params.platform.key,
    query: params.query,
    base_url: params.base_url,
    url: params.url,
    start_time: params.startTime,
    end_time: endTime,
    response: params.response,
    error: params.error ? params.error.message : undefined,
    duration: endTime - params.startTime,
    ...params.extras,
  });
}

export async function getProducts({
  platform,
  query,
  base_url,
}: {
  platform: Platform;
  query: string;
  base_url: string;
}): Promise<ProductList> {
  return new Promise((resolve, reject) => {
    const url = `${base_url}?exec=products&platform=${platform.key}&query=${query}`;
    const startTime = Date.now();
    const trackingParams = {
      platform,
      query,
      base_url,
      url,
      startTime,
    };
    fetch(url)
      .then((response) => {
        response.json().then((data) => {
          trackProductsRequest({
            ...trackingParams,
            response: response?.status,
            extras: {
              products: data.products.length,
            },
          });
          resolve(data);
        }).catch((error) => {
          reject(error.message);
        });
      })
      .catch((error) => {
        reject(error.message);
        trackProductsRequest({
          ...trackingParams,
          error,
        });
      });
  });
}
