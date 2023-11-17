import { Platform } from "./app_configs";

export interface Product {
  image: string;
  link: string;
  name: string;
  platform: string;
  price: Price;
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
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            resolve(data);
        })
        .catch((error) => reject(error));
});
}
